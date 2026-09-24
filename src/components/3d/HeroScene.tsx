import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Preload, ContactShadows, Sparkles } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function AbstractCoffeeBean(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.15
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} {...props} castShadow receiveShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          color="#3c2f2f"
          roughness={0.15}
          metalness={0.85}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  )
}

function FloatingBeans() {
  return (
    <group>
      <AbstractCoffeeBean position={[2.5, 0, -2]} scale={1.8} />
      <AbstractCoffeeBean position={[-2.5, 1, -1]} scale={1.2} />
      <AbstractCoffeeBean position={[1, -2, 1]} scale={1.5} />
      <AbstractCoffeeBean position={[-1.5, -1.5, 0]} scale={0.8} />
    </group>
  )
}

function CameraRig() {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return // Disable on touch devices
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 2, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 2, 0.05)
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

export function HeroScene() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-bg-primary">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} shadows dpr={isMobile ? 1 : [1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          color="#d4a373" 
          castShadow={!isMobile} 
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#7a3523" />
        
        {!isMobile && <CameraRig />}
        <FloatingBeans />
        
        {/* Particles / Subtle Steam */}
        <Sparkles count={isMobile ? 15 : 60} scale={12} size={2} speed={0.4} opacity={0.3} color="#d4a373" />
        <Sparkles count={isMobile ? 5 : 20} scale={10} size={4} speed={0.2} opacity={0.1} color="#ffffff" />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -3.5, 0]} opacity={0.8} scale={15} blur={2.5} far={4} color="#000000" resolution={256} />
        
        <Preload all />
      </Canvas>
    </div>
  )
}
