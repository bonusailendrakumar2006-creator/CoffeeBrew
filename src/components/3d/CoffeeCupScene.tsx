import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Preload, ContactShadows, Sparkles, Decal } from '@react-three/drei'
import { useRef, useMemo, useEffect, useState } from 'react'
import type { MutableRefObject } from 'react'
import * as THREE from 'three'

// Premium Stylized Cup with Pour Simulation
function PremiumCup({ scrollProgress, ...props }: any) {
  const cupGroupRef = useRef<THREE.Group>(null!)
  const liquidRef = useRef<THREE.Mesh>(null!)
  const streamRef = useRef<THREE.Mesh>(null!)
  const rippleRef = useRef<THREE.Mesh>(null!)

  // Generate a premium brand texture dynamically
  const brandTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = '800 120px "Playfair Display", serif'
      ctx.fillStyle = '#1a0b02'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if ('letterSpacing' in ctx) {
        (ctx as any).letterSpacing = '12px'
      }
      ctx.fillText('COFFEEBREW', canvas.width / 2, canvas.height / 2 + 10)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.anisotropy = 16
    return texture
  }, [])

  // Create a stylized cup using a LatheGeometry for smooth curves
  const cupGeometry = useMemo(() => {
    const points = []
    for (let i = 0; i <= 10; i++) {
      points.push(new THREE.Vector2(1.5 + Math.sin(i * 0.15) * 0.2, i * 0.3))
    }
    return new THREE.LatheGeometry(points, 64)
  }, [])

  useFrame((state, delta) => {
    cupGroupRef.current.rotation.y += delta * 0.05
    const progress = scrollProgress.current.value

    // 1. Liquid Stream Animation
    if (streamRef.current) {
      // Pouring active between 0.2 and 0.6 scroll progress
      if (progress > 0.2 && progress < 0.6) {
        streamRef.current.scale.y = THREE.MathUtils.lerp(streamRef.current.scale.y, 1, 0.1)
        streamRef.current.position.y = THREE.MathUtils.lerp(streamRef.current.position.y, 2, 0.1)
        streamRef.current.visible = true
      } else {
        // Stream retracts
        streamRef.current.scale.y = THREE.MathUtils.lerp(streamRef.current.scale.y, 0.01, 0.15)
        streamRef.current.position.y = THREE.MathUtils.lerp(streamRef.current.position.y, 4, 0.15)
        if (streamRef.current.scale.y < 0.02) streamRef.current.visible = false
      }
    }

    // 2. Liquid Filling Animation
    if (liquidRef.current) {
      let targetY = -1.2 // Empty state
      let targetScale = 0.75
      
      if (progress > 0.25) {
        const fillProgress = Math.min((progress - 0.25) / 0.35, 1.0) // Fills from 0.25 to 0.6
        targetY = -1.2 + (fillProgress * 2.5) // Rises to 1.3
        targetScale = 0.75 + (fillProgress * 0.25) // Surface widens as cup goes up
      }
      liquidRef.current.position.y = THREE.MathUtils.lerp(liquidRef.current.position.y, targetY, 0.05)
      liquidRef.current.scale.setScalar(THREE.MathUtils.lerp(liquidRef.current.scale.x, targetScale, 0.05))
    }

    // 3. Ripple Effect when pouring
    if (rippleRef.current) {
      if (progress > 0.25 && progress < 0.6) {
        rippleRef.current.visible = true
        rippleRef.current.scale.x = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.15
        rippleRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 15) * 0.15
        ;(rippleRef.current.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(state.clock.elapsedTime * 20) * 0.2
      } else {
        rippleRef.current.visible = false
      }
    }
  })

  return (
    <group ref={cupGroupRef} {...props}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh castShadow receiveShadow position={[0, -1.5, 0]} geometry={cupGeometry}>
          <meshStandardMaterial 
            color="#f5f0e6"
            roughness={0.15}
            metalness={0.1}
            envMapIntensity={1.5}
          />
          <Decal position={[0, 1.5, 1.64]} rotation={[0, 0, 0]} scale={[2.5, 0.8, 1.5]}>
            <meshStandardMaterial
              map={brandTexture}
              transparent
              polygonOffset
              polygonOffsetFactor={-1}
              roughness={0.15}
              metalness={0.1}
            />
          </Decal>
        </mesh>
        
        {/* Coffee Liquid Surface */}
        <mesh ref={liquidRef} position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.7, 64]} />
          <meshStandardMaterial 
            color="#1a0b02" 
            roughness={0.05} 
            metalness={0.9}
            envMapIntensity={2.5} 
          />
          {/* Surface Ripples */}
          <mesh ref={rippleRef} position={[0, 0, 0.02]} visible={false}>
            <ringGeometry args={[0.2, 0.6, 32]} />
            <meshBasicMaterial color="#3c1a05" transparent opacity={0.4} />
          </mesh>
        </mesh>

        {/* Coffee Stream */}
        <mesh ref={streamRef} position={[0, 4, 0]} visible={false} castShadow>
          <cylinderGeometry args={[0.06, 0.04, 4, 16]} />
          <meshStandardMaterial color="#1a0b02" roughness={0.1} metalness={0.8} envMapIntensity={2} />
        </mesh>

        {/* Cup Handle */}
        <mesh position={[1.8, -0.2, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow>
          <torusGeometry args={[0.6, 0.15, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#f5f0e6" roughness={0.15} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  )
}

function CoffeeSteam({ scrollProgress, isMobile }: { scrollProgress: MutableRefObject<{ value: number }>, isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  
  useFrame(() => {
    const progress = scrollProgress.current.value
    // Steam emerges heavily after cup is filled (progress > 0.6)
    let targetScale = 0.01
    if (progress > 0.5) {
      targetScale = Math.min((progress - 0.5) / 0.3, 1.0)
    }
    
    groupRef.current.position.y = 1 + (targetScale * 0.5)
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05))
  })

  return (
    <group ref={groupRef} scale={0.01}>
       <Sparkles count={isMobile ? 20 : 60} scale={4} size={3} speed={0.6} opacity={0.3} color="#ffffff" />
       <Sparkles count={isMobile ? 10 : 30} scale={5} size={5} speed={0.4} opacity={0.2} color="#d4a373" />
    </group>
  )
}

function SceneController({ scrollProgress, isMobile }: { scrollProgress: MutableRefObject<{ value: number }>, isMobile: boolean }) {
  const { camera, mouse } = useThree()
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0))
  
  useFrame(() => {
    const progress = scrollProgress.current.value
    
    let targetX = 0
    let targetY = 2
    let targetZ = 8
    let lookAtY = 0

    if (progress < 0.2) {
      // 1. Wide establishing shot
      targetX = 0
      targetY = 2
      targetZ = 8
      lookAtY = 0
    } else if (progress < 0.5) {
      // 2. Pushing in to watch the pour
      const p = (progress - 0.2) / 0.3
      targetX = THREE.MathUtils.lerp(0, 3, p)
      targetY = THREE.MathUtils.lerp(2, 4, p)
      targetZ = THREE.MathUtils.lerp(8, 5, p)
      lookAtY = THREE.MathUtils.lerp(0, 1.5, p)
    } else if (progress < 0.8) {
      // 3. Orbiting the cup as it fills
      const p = (progress - 0.5) / 0.3
      targetX = THREE.MathUtils.lerp(3, -4, p)
      targetY = THREE.MathUtils.lerp(4, 5, p)
      targetZ = THREE.MathUtils.lerp(5, 4, p)
      lookAtY = THREE.MathUtils.lerp(1.5, 0.5, p)
    } else {
      // 4. Final hero shot of the full cup with steam
      const p = (progress - 0.8) / 0.2
      targetX = THREE.MathUtils.lerp(-4, 0, p)
      targetY = THREE.MathUtils.lerp(5, 3, p)
      targetZ = THREE.MathUtils.lerp(4, 7, p)
      lookAtY = 0
    }
    
    // Disable mouse parallax on mobile for better touch performance
    const parallaxFactor = isMobile ? 0 : 1.5
    const finalX = targetX + mouse.x * parallaxFactor
    const finalY = targetY + mouse.y * parallaxFactor
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, finalX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, finalY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)
    
    lookAtTarget.current.y = THREE.MathUtils.lerp(lookAtTarget.current.y, lookAtY, 0.05)
    camera.lookAt(lookAtTarget.current)
  })
  
  return null
}

export function CoffeeCupScene({ scrollProgress }: { scrollProgress: MutableRefObject<{ value: number }> }) {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Canvas 
      camera={{ position: [0, 2, 8], fov: 35 }} 
      shadows={!isMobile} 
      dpr={isMobile ? 1 : [1, 2]} 
      gl={{ antialias: !isMobile, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={2.5} 
        color="#f5ebe0"
        castShadow={!isMobile} 
        shadow-mapSize={[512, 512]} 
      />
      <directionalLight position={[-10, 10, -5]} intensity={1} color="#7a3523" />
      <pointLight position={[0, -2, 0]} intensity={2} color="#d4a373" distance={10} />
      
      <SceneController scrollProgress={scrollProgress} isMobile={isMobile} />
      
      <group position={[isMobile ? 0 : 2, 0, 0]}>
        <PremiumCup scrollProgress={scrollProgress} />
        <CoffeeSteam scrollProgress={scrollProgress} isMobile={isMobile} />
        
        {!isMobile && <ContactShadows position={[0, -2.5, 0]} opacity={0.8} scale={15} blur={3} far={4} color="#000000" resolution={256} />}
      </group>
      
      <Environment preset="studio" />
      
      <Preload all />
    </Canvas>
  )
}
