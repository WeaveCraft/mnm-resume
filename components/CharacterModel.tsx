import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Simple character representation
function CharacterMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += delta * 0.3;
      
      // Gentle bobbing animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.7, 1, 0.4]} />
        <meshStandardMaterial 
          color="#654321"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D4C4A8" />
      </mesh>
      <mesh position={[0.5, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#D4C4A8" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.6, 0.25]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* C# Shield (Equipment) */}
      <mesh position={[-0.7, 0.75, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 6]} />
        <meshStandardMaterial 
          color="#9B4F96" 
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Unity Sword (Equipment) */}
      <mesh position={[0.7, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#222222"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      {/* Sword handle */}
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
    </group>
  );
}

export default function CharacterModel() {
  return (
    <div className="relative w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.5, 4]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#654321" />
        <spotLight 
          position={[0, 5, 0]} 
          intensity={0.8} 
          angle={Math.PI / 4}
          penumbra={0.5}
          color="#F5E6D3"
        />

        {/* Character */}
        <CharacterMesh />

        {/* Ground plane with subtle glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial 
            color="#2d2823" 
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>

        {/* Orbit controls for user interaction */}
        <OrbitControls 
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>

      {/* Overlay instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        <p className="text-parchment-dark text-xs font-game bg-stone-dark/80 px-3 py-1 rounded border border-bronze-dark">
          Drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
