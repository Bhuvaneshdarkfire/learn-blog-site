import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import CourseCard from '../components/CourseCard';
import { courses, stats, testimonials, whyChooseUs, businessInfo } from '../data/coursesData';
import './HomePage.css';

export default function HomePage() {
  const featuredCourses = courses.slice(0, 6);

  return (
    <main className="home" id="home-page">
      <Hero />
      <StatsCounter stats={stats} />

      {/* Featured Courses */}
      <section className="section home__courses" id="featured-courses">
        <div className="container">
          <h2 className="section-title">Our Courses</h2>
          <p className="section-subtitle">
            Handwriting, Drawing, Calligraphy & Tuition — all under one roof
          </p>

          <div className="home__courses-grid">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <div className="home__courses-cta">
            <Link to="/courses" className="btn btn-primary" id="home-view-all-courses">
              View All Courses
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section home__why" id="why-choose-us">
        <div className="container">
          <h2 className="section-title">Why Choose Pencil Classes?</h2>
          <p className="section-subtitle">
            {businessInfo.certification} with {businessInfo.experience} of excellence
          </p>

          <div className="home__why-grid">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="home__why-card glass-card" id={`why-card-${i}`}>
                <span className="home__why-icon">{item.icon}</span>
                <h3 className="home__why-title">{item.title}</h3>
                <p className="home__why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Instagram Reviews */}
      <section className="section home__testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-subtitle">
            Reviews from our students' parents on Instagram
          </p>

          <div className="home__testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="home__testimonial glass-card" id={`testimonial-${i}`}>
                <div className="home__testimonial-quote">"</div>
                <p className="home__testimonial-text">{t.text}</p>
                <div className="home__testimonial-stars">
                  {Array.from({ length: t.rating }, (_, j) => (
                    <span key={j} className="home__testimonial-star">★</span>
                  ))}
                </div>
                <div className="home__testimonial-author">
                  <div>
                    <div className="home__testimonial-name">{t.name}</div>
                    <div className="home__testimonial-role">{t.role} • {t.source}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="home__courses-cta" style={{ marginTop: '32px' }}>
            <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              📸 Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section home__cta" id="cta-section">
        <div className="container">
          <div className="home__cta-card">
            <h2 className="home__cta-title">Ready to Improve Your Child's Handwriting?</h2>
            <p className="home__cta-desc">
              Contact us on WhatsApp to enroll. Online & Offline classes available!
            </p>
            <div className="home__cta-actions">
              <a href={`https://wa.me/91${businessInfo.whatsapp}`} className="btn btn-primary" id="cta-whatsapp" target="_blank" rel="noopener noreferrer">
                💬 WhatsApp Us
              </a>
              <Link to="/courses" className="btn btn-secondary" id="cta-browse">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
