import { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { businessInfo } from '../data/coursesData';
import './Hero.css';

import heroGraphic from '../hero-graphic.png';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const fullText = "Kids After School Program";
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
            MSME Certified Academy
          </div>

          <h1 className="hero__title animate-fade-in-up delay-1">
            {displayText}
            <span className="hero__cursor">|</span>
          </h1>

          <p className="hero__subtitle animate-fade-in-up delay-2">
            Handwriting, Drawing & Tuition classes by <strong>{businessInfo.founder}</strong>.
            {' '}{businessInfo.studentsTrained} students trained across {businessInfo.countries} countries.
            Online via Zoom & Offline sessions available.
          </p>

          <div className="hero__actions animate-fade-in-up delay-3">
            <Link to="/courses" className="btn btn-primary" id="hero-cta-courses">
              Explore Courses
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <a href={`https://wa.me/91${businessInfo.whatsapp}`} className="btn btn-secondary" id="hero-cta-whatsapp" target="_blank" rel="noopener noreferrer">
              WhatsApp Us
            </a>
          </div>

          <div className="hero__grade-pills animate-fade-in-up delay-4">
            {['✍️ Handwriting', '🎨 Drawing', '📝 Calligraphy', '📚 Tuition', '🌍 Online'].map((g) => (
              <span key={g} className="hero__pill">{g}</span>
            ))}
          </div>
        </div>

        <div className="hero__image-container animate-fade-in-up delay-2">
          <img src={heroGraphic} alt="Handwriting and Creativity" className="hero__graphic" />
        </div>
      </div>
    </section>
  );
}
