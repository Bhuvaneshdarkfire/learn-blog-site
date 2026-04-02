import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function MathShape({ type = 'pencil', color = '#4a7aff', position = [0, 0, 0], scale = 1, speed = 1, wireframe = false }) {
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
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 1.5, 8]} />
              <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} wireframe={wireframe} />
            </mesh>
            {/* Wood cone */}
            <mesh position={[0, -0.9, 0]}>
              <coneGeometry args={[0.2, 0.3, 8]} />
              <meshStandardMaterial color="#deb887" roughness={0.6} wireframe={wireframe} />
            </mesh>
            {/* Lead tip */}
            <mesh position={[0, -1.1, 0]}>
              <coneGeometry args={[0.05, 0.1, 8]} />
              <meshStandardMaterial color="#333" roughness={0.8} wireframe={wireframe} />
            </mesh>
            {/* Eraser metal ring */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.21, 0.21, 0.15, 8]} />
              <meshStandardMaterial color="#d1d5db" metalness={0.8} roughness={0.2} wireframe={wireframe} />
            </mesh>
            {/* Eraser */}
            <mesh position={[0, 0.95, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.2, 8]} />
              <meshStandardMaterial color="#ec4899" roughness={0.9} wireframe={wireframe} />
            </mesh>
          </group>
        );

      case 'book':
        return (
          <group>
            {/* Cover */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.2, 2]} />
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.2} wireframe={wireframe} />
            </mesh>
            {/* Pages */}
            <mesh position={[0.05, 0, 0]}>
              <boxGeometry args={[1.4, 0.16, 1.9]} />
              <meshStandardMaterial color="#fdfdfd" roughness={0.8} wireframe={wireframe} />
            </mesh>
          </group>
        );

      case 'eraser':
        return (
          <mesh>
            <boxGeometry args={[1, 0.5, 1.5]} />
            <meshStandardMaterial color={color} roughness={0.9} wireframe={wireframe} />
          </mesh>
        );

      case 'ruler':
        return (
          <mesh>
            <boxGeometry args={[2.5, 0.05, 0.4]} />
            <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} transparent opacity={0.8} wireframe={wireframe} />
          </mesh>
        );

      // Fallback
      default:
        return (
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.5} wireframe={wireframe} />
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
