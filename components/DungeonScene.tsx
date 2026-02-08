import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Animated torch fire particles
function TorchFire({ position }: { position: [number, number, number] }) {
  const particlesRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  // Create particle system
  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Start at torch position
      positions[i3] = (Math.random() - 0.5) * 0.2;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
      
      // Upward velocity with randomness
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.05 + 0.03;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, velocities, count };
  }, []);
  
  // Animate particles
  useFrame((state, delta) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.count; i++) {
      const i3 = i * 3;
      
      // Update position
      positions[i3] += particles.velocities[i3];
      positions[i3 + 1] += particles.velocities[i3 + 1];
      positions[i3 + 2] += particles.velocities[i3 + 2];
      
      // Reset particle if too high
      if (positions[i3 + 1] > 0.8) {
        positions[i3] = (Math.random() - 0.5) * 0.2;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = (Math.random() - 0.5) * 0.2;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Flicker the light
    if (lightRef.current) {
      lightRef.current.intensity = 2.5 + Math.sin(state.clock.elapsedTime * 8) * 0.3 + Math.random() * 0.2;
    }
  });
  
  return (
    <group position={position}>
      {/* Torch flame light */}
      <pointLight 
        ref={lightRef}
        position={[0, 0, 0]} 
        color="#ff6600" 
        intensity={2.5} 
        distance={6}
        decay={2}
      />
      
      {/* Fire particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#ff8800"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Torch holder (simple cylinder) */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#3e2723" roughness={0.8} />
      </mesh>
    </group>
  );
}

// Dungeon room structure
function DungeonRoom() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshStandardMaterial 
          color="#3a3633"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Back wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.5]} />
        <meshStandardMaterial 
          color="#5c5850"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      
      {/* Left wall */}
      <mesh position={[-5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.5]} />
        <meshStandardMaterial 
          color="#5c5850"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      
      {/* Right wall */}
      <mesh position={[5, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 5, 0.5]} />
        <meshStandardMaterial 
          color="#5c5850"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#2d2823"
          roughness={0.95}
        />
      </mesh>
    </group>
  );
}

// Character pedestal with floating character
function CharacterPedestal() {
  const characterRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (characterRef.current) {
      // Gentle bobbing
      characterRef.current.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      // Slow rotation
      characterRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group position={[0, 0, 0]}>
      {/* Stone pedestal */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.8, 1, 0.5, 8]} />
        <meshStandardMaterial 
          color="#5c5850"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Character representation (using portrait as texture on a card) */}
      <group ref={characterRef} position={[0, 1.2, 0]}>
        {/* Character card/portrait */}
        <mesh>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial 
            color="#F5E6D3"
            roughness={0.7}
            emissive="#d4af37"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing aura around character */}
        <mesh scale={[1.3, 2, 1]}>
          <planeGeometry args={[1.2, 1.8]} />
          <meshStandardMaterial 
            color="#d4af37"
            transparent
            opacity={0.1}
            emissive="#d4af37"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Laptop "tome" at feet */}
        <mesh position={[0, -0.8, 0.2]} rotation={[-Math.PI / 6, 0, 0]}>
          <boxGeometry args={[0.6, 0.05, 0.4]} />
          <meshStandardMaterial 
            color="#1a1614"
            metalness={0.3}
            roughness={0.6}
          />
        </mesh>
      </group>
      
      {/* Bronze ring around pedestal */}
      <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.05, 8, 32]} />
        <meshStandardMaterial 
          color="#d4af37"
          metalness={0.8}
          roughness={0.3}
          emissive="#b8860b"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
}

// Floating magical particles in the dungeon
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    const velocities: number[] = [];
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities.push(
        (Math.random() - 0.5) * 0.01,
        Math.random() * 0.005,
        (Math.random() - 0.5) * 0.01
      );
    }
    
    return { positions, velocities, count };
  }, []);
  
  useFrame(() => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.count; i++) {
      const i3 = i * 3;
      
      positions[i3] += particles.velocities[i3];
      positions[i3 + 1] += particles.velocities[i3 + 1];
      positions[i3 + 2] += particles.velocities[i3 + 2];
      
      // Reset if out of bounds
      if (positions[i3 + 1] > 5) {
        positions[i3 + 1] = 0;
      }
      if (Math.abs(positions[i3]) > 5) {
        positions[i3] = (Math.random() - 0.5) * 10;
      }
      if (Math.abs(positions[i3 + 2]) > 5) {
        positions[i3 + 2] = (Math.random() - 0.5) * 10;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#d4af37"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Main dungeon scene
export default function DungeonScene() {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.1} color="#ff8844" />
        
        {/* Fog for atmosphere */}
        <fog attach="fog" args={['#1a1614', 5, 15]} />
        
        {/* Dungeon room */}
        <DungeonRoom />
        
        {/* Character on pedestal */}
        <CharacterPedestal />
        
        {/* Four torches on walls */}
        <TorchFire position={[-4, 3, -4]} />
        <TorchFire position={[4, 3, -4]} />
        <TorchFire position={[-4, 3, 3]} />
        <TorchFire position={[4, 3, 3]} />
        
        {/* Ambient magical particles */}
        <AmbientParticles />
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={5}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* UI overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <div className="bg-stone-dark/90 px-6 py-3 rounded border-2 border-bronze">
          <h3 className="text-bronze-light font-medieval text-xl mb-1">
            Viktor the Developer
          </h3>
          <p className="text-parchment text-sm">
            Ready to join the Monsters & Memories guild
          </p>
        </div>
      </div>
      
      {/* Controls hint */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2">
        <div className="bg-stone-dark/80 px-4 py-2 rounded border border-bronze-dark">
          <p className="text-parchment-dark text-xs text-center">
            Drag to look around • Scroll to zoom • Auto-rotating
          </p>
        </div>
      </div>
    </div>
  );
}
