import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem('pencil_gallery') || '[]'));
  }, []);

  return (
    <main className="gallery-page" id="gallery-page">
      <section className="gallery-page__hero">
        <div className="container">
          <h1 className="section-title gradient-text">Our Gallery</h1>
          <p className="section-subtitle">
            Explore moments from our classrooms, student works, and events
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'right' }}>
            {images.length} images
          </p>

          {images.length === 0 ? (
            <div className="gallery-empty">
              <span style={{ fontSize: '64px' }}>🖼️</span>
              <h3>No images yet</h3>
              <p>Gallery images are uploaded by the admin.</p>
              <Link to="/admin" className="btn btn-secondary" style={{ marginTop: '16px' }}>Admin Login</Link>
            </div>
          ) : (
            <div className="gallery-grid">
              {images.map((img) => (
                <div key={img.id} className="gallery-item" onClick={() => setLightbox(img)}>
                  <img src={img.src} alt={img.name} loading="lazy" />
                  <div className="gallery-item__overlay">
                    <span>{img.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {lightbox && (
            <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
              <img src={lightbox.src} alt={lightbox.name} />
              <button className="gallery-lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
