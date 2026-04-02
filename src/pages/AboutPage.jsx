import { Suspense, lazy } from 'react';
import { businessInfo } from '../data/coursesData';
import './AboutPage.css';

const HeroScene = lazy(() => import('../components/HeroScene'));

export default function AboutPage() {
  return (
    <main className="about-page" id="about-page">
      <section className="about-page__hero">
        <div className="container">
          <h1 className="section-title gradient-text">About Pencil Classes</h1>
          <p className="section-subtitle">
            {businessInfo.certification} • Handwriting & Drawing Academy
          </p>
        </div>
      </section>

      <section className="section about-page__story">
        <div className="container">
          <div className="about-page__story-layout">
            <div className="about-page__story-text">
              <h2 className="gradient-text">Our Story</h2>
              <p>
                <strong>Pencil Classes</strong> is a Kids After School Program founded by <strong>{businessInfo.founder}</strong>,
                an edupreneur with {businessInfo.experience} of experience in handwriting education.
              </p>
              <p>
                What started as a passion for beautiful handwriting has grown into a comprehensive learning academy
                that has trained <strong>{businessInfo.studentsTrained} students</strong> across <strong>{businessInfo.countries} countries</strong>.
                We are an MSME Certified Academy offering both online (via Zoom) and offline classes.
              </p>
              <p>
                Our mission is to make quality handwriting, drawing, and tuition education accessible, engaging, and effective.
                Every student receives personalized attention to bring out their best.
              </p>
            </div>
            <div className="about-page__story-3d">
              <Suspense fallback={<div className="about-page__3d-loader">✨</div>}>
                <HeroScene />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-page__mission">
        <div className="container">
          <div className="about-page__mission-grid">
            <div className="about-page__mission-card glass-card">
              <h3>🎯 Our Mission</h3>
              <p>To make quality handwriting education accessible to every child, nurturing their creative potential through structured learning and personal attention.</p>
            </div>
            <div className="about-page__mission-card glass-card">
              <h3>🌟 Our Vision</h3>
              <p>To be a globally recognized handwriting and creative arts academy, empowering children across borders with beautiful writing skills.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section about-page__founder">
        <div className="container">
          <h2 className="section-title">Meet the Founder</h2>
          <div className="about-page__founder-card glass-card">
            <div className="about-page__founder-avatar">👩‍🏫</div>
            <h3>{businessInfo.founder}</h3>
            <p className="about-page__founder-title">Edupreneur & Founder</p>
            <p className="about-page__founder-bio">
              With a B.E. and B.Ed degree, Kanmani brings a unique blend of engineering precision and
              educational methodology to handwriting training. With {businessInfo.experience} of experience
              and {businessInfo.studentsTrained} students trained, she has built Pencil Classes into an
              MSME certified academy reaching students across {businessInfo.countries} countries globally.
            </p>
            <div className="about-page__founder-links">
              <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">📸 Instagram</a>
              <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">💬 WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
