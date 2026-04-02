import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import StatsCounter from '../components/StatsCounter';
import CourseCard from '../components/CourseCard';
import { courses, stats, testimonials } from '../data/coursesData';
import './HomePage.css';

export default function HomePage() {
  const featuredCourses = courses.filter((_, i) => [0, 3, 7, 11, 15, 17].includes(i));

  return (
    <main className="home" id="home-page">
      <Hero />
      <StatsCounter stats={stats} />

      {/* Featured Courses */}
      <section className="section home__courses" id="featured-courses">
        <div className="container">
          <h2 className="section-title">Featured Courses</h2>
          <p className="section-subtitle">
            Discover our most popular courses designed for every stage of learning
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
          <h2 className="section-title">Why Choose Pencil Class?</h2>
          <p className="section-subtitle">
            We combine futuristic teaching methods with proven pedagogy to deliver exceptional results
          </p>

          <div className="home__why-grid">
            {[
              { icon: '🎯', title: 'Expert Faculty', desc: 'Highly qualified teachers with years of experience in their respective fields.' },
              { icon: '📚', title: 'Comprehensive Curriculum', desc: 'Carefully designed syllabus covering all boards — CBSE, State, ICSE.' },
              { icon: '💡', title: 'Interactive Learning', desc: 'Smart classrooms with digital tools, 3D models, and hands-on experiments.' },
              { icon: '📊', title: 'Progress Tracking', desc: 'Regular assessments with detailed reports sent to parents periodically.' },
              { icon: '🏆', title: 'Proven Results', desc: 'Consistent top ranks in board exams and competitive entrance tests.' },
              { icon: '🤝', title: 'Small Batch Size', desc: 'Limited students per batch ensuring personalized attention and care.' },
            ].map((item, i) => (
              <div key={i} className="home__why-card glass-card" id={`why-card-${i}`}>
                <span className="home__why-icon">{item.icon}</span>
                <h3 className="home__why-title">{item.title}</h3>
                <p className="home__why-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section home__testimonials" id="testimonials">
        <div className="container">
          <h2 className="section-title">What People Say</h2>
          <p className="section-subtitle">
            Hear from our students and parents about their experience
          </p>

          <div className="home__testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.id} className="home__testimonial glass-card" id={`testimonial-${t.id}`}>
                <div className="home__testimonial-quote">"</div>
                <p className="home__testimonial-text">{t.text}</p>
                <div className="home__testimonial-author">
                  <span className="home__testimonial-avatar">{t.avatar}</span>
                  <div>
                    <div className="home__testimonial-name">{t.name}</div>
                    <div className="home__testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section home__cta" id="cta-section">
        <div className="container">
          <div className="home__cta-card">
            <h2 className="home__cta-title">Ready to Start the Journey?</h2>
            <p className="home__cta-desc">
              Enroll your child today and give them the gift of futuristic education
            </p>
            <div className="home__cta-actions">
              <Link to="/contact" className="btn btn-primary" id="cta-enroll">
                Enroll Now
              </Link>
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
