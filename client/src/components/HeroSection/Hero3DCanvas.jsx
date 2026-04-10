import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

/* ── Rotating wireframe dodecahedron ── */
function CoreShape() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.28
  })
  return (
    <mesh ref={meshRef}>
      <dodecahedronGeometry args={[1.5, 0]} />
      <meshBasicMaterial color="#38BDF8" wireframe opacity={0.55} transparent />
    </mesh>
  )
}

/* ── Inner solid glow sphere ── */
function GlowCore() {
  const meshRef = useRef()
  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.4) * 0.06
    meshRef.current.scale.setScalar(s)
  })
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.7, 16, 16]} />
      <meshBasicMaterial color="#0C1E3A" transparent opacity={0.9} />
    </mesh>
  )
}

/* ── Single orbit ring ── */
function OrbitRing({ radius, color, speed, tiltX, tiltZ }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.getElapsedTime() * speed
  })
  const pts = []
  for (let i = 0; i <= 128; i++) {
    const a = (i / 128) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts)
  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <line ref={ref} geometry={geo}>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </line>
    </group>
  )
}

/* ── Particle field ── */
function Particles({ count = 220 }) {
  const ref = useRef()
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    const r = 3.5 + Math.random() * 2.5
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.04
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.09) * 0.15
  })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#38BDF8" transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <color attach="background" args={['#070B14']} />
      <ambientLight intensity={0.4} />
      <GlowCore />
      <CoreShape />
      <OrbitRing radius={2.4} color="#38BDF8" speed={0.4} tiltX={Math.PI / 6} tiltZ={0} />
      <OrbitRing radius={3.0} color="#10B981" speed={-0.25} tiltX={Math.PI / 3} tiltZ={Math.PI / 5} />
      <OrbitRing radius={3.6} color="#A78BFA" speed={0.18} tiltX={Math.PI / 8} tiltZ={Math.PI / 3} />
      <Particles count={220} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </>
  )
}

export default function Hero3DCanvas() {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
    >
      <Scene />
    </Canvas>
  )
}