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
          <div className="contact-page__layout">
            <div className="contact-page__info">
              <div className="contact-page__info-card glass-card">
                <span>📱</span>
                <h3>WhatsApp</h3>
                <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  +91 {businessInfo.whatsapp}
                </a>
              </div>
              <div className="contact-page__info-card glass-card">
                <span>📧</span>
                <h3>Email</h3>
                <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
              </div>
              <div className="contact-page__info-card glass-card">
                <span>📸</span>
                <h3>Instagram</h3>
                <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer">
                  {businessInfo.instagramHandle}
                </a>
              </div>
              <div className="contact-page__info-card glass-card">
                <span>🕐</span>
                <h3>Mode</h3>
                <p>Online (Zoom) & Offline</p>
              </div>
            </div>

            <div className="contact-page__form-wrapper glass-card">
              <h2>Send us a Message</h2>
              <p className="contact-page__form-desc">Fill the form and it will open WhatsApp with your message</p>
              {submitted && <div className="contact-page__success">✅ Opening WhatsApp...</div>}
              <form onSubmit={handleSubmit} className="contact-page__form">
                <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <select value={form.course} onChange={e => setForm({...form, course: e.target.value})}>
                  <option value="">Select Course</option>
                  <option>Cursive Handwriting</option>
                  <option>Print & Lucida Handwriting</option>
                  <option>Tamil Handwriting</option>
                  <option>Calligraphy</option>
                  <option>Drawing Classes</option>
                  <option>All Subject Tuition</option>
                  <option>Maths & Tamil Special</option>
                </select>
                <textarea placeholder="Your Message" rows={4} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                <button type="submit" className="btn btn-primary">💬 Send via WhatsApp</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
