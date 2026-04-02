import { Suspense, lazy } from 'react';
import { businessInfo, stats } from '../data/coursesData';
import pencilLogo from '../pencil logo.jpeg';
import './AboutPage.css';

const HeroScene = lazy(() => import('../components/HeroScene'));

export default function AboutPage() {
  return (
    <main className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-page__hero">
        <div className="about-page__hero-bg" />
        <div className="container">
          <img src={pencilLogo} alt="Pencil Classes" className="about-page__hero-logo" />
          <h1 className="about-page__hero-title">About Pencil Classes</h1>
          <p className="about-page__hero-sub">
            {businessInfo.certification} • Handwriting & Drawing Academy
          </p>
        </div>
      </section>

      {/* Story + 3D */}
      <section className="section">
        <div className="container">
          <div className="about-page__story-layout">
            <div className="about-page__story-text">
              <span className="about-page__label">Our Story</span>
              <h2 className="about-page__heading">Empowering Kids Through<br /><span className="gradient-text">Beautiful Handwriting</span></h2>
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

      {/* Stats Bar */}
      <section className="about-page__stats">
        <div className="container">
          <div className="about-page__stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="about-page__stat">
                <span className="about-page__stat-value">{s.value}{s.suffix}</span>
                <span className="about-page__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What Drives Us</h2>
          <div className="about-page__mv-grid">
            <div className="about-page__mv-card">
              <div className="about-page__mv-icon-wrap about-page__mv-icon-wrap--mission">
                <span>🎯</span>
              </div>
              <h3>Our Mission</h3>
              <p>To make quality handwriting education accessible to every child, nurturing their creative potential through structured learning and personal attention.</p>
              <div className="about-page__mv-accent about-page__mv-accent--mission" />
            </div>
            <div className="about-page__mv-card">
              <div className="about-page__mv-icon-wrap about-page__mv-icon-wrap--vision">
                <span>🌟</span>
              </div>
              <h3>Our Vision</h3>
              <p>To be a globally recognized handwriting and creative arts academy, empowering children across borders with beautiful writing skills.</p>
              <div className="about-page__mv-accent about-page__mv-accent--vision" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section about-page__founder-section">
        <div className="container">
          <h2 className="section-title">Meet the Founder</h2>
          <div className="about-page__founder-card">
            <div className="about-page__founder-left">
              <img src={pencilLogo} alt={businessInfo.founder} className="about-page__founder-img" />
              <div className="about-page__founder-badges">
                <span className="about-page__badge">🏅 MSME Certified</span>
                <span className="about-page__badge">🌍 {businessInfo.countries} Countries</span>
                <span className="about-page__badge">👩‍🎓 B.E. & B.Ed</span>
              </div>
            </div>
            <div className="about-page__founder-right">
              <span className="about-page__label">Founder & Edupreneur</span>
              <h3 className="about-page__founder-name">{businessInfo.founder}</h3>
              <p className="about-page__founder-bio">
                With a B.E. and B.Ed degree, Kanmani brings a unique blend of engineering precision and
                educational methodology to handwriting training. With {businessInfo.experience} of experience
                and {businessInfo.studentsTrained} students trained, she has built Pencil Classes into an
                MSME certified academy reaching students across {businessInfo.countries} countries globally.
              </p>
              <p className="about-page__founder-bio">
                Her structured teaching approach covers Cursive Handwriting, Print & Lucida, Tamil Handwriting,
                Calligraphy, Drawing, and academic Tuition — all delivered with patience and personalized care
                that has earned praise from parents worldwide.
              </p>
              <div className="about-page__founder-links">
                <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  📸 Follow on Instagram
                </a>
                <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What We Offer</h2>
          <p className="section-subtitle">Everything your child needs under one roof</p>
          <div className="about-page__offer-grid">
            {[
              { icon: '✍️', title: 'Cursive Handwriting', desc: 'Master beautiful cursive writing in just 15 days' },
              { icon: '🖊️', title: 'Print & Lucida', desc: 'Neat and consistent print handwriting styles' },
              { icon: '📝', title: 'Tamil Handwriting', desc: 'Beautiful Tamil script with proper formation' },
              { icon: '🎨', title: 'Drawing & Art', desc: 'Pencil sketching, shading, and oil pastels' },
              { icon: '✒️', title: 'Calligraphy', desc: 'The art of beautiful decorative writing' },
              { icon: '📚', title: 'Academic Tuition', desc: 'All subjects for grades 3-9 with personal attention' },
            ].map((item, i) => (
              <div key={i} className="about-page__offer-card glass-card">
                <span className="about-page__offer-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
