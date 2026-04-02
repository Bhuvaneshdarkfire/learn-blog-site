import { useState, useEffect } from 'react';
import { getFromFirebase } from '../firebase';
import './GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const galleryDoc = await getFromFirebase('pencil_data', 'gallery');
      if (galleryDoc?.images) {
        setImages(galleryDoc.images);
      }
      setLoading(false);
    };
    fetchImages();
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
          {loading ? (
            <div className="gallery-empty" style={{padding: '80px 0'}}>
              <div className="admin-loading-badge">🔄 Loading images from Cloud...</div>
            </div>
          ) : images.length === 0 ? (
            <div className="gallery-empty">
              <span style={{ fontSize: '64px' }}>🖼️</span>
              <h3>No images yet</h3>
              <p>Check back soon for photos of our classrooms and student works!</p>
            </div>
          ) : (
            <>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'right' }}>
                {images.length} images
              </p>
              <div className="gallery-grid">
                {images.map((img) => {
                  let finalSrc = img.src;
                  if(finalSrc.includes('drive.google.com/uc?export=view&id=')){
                     const idMatch = finalSrc.split('id=')[1];
                     if(idMatch) finalSrc = `https://lh3.googleusercontent.com/d/${idMatch}`;
                  }
                  return (
                    <div key={img.id} className="gallery-item" onClick={() => setLightbox({...img, src: finalSrc})}>
                      <img src={finalSrc} alt={img.name} loading="lazy" />
                      <div className="gallery-item__overlay">
                        <span>{img.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
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
