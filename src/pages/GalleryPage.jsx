import GalleryGrid from '../components/GalleryGrid';
import './GalleryPage.css';

export default function GalleryPage() {
  return (
    <main className="gallery-page" id="gallery-page">
      <section className="gallery-page__hero">
        <div className="container">
          <h1 className="section-title">Our Gallery</h1>
          <p className="section-subtitle">
            Explore moments from our classrooms, events, and extracurricular activities
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <GalleryGrid />
        </div>
      </section>
    </main>
  );
}
