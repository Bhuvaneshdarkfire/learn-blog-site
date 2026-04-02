import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

export default function MathShape({ type = 'pencil', color = '#4a7aff', position = [0, 0, 0], scale = 1, speed = 1 }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3 * speed;
    ref.current.rotation.y = t * 0.4 * speed;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.6) * 0.3;
  });

  const getShape = () => {
    switch(type) {
      case 'pencil':
        return (
          <group>
            {/* Main hexagonal painted body */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.2, 0.2, 1.6, 6]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
            </mesh>
            {/* Raw Wood Cone */}
            <mesh position={[0, -0.95, 0]} castShadow receiveShadow>
              <coneGeometry args={[0.2, 0.3, 6]} />
              <meshStandardMaterial color="#fcd699" roughness={0.8} />
            </mesh>
            {/* Lead tip */}
            <mesh position={[0, -1.15, 0]} castShadow>
              <coneGeometry args={[0.04, 0.12, 6]} />
              <meshStandardMaterial color="#2d2d2d" roughness={0.6} metalness={0.8} />
            </mesh>
            {/* Metallic Ferrule (The ring holding the eraser) */}
            <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.21, 0.21, 0.2, 16]} />
              <meshStandardMaterial color="#e5e7eb" metalness={1} roughness={0.15} />
            </mesh>
            {/* Pink Eraser Tip */}
            <mesh position={[0, 1.05, 0]} castShadow>
              <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
              <meshStandardMaterial color="#f472b6" roughness={0.9} />
            </mesh>
          </group>
        );

      case 'book':
        return (
          <group>
            {/* Hard Cover (Bottom) */}
            <RoundedBox args={[1.5, 0.05, 2]} radius={0.02} position={[0, -0.15, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Hard Cover (Top) */}
            <RoundedBox args={[1.5, 0.05, 2]} radius={0.02} position={[0, 0.15, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Spine (Side connecting covers) */}
            <RoundedBox args={[0.1, 0.35, 2]} radius={0.02} position={[-0.72, 0, 0]} castShadow receiveShadow>
              <meshStandardMaterial color={color} roughness={0.6} />
            </RoundedBox>
            {/* Paper pages block */}
            <mesh position={[0.03, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.35, 0.25, 1.9]} />
              <meshStandardMaterial color="#fafaf9" roughness={1} />
            </mesh>
          </group>
        );

      case 'eraser':
        return (
          <group>
            {/* White/Pink eraser block */}
            <RoundedBox args={[1, 0.4, 1.6]} radius={0.05} castShadow receiveShadow>
              <meshStandardMaterial color="#ffffff" roughness={1} />
            </RoundedBox>
            {/* Cardboard sleeve wrap */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.05, 0.45, 0.8]} />
              <meshStandardMaterial color={color} roughness={0.7} />
            </mesh>
          </group>
        );

      case 'ruler':
        return (
           <group>
            <RoundedBox args={[3, 0.04, 0.4]} radius={0.01} castShadow receiveShadow>
              {/* highly clear transparent acrylic look */}
              <meshPhysicalMaterial 
                color="#e5e5e5" 
                metalness={0.1}
                roughness={0}
                transmission={0.9}
                thickness={0.5}
                transparent 
                opacity={1}
              />
            </RoundedBox>
            {/* A small metallic center hole or branding area could go here */}
          </group>
        );

      // Fallback
      default:
        return (
          <mesh castShadow receiveShadow>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.5} />
          </mesh>
        );
    }
  };

  return (
    <group ref={ref} position={position} scale={scale}>
      {getShape()}
    </group>
  );
}
