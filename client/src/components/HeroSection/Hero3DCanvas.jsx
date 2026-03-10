import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ── Main floating geometry ─────────────────────────────── */
function FloatingCore() {
  const icoRef = useRef();
  const wireRef = useRef();
  const torusRef = useRef();
  const torusRef2 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (icoRef.current) {
      icoRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      icoRef.current.rotation.y = t * 0.35;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      wireRef.current.rotation.y = t * 0.35;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.55;
      torusRef.current.rotation.z = t * 0.2;
    }
    if (torusRef2.current) {
      torusRef2.current.rotation.y = t * 0.4;
      torusRef2.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      {/* Solid icosahedron — lime glow */}
      <mesh ref={icoRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshStandardMaterial
          color="#c8f53c"
          emissive="#c8f53c"
          emissiveIntensity={0.12}
          roughness={0.2}
          metalness={0.6}
          opacity={0.85}
          transparent
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.18, 1]} />
        <meshBasicMaterial
          color="#c8f53c"
          wireframe
          opacity={0.2}
          transparent
        />
      </mesh>

      {/* Outer orbit ring 1 — orange */}
      <mesh ref={torusRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.022, 6, 80]} />
        <meshStandardMaterial
          color="#ff6935"
          emissive="#ff6935"
          emissiveIntensity={0.5}
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Outer orbit ring 2 — lime */}
      <mesh ref={torusRef2} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[1.65, 0.016, 6, 80]} />
        <meshStandardMaterial
          color="#c8f53c"
          emissive="#c8f53c"
          emissiveIntensity={0.4}
          opacity={0.5}
          transparent
        />
      </mesh>
    </group>
  );
}

/* ── Drifting particle field ────────────────────────────── */
function Particles({ count = 260 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.6 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.04;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.06) * 0.08;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#c8f53c"
        opacity={0.55}
        transparent
        sizeAttenuation
      />
    </points>
  );
}

/* ── Canvas export ──────────────────────────────────────── */
export default function Hero3DCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 44 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#070707']} />

        <ambientLight intensity={0.25} />
        <pointLight position={[3, 3, 4]} intensity={3.5} color="#c8f53c" />
        <pointLight position={[-4, -3, -3]} intensity={2} color="#ff6935" />
        <pointLight position={[0, 4, -3]} intensity={1} color="#ffffff" />

        <FloatingCore />
        <Particles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Canvas>
    </div>
  );
}