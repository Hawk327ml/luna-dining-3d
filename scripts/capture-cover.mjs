/**
 * Capture ~15s silent Luna Dining floor loop for portfolio card.
 * Usage: npm run build && node scripts/capture-cover.mjs http://127.0.0.1:PORT
 */
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import { copyFile, mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const portfolioThumbs = path.resolve(
  root,
  "..",
  "..",
  "Hawk327ml.github.io",
  "public",
  "thumbs",
);
const outLocal = path.join(root, "public", "thumbs", "luna.webm");
const outPortfolio = path.join(portfolioThumbs, "luna.webm");
const requestedUrl = process.argv[2];
const FPS = 12;
const DURATION_SEC = 15;
const FRAME_COUNT = FPS * DURATION_SEC;

const require = createRequire(import.meta.url);
const portfolioNode = path.resolve(root, "..", "..", "Hawk327ml.github.io", "node_modules");

function loadTool(name) {
  try {
    return require(name);
  } catch {
    return require(path.join(portfolioNode, name));
  }
}

const { chromium } = loadTool("playwright");
const ffmpegInstaller = loadTool("@ffmpeg-installer/ffmpeg");

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", shell: false });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}`));
    });
  });
}

async function waitForServer(url, timeoutMs = 90000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok || res.status === 304) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server not ready: ${url}`);
}

async function startPreview() {
  const preview = spawn("npm", ["run", "preview", "--", "--host", "127.0.0.1", "--port", "4176"], {
    cwd: root,
    stdio: "ignore",
    shell: true,
  });
  const base = "http://127.0.0.1:4176";
  await waitForServer(base);
  return {
    base,
    stop: () => preview.kill("SIGTERM"),
  };
}

async function main() {
  let stopPreview = null;
  let base = requestedUrl;
  if (!base) {
    const preview = await startPreview();
    base = preview.base;
    stopPreview = preview.stop;
  }

  const frameDir = await mkdtemp(path.join(tmpdir(), "luna-frames-"));
  const browser = await chromium.launch({
    channel: "chrome",
    headless: true,
    args: [
      "--enable-webgl",
      "--ignore-gpu-blocklist",
      "--use-gl=angle",
      "--use-angle=swiftshader",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  try {
    await page.goto(`${base.replace(/\/$/, "")}/?cap=${Date.now()}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await page.waitForSelector("canvas", { timeout: 90000 });
    await page.locator('a[href="#floor"]').first().click();
    await page.waitForTimeout(1400);

    await page.addStyleTag({
      content: `
        header, footer, #status-cards, .booking-shell, form { display: none !important; }
        main, #floor, .scene-shell { margin: 0 !important; max-width: none !important; }
        .scene-shell > div:first-child { display: none !important; }
        .scene-canvas { height: 100vh !important; }
        body { background: #0c1210 !important; }
      `,
    });
    await page.waitForTimeout(400);

    const interval = 1000 / FPS;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const t0 = Date.now();
      const file = path.join(frameDir, `frame_${String(i).padStart(4, "0")}.png`);
      await page.screenshot({ path: file, type: "png" });
      const spent = Date.now() - t0;
      if (spent < interval) await page.waitForTimeout(interval - spent);
    }
  } finally {
    await browser.close();
    if (stopPreview) stopPreview();
  }

  await mkdir(path.dirname(outLocal), { recursive: true });
  await run(ffmpegInstaller.path, [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(frameDir, "frame_%04d.png"),
    "-c:v",
    "libvpx-vp9",
    "-b:v",
    "1M",
    "-an",
    "-pix_fmt",
    "yuv420p",
    outLocal,
  ]);
  await rm(frameDir, { recursive: true, force: true });

  try {
    await mkdir(path.dirname(outPortfolio), { recursive: true });
    await copyFile(outLocal, outPortfolio);
    console.log(`Also copied to ${outPortfolio}`);
  } catch (err) {
    console.warn("Portfolio copy skipped:", err.message);
  }
  console.log(`Wrote ${outLocal}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
