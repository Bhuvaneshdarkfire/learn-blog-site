import { useState } from 'react';
import { businessInfo } from '../data/coursesData';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', course: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. I'm interested in ${form.course || 'your courses'}. ${form.message}`;
    window.open(`https://wa.me/91${businessInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="contact-page" id="contact-page">
      <section className="contact-page__hero">
        <div className="container">
          <h1 className="section-title gradient-text">Contact Us</h1>
          <p className="section-subtitle">
            Get in touch to enroll or learn more about our courses
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-page__grid">
            <div className="contact-page__info-cards">
              <div className="contact-page__card glass-card">
                <span className="contact-page__card-icon">📱</span>
                <div>
                  <h3 className="contact-page__card-title">WhatsApp</h3>
                  <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-page__card-text" style={{textDecoration:'none'}}>
                    +91 {businessInfo.whatsapp}
                  </a>
                </div>
              </div>

              <div className="contact-page__card glass-card">
                <span className="contact-page__card-icon">📧</span>
                <div>
                  <h3 className="contact-page__card-title">Email</h3>
                  <a href={`mailto:${businessInfo.email}`} className="contact-page__card-text" style={{textDecoration:'none'}}>
                    {businessInfo.email}
                  </a>
                </div>
              </div>

              <div className="contact-page__card glass-card">
                <span className="contact-page__card-icon">📸</span>
                <div>
                  <h3 className="contact-page__card-title">Instagram</h3>
                  <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="contact-page__card-text" style={{textDecoration:'none'}}>
                    {businessInfo.instagramHandle}
                  </a>
                </div>
              </div>

              <div className="contact-page__card glass-card">
                <span className="contact-page__card-icon">🕐</span>
                <div>
                  <h3 className="contact-page__card-title">Mode</h3>
                  <p className="contact-page__card-text">Online (Zoom) & Offline</p>
                </div>
              </div>
            </div>

            <div className="contact-page__form-wrapper glass-card">
              <h2 className="contact-page__form-title">Send us a Message</h2>
              <p className="contact-page__form-desc">Fill the form and it will open WhatsApp with your message.</p>
              
              {submitted && <div className="contact-page__success">✅ Opening WhatsApp...</div>}
              
              <form onSubmit={handleSubmit} className="contact-page__form">
                <div className="contact-page__row">
                  <div className="contact-page__field">
                    <label>Your Name</label>
                    <input required placeholder="Enter your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="contact-page__field">
                    <label>Phone Number</label>
                    <input placeholder="Enter phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>

                <div className="contact-page__field">
                  <label>Select Course</label>
                  <select value={form.course} onChange={e => setForm({...form, course: e.target.value})}>
                    <option value="">Choose a course...</option>
                    <option value="Cursive Handwriting">Cursive Handwriting</option>
                    <option value="Print & Lucida Handwriting">Print & Lucida Handwriting</option>
                    <option value="Tamil Handwriting">Tamil Handwriting</option>
                    <option value="Calligraphy">Calligraphy</option>
                    <option value="Drawing Classes">Drawing Classes</option>
                    <option value="All Subject Tuition">All Subject Tuition</option>
                    <option value="Maths & Tamil Special">Maths & Tamil Special</option>
                  </select>
                </div>

                <div className="contact-page__field">
                  <label>Your Message</label>
                  <textarea placeholder="How can we help you?" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>

                <button type="submit" className="btn btn-primary contact-page__submit">
                  💬 Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
