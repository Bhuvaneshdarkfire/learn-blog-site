import './HeroScene.css';

export default function HeroScene() {
  return (
    <div className="hero-scene" id="hero-3d-scene" style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe 
        title="STAEDTLER proposal" 
        frameBorder="0" 
        allowFullScreen 
        mozallowfullscreen="true" 
        webkitallowfullscreen="true" 
        allow="autoplay; fullscreen; xr-spatial-tracking" 
        src="https://sketchfab.com/models/061f19f550884fe7819b88bec218afa9/embed?autostart=1&transparent=1&ui_theme=dark&dnt=1"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
      >
      </iframe>
    </div>
  );
}
