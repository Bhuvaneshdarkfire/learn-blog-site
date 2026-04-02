import { useState, useEffect, useCallback } from 'react';
import './GalleryGrid.css';

const STORAGE_KEY = 'pencilclass_gallery';

export default function GalleryGrid() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setImages(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load gallery:', e);
      }
    }
  }, []);

  const saveImages = (newImages) => {
    setImages(newImages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
  };

  const handleFiles = useCallback((files) => {
    const readers = [];
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      readers.push(
        new Promise((resolve) => {
          reader.onload = (e) => {
            resolve({
              id: Date.now() + Math.random(),
              src: e.target.result,
              name: file.name,
              date: new Date().toLocaleDateString(),
            });
          };
          reader.readAsDataURL(file);
        })
      );
    });
    Promise.all(readers).then((newImgs) => {
      setPreviewImages(newImgs);
    });
  }, []);

  const confirmUpload = () => {
    const newImages = [...previewImages, ...images];
    saveImages(newImages);
    setPreviewImages([]);
    setShowUpload(false);
  };

  const deleteImage = (id) => {
    const newImages = images.filter((img) => img.id !== id);
    saveImages(newImages);
    if (lightbox?.id === id) setLightbox(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  return (
    <div className="gallery" id="gallery-section">
      {/* Upload toggle */}
      <div className="gallery__toolbar">
        <button
          className="btn btn-primary"
          onClick={() => setShowUpload(!showUpload)}
          id="gallery-upload-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
          {showUpload ? 'Close Upload' : 'Upload Images'}
        </button>
        <span className="gallery__count">{images.length} images</span>
      </div>

      {/* Upload zone */}
      {showUpload && (
        <div
          className={`gallery__upload-zone ${dragOver ? 'gallery__upload-zone--active' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
          id="gallery-drop-zone"
        >
          <div className="gallery__upload-content">
            <div className="gallery__upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
              </svg>
            </div>
            <p className="gallery__upload-title">Drag & drop images here</p>
            <p className="gallery__upload-subtitle">or click to browse files</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="gallery__upload-input"
              id="gallery-file-input"
            />
          </div>

          {/* Preview */}
          {previewImages.length > 0 && (
            <div className="gallery__preview">
              <div className="gallery__preview-grid">
                {previewImages.map((img) => (
                  <div key={img.id} className="gallery__preview-item">
                    <img src={img.src} alt={img.name} />
                    <span>{img.name}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={confirmUpload} id="gallery-confirm-upload">
                Upload {previewImages.length} Image{previewImages.length > 1 ? 's' : ''}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Image Grid */}
      {images.length === 0 ? (
        <div className="gallery__empty">
          <div className="gallery__empty-icon">🖼️</div>
          <h3>No images yet</h3>
          <p>Upload your first images to start building your gallery</p>
        </div>
      ) : (
        <div className="gallery__grid" id="gallery-grid">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="gallery__item glass-card"
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => setLightbox(img)}
              id={`gallery-item-${img.id}`}
            >
              <img src={img.src} alt={img.name} className="gallery__img" loading="lazy" />
              <div className="gallery__item-overlay">
                <span className="gallery__item-name">{img.name}</span>
                <button
                  className="gallery__item-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteImage(img.id);
                  }}
                  aria-label="Delete image"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14H7L5 6M10 11v6M14 11v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery__lightbox" onClick={() => setLightbox(null)} id="gallery-lightbox">
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.name} />
            <div className="gallery__lightbox-info">
              <span>{lightbox.name}</span>
              <span>{lightbox.date}</span>
            </div>
            <button
              className="gallery__lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
