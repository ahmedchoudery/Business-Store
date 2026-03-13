// client/src/components/HeroSection/Hero3DCanvas.jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ── Core rotating dodecahedron + orbit rings ───────── */
function FloatingCore() {
  const coreRef = useRef();
  const wireRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(t * 0.35) * 0.3 + pointer.y * 0.15;
      coreRef.current.rotation.y = t * 0.28 + pointer.x * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = coreRef.current?.rotation.x ?? 0;
      wireRef.current.rotation.y = coreRef.current?.rotation.y ?? 0;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += 0.008;
      ring1Ref.current.rotation.z += 0.003;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += 0.007;
      ring2Ref.current.rotation.z += 0.004;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += 0.005;
      ring3Ref.current.rotation.y += 0.006;
    }
  });

  return (
    <group>
      {/* Solid dodecahedron */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.18}
          roughness={0.15} metalness={0.75} transparent opacity={0.88}
        />
      </mesh>

      {/* Wireframe overlay — own geometry instance */}
      <mesh ref={wireRef}>
        <dodecahedronGeometry args={[1.19, 0]} />
        <meshBasicMaterial color="#A78BFA" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Orbit ring 1 — amber */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.1, 0.02, 6, 100]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.6} transparent opacity={0.7} />
      </mesh>

      {/* Orbit ring 2 — violet */}
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, Math.PI / 5]}>
        <torusGeometry args={[1.72, 0.016, 6, 100]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* Orbit ring 3 — rose */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 6, 0, Math.PI / 3]}>
        <torusGeometry args={[2.5, 0.014, 6, 100]} />
        <meshStandardMaterial color="#F43F5E" emissive="#F43F5E" emissiveIntensity={0.45} transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ── Particle field ─────────────────────────────────── */
function Particles({ count = 380 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 3.5;
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
      ref.current.rotation.y = clock.getElapsedTime() * 0.032;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.06;
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
      <pointsMaterial size={0.03} color="#A78BFA" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ── 8 floating tetrahedra — each with its OWN geometry ─ */
function FloaterMesh({ position, speed, offset, color }) {
  const ref = useRef();
  const initY = position[1];

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.rotation.x = t * speed;
      ref.current.rotation.y = t * speed * 0.7;
      ref.current.position.y = initY + Math.sin(t * 0.6 + offset) * 0.45;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      {/* Each instance gets its own geometry — no sharing */}
      <tetrahedronGeometry args={[0.17, 0]} />
      <meshStandardMaterial
        color={color} emissive={color}
        emissiveIntensity={0.4} transparent opacity={0.72}
      />
    </mesh>
  );
}

function Floaters() {
  const floaterData = useMemo(() => (
    Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 2.7 + Math.random() * 0.9;
      return {
        position: [
          Math.cos(angle) * dist,
          (Math.random() - 0.5) * 1.8,
          Math.sin(angle) * dist,
        ],
        speed: 0.28 + Math.random() * 0.4,
        offset: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#7C3AED' : '#F59E0B',
      };
    })
  ), []);

  return (
    <>
      {floaterData.map((d, i) => (
        <FloaterMesh key={i} {...d} />
      ))}
    </>
  );
}

/* ── Canvas export ──────────────────────────────────── */
export default function Hero3DCanvas() {
  return (
    <div className="hero__canvas">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5.8], fov: 44 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#04030C']} />

        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 4]} intensity={9} color="#7C3AED" />
        <pointLight position={[-4, -2, 2]} intensity={6} color="#F59E0B" />
        <pointLight position={[0, 5, -3]} intensity={2.5} color="#ffffff" />

        <FloatingCore />
        <Particles />
        <Floaters />
      </Canvas>
    </div>
  );
}