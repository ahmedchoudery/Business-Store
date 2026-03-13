// FILE: client/src/components/HeroSection/Hero3DCanvas.jsx
// Same code pattern as the original — only colours and geometry type changed.

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';

function FloatingCore() {
  const solidRef = useRef();
  const wireRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (solidRef.current) {
      solidRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      solidRef.current.rotation.y = t * 0.32;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = Math.sin(t * 0.4) * 0.25;
      wireRef.current.rotation.y = t * 0.32;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.5;
      ring1Ref.current.rotation.z = t * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.42;
      ring2Ref.current.rotation.z = t * 0.22;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = t * 0.28;
      ring3Ref.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group>
      <mesh ref={solidRef}>
        <dodecahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.18}
          roughness={0.2} metalness={0.7} transparent opacity={0.88}
        />
      </mesh>

      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.19, 0]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.15} />
      </mesh>

      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.022, 6, 80]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.55} transparent opacity={0.7} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[1.72, 0.016, 6, 80]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.45} transparent opacity={0.6} />
      </mesh>

      <mesh ref={ring3Ref} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
        <torusGeometry args={[2.5, 0.014, 6, 80]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function Particles({ count = 300 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 3.2;
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
      <pointsMaterial size={0.028} color="#A78BFA" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.5], fov: 44 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#04030C']} />
        <ambientLight intensity={0.2} />
        <pointLight position={[3, 3, 4]} intensity={8} color="#7C3AED" />
        <pointLight position={[-4, -3, -3]} intensity={5} color="#F59E0B" />
        <pointLight position={[0, 4, -3]} intensity={2} color="#ffffff" />
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