import { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const HeroScene = lazy(() => import('./HeroScene'));

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Shaping Tomorrow's Leaders";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [textIndex]);

  return (
    <section className="hero" id="hero-section">
      <div className="hero__bg-shapes">
        <div className="hero__bg-circle hero__bg-circle--1" />
        <div className="hero__bg-circle hero__bg-circle--2" />
        <div className="hero__bg-circle hero__bg-circle--3" />
      </div>

      <div className="hero__content container">
        <div className="hero__text">
          <div className="hero__badge animate-fade-in-up">
            <span className="hero__badge-dot" />
            Admissions Open 2026-27
          </div>

          <h1 className="hero__title animate-fade-in-up delay-1">
            {displayText}
            <span className="hero__cursor">|</span>
          </h1>

          <p className="hero__subtitle animate-fade-in-up delay-2">
            A futuristic learning experience for students from <strong>Kindergarten to 12th Grade</strong>.
            Unlock potential with expert guidance, innovative curriculum, and a nurturing environment.
          </p>

          <div className="hero__actions animate-fade-in-up delay-3">
            <Link to="/courses" className="btn btn-primary" id="hero-cta-courses">
              Explore Courses
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/contact" className="btn btn-secondary" id="hero-cta-contact">
              Contact Us
            </Link>
          </div>

          <div className="hero__grade-pills animate-fade-in-up delay-4">
            {['KG', 'Grade 1-5', 'Grade 6-8', 'Grade 9-10', 'Grade 11-12'].map((g) => (
              <span key={g} className="hero__pill">{g}</span>
            ))}
          </div>
        </div>

        <div className="hero__3d">
          <Suspense fallback={<div className="hero__3d-loader">✨ Loading 3D Scene...</div>}>
            <HeroScene />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
