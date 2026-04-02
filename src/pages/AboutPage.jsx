import { Suspense, lazy } from 'react';
import './AboutPage.css';

const AboutScene = lazy(() => import('../components/HeroScene'));

export default function AboutPage() {
  return (
    <main className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-page__hero">
        <div className="container">
          <h1 className="section-title">About Pencil Class</h1>
          <p className="section-subtitle">
            A legacy of excellence in education, building futures since 2010
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="about-page__story">
            <div className="about-page__story-text">
              <h2 className="about-page__heading">Our Story</h2>
              <p>
                Founded in 2010, <strong>Pencil Class</strong> started as a small tuition center 
                with a big vision — to make quality education accessible, engaging, and future-ready 
                for every student. What began with just 5 students has grown into a thriving 
                community of over 500 learners.
              </p>
              <p>
                We believe that every child has unlimited potential. Our mission is to nurture 
                that potential through innovative teaching methods, personalized attention, and 
                a curriculum that goes beyond textbooks.
              </p>
            </div>
            <div className="about-page__story-3d">
              <Suspense fallback={<div className="about-page__3d-loader">✨</div>}>
                <AboutScene />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section about-page__mv">
        <div className="container">
          <div className="about-page__mv-grid">
            <div className="about-page__mv-card glass-card" id="mission-card">
              <div className="about-page__mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide world-class education that empowers students with knowledge, 
                critical thinking, and the confidence to excel in academics and beyond. 
                We strive to create a learning environment that is inclusive, innovative, 
                and inspiring.
              </p>
            </div>
            <div className="about-page__mv-card glass-card" id="vision-card">
              <div className="about-page__mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>
                To be the most trusted and transformative educational institution that shapes 
                future leaders, innovators, and responsible citizens. We envision a world 
                where every child has access to education that unlocks their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section about-page__team">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            Dedicated educators committed to your child's success
          </p>

          <div className="about-page__team-grid">
            {[
              { name: 'Dr. Ramesh Kumar', role: 'Founder & Director', emoji: '👨‍🏫', speciality: 'Mathematics, 20+ years' },
              { name: 'Ms. Priya Devi', role: 'Academic Head', emoji: '👩‍🏫', speciality: 'Science, 15+ years' },
              { name: 'Mr. Karthik S.', role: 'Physics Faculty', emoji: '👨‍🔬', speciality: 'JEE/NEET Physics' },
              { name: 'Ms. Anitha R.', role: 'English Faculty', emoji: '👩‍💼', speciality: 'Language & Literature' },
              { name: 'Mr. Vijay M.', role: 'Chemistry Faculty', emoji: '🧑‍🔬', speciality: 'Board & Competitive' },
              { name: 'Ms. Deepa K.', role: 'KG Coordinator', emoji: '👩‍🎨', speciality: 'Early Childhood Education' },
            ].map((member, i) => (
              <div key={i} className="about-page__member glass-card" id={`team-member-${i}`}>
                <div className="about-page__member-avatar">{member.emoji}</div>
                <h4 className="about-page__member-name">{member.name}</h4>
                <div className="about-page__member-role">{member.role}</div>
                <div className="about-page__member-spec">{member.speciality}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
