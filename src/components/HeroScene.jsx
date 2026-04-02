import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MathShape from './FloatingShape';
import './HeroScene.css';

export default function HeroScene() {
  return (
    <div className="hero-scene" id="hero-3d-scene">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.9} color="#ffffff" />
        <directionalLight position={[-4, -3, 3]} intensity={0.4} color="#7c3aed" />
        <pointLight position={[0, 4, 2]} intensity={0.5} color="#4a7aff" />

        {/* Center — Octahedron (diamond) */}
        <MathShape type="octahedron" color="#4a7aff" position={[0, 0.2, 0]} scale={1} speed={0.5} />

        {/* Triangle — top-left */}
        <MathShape type="triangle" color="#7c3aed" position={[-2.5, 2, -1]} scale={0.7} speed={0.8} />

        {/* Pyramid — bottom-right */}
        <MathShape type="pyramid" color="#f97316" position={[2.8, -1.5, -0.5]} scale={0.6} speed={0.7} />

        {/* Cube — left */}
        <MathShape type="cube" color="#06b6d4" position={[-3, -1.2, 0.5]} scale={0.5} speed={0.9} />

        {/* Sphere — right */}
        <MathShape type="sphere" color="#ec4899" position={[3, 1.8, -1]} scale={0.45} speed={0.6} />

        {/* Torus — upper-right */}
        <MathShape type="torus" color="#10b981" position={[1.8, 2.8, -1.5]} scale={0.45} speed={1} />

        {/* Cone (3-sided) — lower-left */}
        <MathShape type="cone" color="#f59e0b" position={[-1.5, -2.2, 0]} scale={0.5} speed={0.75} />

        {/* Icosahedron — small near center */}
        <MathShape type="icosahedron" color="#06b6d4" position={[1.2, -0.5, 1]} scale={0.3} speed={1.2} />

        {/* Wireframe triangle — background accent */}
        <MathShape type="triangle" color="#4a7aff" position={[1, 1, -3]} scale={1.5} speed={0.2} wireframe />

        {/* Wireframe cube — background accent */}
        <MathShape type="cube" color="#7c3aed" position={[-1.5, 1.5, -4]} scale={1.2} speed={0.15} wireframe />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
