import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, Text, useCursor } from '@react-three/drei';

const STATUS_COLORS = {
  available: '#8b5a36',
  selected: '#f2b705',
  booked: '#c14335',
};

function Chair({ position, rotationY = 0 }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow position={[0, 0.23, 0]}>
        <boxGeometry args={[0.44, 0.14, 0.44]} />
        <meshStandardMaterial color="#455447" roughness={0.65} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -0.25]}>
        <boxGeometry args={[0.48, 0.58, 0.12]} />
        <meshStandardMaterial color="#304338" roughness={0.7} />
      </mesh>
      <mesh castShadow position={[-0.16, 0.08, -0.16]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#2b2d2c" />
      </mesh>
      <mesh castShadow position={[0.16, 0.08, -0.16]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#2b2d2c" />
      </mesh>
      <mesh castShadow position={[-0.16, 0.08, 0.16]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#2b2d2c" />
      </mesh>
      <mesh castShadow position={[0.16, 0.08, 0.16]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#2b2d2c" />
      </mesh>
    </group>
  );
}

function getChairLayout(capacity, shape) {
  if (shape === 'long') {
    return [
      { position: [-0.72, 0, -1.02], rotationY: 0 },
      { position: [0.72, 0, -1.02], rotationY: 0 },
      { position: [-0.72, 0, 1.02], rotationY: Math.PI },
      { position: [0.72, 0, 1.02], rotationY: Math.PI },
      { position: [-1.55, 0, 0], rotationY: -Math.PI / 2 },
      { position: [1.55, 0, 0], rotationY: Math.PI / 2 },
    ];
  }

  if (capacity === 2) {
    return [
      { position: [0, 0, -1.08], rotationY: 0 },
      { position: [0, 0, 1.08], rotationY: Math.PI },
    ];
  }

  return [
    { position: [0, 0, -1.16], rotationY: 0 },
    { position: [0, 0, 1.16], rotationY: Math.PI },
    { position: [-1.16, 0, 0], rotationY: -Math.PI / 2 },
    { position: [1.16, 0, 0], rotationY: Math.PI / 2 },
  ];
}

function SelectedRing({ shape }) {
  const ringRef = useRef();

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 3.2) * 0.05;
    ringRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.045, 0]}>
      <torusGeometry args={[shape === 'long' ? 1.75 : 1.15, 0.035, 16, 80]} />
      <meshStandardMaterial color="#f2b705" emissive="#6f4a00" emissiveIntensity={0.35} />
    </mesh>
  );
}

function DiningTable({ table, isSelected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const isBooked = table.status === 'booked';
  const visualStatus = isBooked ? 'booked' : isSelected ? 'selected' : 'available';
  const tableColor = STATUS_COLORS[visualStatus];
  const chairLayout = useMemo(
    () => getChairLayout(table.capacity, table.shape),
    [table.capacity, table.shape],
  );

  useCursor(hovered && !isBooked);

  const handleClick = (event) => {
    event.stopPropagation();
    if (!isBooked) {
      onSelect(table.id);
    }
  };

  return (
    <group
      position={table.position}
      scale={hovered && !isBooked ? 1.04 : 1}
      onClick={handleClick}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {isSelected && <SelectedRing shape={table.shape} />}

      {chairLayout.map((chair, index) => (
        <Chair
          key={`${table.id}-chair-${index}`}
          position={chair.position}
          rotationY={chair.rotationY}
        />
      ))}

      {table.shape === 'long' ? (
        <mesh castShadow position={[0, 0.62, 0]}>
          <boxGeometry args={[2.25, 0.2, 1.1]} />
          <meshStandardMaterial
            color={tableColor}
            roughness={0.48}
            metalness={0.03}
            emissive={isSelected ? '#5a3c00' : '#000000'}
            emissiveIntensity={isSelected ? 0.16 : 0}
          />
        </mesh>
      ) : (
        <mesh castShadow position={[0, 0.62, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.2, 48]} />
          <meshStandardMaterial
            color={tableColor}
            roughness={0.5}
            metalness={0.03}
            emissive={isSelected ? '#5a3c00' : '#000000'}
            emissiveIntensity={isSelected ? 0.18 : 0}
          />
        </mesh>
      )}

      <mesh castShadow position={[0, 0.32, 0]}>
        <boxGeometry args={[0.18, 0.58, 0.18]} />
        <meshStandardMaterial color="#4c3526" roughness={0.68} />
      </mesh>

      <mesh receiveShadow position={[0, 0.035, 0]}>
        <cylinderGeometry args={[table.shape === 'long' ? 0.72 : 0.54, table.shape === 'long' ? 0.72 : 0.54, 0.07, 36]} />
        <meshStandardMaterial color="#624733" roughness={0.7} />
      </mesh>

      <Suspense fallback={null}>
        <Text
          position={[0, 0.78, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.32}
          color={isBooked || !isSelected ? '#ffffff' : '#211f1c'}
          anchorX="center"
          anchorY="middle"
        >
          {table.number}
        </Text>
      </Suspense>
    </group>
  );
}

function Counter() {
  return (
    <group position={[0.1, 0, -4.05]}>
      <mesh castShadow receiveShadow position={[0, 0.58, 0]}>
        <boxGeometry args={[4.7, 1.15, 0.7]} />
        <meshStandardMaterial color="#175c4b" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0, 1.23, -0.06]}>
        <boxGeometry args={[4.9, 0.18, 0.82]} />
        <meshStandardMaterial color="#d5b179" roughness={0.42} />
      </mesh>
      <mesh castShadow position={[-1.45, 1.5, -0.18]}>
        <boxGeometry args={[0.9, 0.32, 0.18]} />
        <meshStandardMaterial color="#b4573a" roughness={0.35} />
      </mesh>
      <mesh castShadow position={[0, 1.52, -0.18]}>
        <boxGeometry args={[0.9, 0.32, 0.18]} />
        <meshStandardMaterial color="#f2b705" roughness={0.35} />
      </mesh>
      <mesh castShadow position={[1.45, 1.5, -0.18]}>
        <boxGeometry args={[0.9, 0.32, 0.18]} />
        <meshStandardMaterial color="#304338" roughness={0.35} />
      </mesh>
    </group>
  );
}

