import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function CharacterMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
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
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[0.7, 1, 0.4]} />
        <meshStandardMaterial color="#654321" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.5, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#C4B5A0" />
      </mesh>
      <mesh position={[0.5, 0.75, 0]}>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#C4B5A0" />
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

      {/* C# Shield */}
      <mesh position={[-0.7, 0.75, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 6]} />
        <meshStandardMaterial color="#9B4F96" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Unity Sword */}
      <mesh position={[0.7, 1, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.1, 0.8, 0.1]} />
        <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.7, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#8B6914" />
      </mesh>
    </group>
  );
}

export default function CharacterModel() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1.5, 4]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#D4AF37" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#654321" />
        <spotLight
          position={[0, 5, 0]}
          intensity={0.6}
          angle={Math.PI / 4}
          penumbra={0.5}
          color="#C4B5A0"
        />
        <CharacterMesh />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshStandardMaterial color="#1a1614" metalness={0.2} roughness={0.8} />
        </mesh>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div style={{
        position: 'absolute',
        bottom: '0.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
      }}>
        <span style={{
          color: '#8B7E71',
          fontSize: '0.6rem',
          fontFamily: 'Courier New, monospace',
          background: 'rgba(26, 22, 20, 0.8)',
          padding: '0.15rem 0.5rem',
          border: '1px solid #5A4A2A',
        }}>
          Drag to rotate
        </span>
      </div>
    </div>
  );
}
