import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function SpinningCube() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = 0.5 + Math.sin(t / 3) * 0.12;
      ref.current.rotation.y = t / 2.2;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color="#6366F1"
        metalness={0.4}
        roughness={0.25}
        emissive="#22C55E"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

export default function Hero3DCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 40 }}
        shadows
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 6, 5]}
          intensity={1.2}
          castShadow
          color="#6366F1"
        />
        <directionalLight
          position={[-4, -3, -5]}
          intensity={0.6}
          color="#22C55E"
        />
        <SpinningCube />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}

