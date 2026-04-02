import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, SoftShadows, Float } from '@react-three/drei';
import MathShape from './FloatingShape';
import './HeroScene.css';

export default function HeroScene() {
  return (
    <div className="hero-scene" id="hero-3d-scene" style={{width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 1}}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <SoftShadows size={15} samples={10} focus={0.5} />
        <Environment preset="city" />
        
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5} 
          color="#ffffff" 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-4, -3, 3]} intensity={0.4} color="#7c3aed" />
        <pointLight position={[0, 4, 2]} intensity={0.8} color="#4a7aff" />

        {/* Group everything together so they rotate smoothly as a collection */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Center — Huge Hexagonal Pencil */}
          <MathShape type="pencil" color="#facc15" position={[2, 0, 0]} scale={2.5} speed={0.5} />

          {/* Book — Floating Top Left */}
          <MathShape type="book" color="#7c3aed" position={[-3, 2, -1]} scale={1.2} speed={0.8} />

          {/* Eraser — Floating Bottom Right */}
          <MathShape type="eraser" color="#f97316" position={[4, -2, -0.5]} scale={1} speed={0.7} />

          {/* Ruler — Floating Far Left Background */}
          <MathShape type="ruler" color="#06b6d4" position={[-4, -1.5, 0.5]} scale={1} speed={0.9} />

          {/* Secondary Pencil — Floating Right */}
          <MathShape type="pencil" color="#ec4899" position={[-1, 3, -1.5]} scale={1.5} speed={0.6} />

          {/* Secondary Book */}
          <MathShape type="book" color="#10b981" position={[3, 3, -2]} scale={0.9} speed={1} />
        </Float>

        {/* Slow auto-rotation around the scene */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.6}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
