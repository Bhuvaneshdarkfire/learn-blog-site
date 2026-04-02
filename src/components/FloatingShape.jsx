import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function MathShape({ type = 'octahedron', color = '#4a7aff', position = [0, 0, 0], scale = 1, speed = 1, wireframe = false }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.3 * speed;
    ref.current.rotation.y = t * 0.4 * speed;
    ref.current.position.y = position[1] + Math.sin(t * speed * 0.6) * 0.3;
  });

  const geo = {
    triangle:     <tetrahedronGeometry args={[1, 0]} />,
    pyramid:      <coneGeometry args={[0.9, 1.3, 4]} />,
    cube:         <boxGeometry args={[1, 1, 1]} />,
    sphere:       <sphereGeometry args={[0.8, 24, 24]} />,
    octahedron:   <octahedronGeometry args={[1, 0]} />,
    dodecahedron: <dodecahedronGeometry args={[0.9, 0]} />,
    icosahedron:  <icosahedronGeometry args={[0.9, 0]} />,
    torus:        <torusGeometry args={[0.8, 0.3, 16, 32]} />,
    cone:         <coneGeometry args={[0.7, 1.4, 3]} />,
    cylinder:     <cylinderGeometry args={[0.5, 0.5, 1, 6]} />,
  };

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geo[type] || geo.octahedron}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.25 : 0.85}
        roughness={0.35}
        metalness={0.5}
      />
    </mesh>
  );
}
