// FILE: client/src/components/HeroSection/Hero3DCanvas.jsx

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';

function Core() {
  const solid = useRef();
  const wire = useRef();
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (solid.current) {
      solid.current.rotation.x = Math.sin(t * 0.38) * 0.22;
      solid.current.rotation.y = t * 0.30;
    }
    if (wire.current) {
      wire.current.rotation.x = solid.current?.rotation.x ?? 0;
      wire.current.rotation.y = solid.current?.rotation.y ?? 0;
    }
    if (r1.current) { r1.current.rotation.x = t * 0.48; r1.current.rotation.z = t * 0.16; }
    if (r2.current) { r2.current.rotation.y = t * 0.38; r2.current.rotation.z = t * 0.20; }
    if (r3.current) { r3.current.rotation.x = t * 0.26; r3.current.rotation.y = t * 0.32; }
  });

  return (
    <group>
      <mesh ref={solid}>
        <dodecahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.2}
          roughness={0.18} metalness={0.72} transparent opacity={0.9} />
      </mesh>
      <mesh ref={wire}>
        <dodecahedronGeometry args={[1.20, 0]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.12} />
      </mesh>
      <mesh ref={r1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.022, 6, 80]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} transparent opacity={0.72} />
      </mesh>
      <mesh ref={r2} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[1.72, 0.016, 6, 80]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5} transparent opacity={0.62} />
      </mesh>
      <mesh ref={r3} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
        <torusGeometry args={[2.5, 0.014, 6, 80]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={0.42} transparent opacity={0.52} />
      </mesh>
    </group>
  );
}

function Particles({ count = 280 }) {
  const ref = useRef();
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.0 + Math.random() * 3.0;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      a[i * 3] = r * Math.sin(p) * Math.cos(t);
      a[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      a[i * 3 + 2] = r * Math.cos(p);
    }
    return a;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.038;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.055) * 0.07;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.026} color="#A78BFA" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 44 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#04030C']} />
        <ambientLight intensity={0.18} />
        <pointLight position={[3, 3, 4]} intensity={8} color="#7C3AED" />
        <pointLight position={[-4, -3, -3]} intensity={5} color="#F59E0B" />
        <pointLight position={[0, 4, -2]} intensity={2} color="#ffffff" />
        <Core />
        <Particles />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI * 0.65}
          minPolarAngle={Math.PI * 0.35}
        />
      </Canvas>
    </div>
  );
}