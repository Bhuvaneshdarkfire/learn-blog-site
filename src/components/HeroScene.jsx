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

        {/* Center — Pencil */}
        <MathShape type="pencil" color="#facc15" position={[0, 0.2, 0]} scale={2} speed={0.5} />

        {/* Book — top-left */}
        <MathShape type="book" color="#7c3aed" position={[-2.5, 2, -1]} scale={0.8} speed={0.8} />

        {/* Eraser — bottom-right */}
        <MathShape type="eraser" color="#f97316" position={[2.8, -1.5, -0.5]} scale={0.7} speed={0.7} />

        {/* Ruler — left */}
        <MathShape type="ruler" color="#06b6d4" position={[-3, -1.2, 0.5]} scale={0.6} speed={0.9} />

        {/* Small Pencil — right */}
        <MathShape type="pencil" color="#ec4899" position={[3, 1.8, -1]} scale={1} speed={0.6} />

        {/* Book — upper-right */}
        <MathShape type="book" color="#10b981" position={[1.8, 2.8, -1.5]} scale={0.5} speed={1} />

        {/* Default geometric shape for variety */}
        <MathShape type="octahedron" color="#f59e0b" position={[-1.5, -2.2, 0]} scale={0.5} speed={0.75} />

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