function Decor() {
  return (
    <>
      <group position={[-5.05, 0, 3.1]}>
        <mesh castShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.28, 0.38, 0.6, 18]} />
          <meshStandardMaterial color="#b4573a" />
        </mesh>
        <mesh castShadow position={[0, 0.95, 0]}>
          <coneGeometry args={[0.5, 0.9, 7]} />
          <meshStandardMaterial color="#2f6d51" roughness={0.75} />
        </mesh>
        <mesh castShadow position={[0, 1.42, 0]}>
          <coneGeometry args={[0.36, 0.68, 7]} />
          <meshStandardMaterial color="#3b8060" roughness={0.75} />
        </mesh>
      </group>

      <group position={[5.1, 0, 3.05]}>
        <mesh castShadow position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.28, 0.38, 0.6, 18]} />
          <meshStandardMaterial color="#b4573a" />
        </mesh>
        <mesh castShadow position={[0, 1, 0]}>
          <coneGeometry args={[0.52, 1, 7]} />
          <meshStandardMaterial color="#2f6d51" roughness={0.75} />
        </mesh>
      </group>

      <group position={[-4.1, 1.9, -4.43]}>
        <mesh>
          <boxGeometry args={[0.82, 0.82, 0.06]} />
          <meshStandardMaterial color="#f2b705" />
        </mesh>
        <mesh position={[1.08, 0, 0]}>
          <boxGeometry args={[0.82, 0.82, 0.06]} />
          <meshStandardMaterial color="#b4573a" />
        </mesh>
        <mesh position={[2.16, 0, 0]}>
          <boxGeometry args={[0.82, 0.82, 0.06]} />
          <meshStandardMaterial color="#175c4b" />
        </mesh>
      </group>
    </>
  );
}

function Room() {
  return (
    <>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[12, 9]} />
        <meshStandardMaterial color="#1a2420" roughness={0.85} />
      </mesh>
      <mesh receiveShadow position={[0, 2.1, -4.52]}>
        <boxGeometry args={[12, 4.2, 0.16]} />
        <meshStandardMaterial color="#24302b" roughness={0.82} />
      </mesh>
      <mesh receiveShadow position={[-6.03, 2.1, 0]}>
        <boxGeometry args={[0.16, 4.2, 9]} />
        <meshStandardMaterial color="#1f2925" roughness={0.82} />
      </mesh>
      <mesh receiveShadow position={[6.03, 2.1, 0]}>
        <boxGeometry args={[0.16, 4.2, 9]} />
        <meshStandardMaterial color="#1f2925" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[11.4, 0.03, 8.4]} />
        <meshStandardMaterial color="#2a3530" roughness={0.7} />
      </mesh>
    </>
  );
}

function SceneContent({ tables, selectedTableId, onTableSelect }) {
  return (
    <>
      <color attach="background" args={['#0e1613']} />
      <ambientLight intensity={0.55} />
      <directionalLight
        castShadow
        position={[2.5, 7, 4.5]}
        intensity={1.6}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-4, 4, -2]} intensity={0.7} color="#f2b705" />
      <Room />
      <Counter />
      <Decor />
      {tables.map((table) => (
        <DiningTable
          key={table.id}
          table={table}
          isSelected={selectedTableId === table.id && table.status !== 'booked'}
          onSelect={onTableSelect}
        />
      ))}
      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.35}
        scale={11}
        blur={2.5}
        far={4}
      />
      <OrbitControls
        makeDefault
        target={[0, 0.55, 0]}
        enablePan={false}
        minDistance={5.5}
        maxDistance={11}
        minPolarAngle={0.45}
        maxPolarAngle={1.25}
      />
    </>
  );
}

function RestaurantScene({ tables, selectedTableId, onTableSelect }) {
  return (
    <section className="scene-shell overflow-hidden rounded-2xl border border-base-300 bg-base-100 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            3D Layout
          </p>
          <h2 className="font-display text-2xl font-bold text-base-content">Restaurant floor</h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-medium">
          <span className="badge border-0 bg-[#8b5a36] text-white">Available</span>
          <span className="badge border-0 bg-[#f2b705] text-[#211f1c]">Selected</span>
          <span className="badge border-0 bg-[#c14335] text-white">Booked</span>
        </div>
      </div>

      <div className="scene-canvas">
        <Canvas
          shadows
          camera={{ position: [6.6, 6.4, 7.6], fov: 42 }}
          onCreated={({ camera }) => camera.lookAt(0, 0.55, 0)}
        >
          <SceneContent
            tables={tables}
            selectedTableId={selectedTableId}
            onTableSelect={onTableSelect}
          />
        </Canvas>
      </div>
    </section>
  );
}

export default RestaurantScene;
