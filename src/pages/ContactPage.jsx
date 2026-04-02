import { useState } from 'react';
import './ContactPage.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', grade: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', phone: '', grade: '', message: '' });
  };

  return (
    <main className="contact-page" id="contact-page">
      <section className="contact-page__hero">
        <div className="container">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">
            Have questions? We'd love to hear from you. Reach out to us anytime!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-page__grid">
            {/* Contact Info */}
            <div className="contact-page__info">
              <div className="contact-page__info-cards">
                {[
                  { icon: '📍', title: 'Visit Us', text: '123 Education Lane,\nCity - 636001, Tamil Nadu' },
                  { icon: '📞', title: 'Call Us', text: '+91 98765 43210\n+91 87654 32109' },
                  { icon: '✉️', title: 'Email Us', text: 'info@pencilclass.edu\nadmissions@pencilclass.edu' },
                  { icon: '🕐', title: 'Working Hours', text: 'Mon - Sat: 9:00 AM - 7:00 PM\nSunday: Closed' },
                ].map((item, i) => (
                  <div key={i} className="contact-page__card glass-card" id={`contact-card-${i}`}>
                    <span className="contact-page__card-icon">{item.icon}</span>
                    <div>
                      <h3 className="contact-page__card-title">{item.title}</h3>
                      <p className="contact-page__card-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="contact-page__form-wrapper glass-card">
              <h2 className="contact-page__form-title">Send us a Message</h2>

              {submitted && (
                <div className="contact-page__success" id="contact-success">
                  ✅ Thank you! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-page__form" id="contact-form">
                <div className="contact-page__field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="contact-page__row">
                  <div className="contact-page__field">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div className="contact-page__field">
                    <label htmlFor="contact-phone">Phone</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>

                <div className="contact-page__field">
                  <label htmlFor="contact-grade">Grade / Class</label>
                  <select
                    id="contact-grade"
                    name="grade"
                    value={form.grade}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a grade</option>
                    <option value="KG">Kindergarten (KG)</option>
                    <option value="1-5">Grade 1 - 5</option>
                    <option value="6-8">Grade 6 - 8</option>
                    <option value="9-10">Grade 9 - 10</option>
                    <option value="11-12">Grade 11 - 12</option>
                  </select>
                </div>

                <div className="contact-page__field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary contact-page__submit" id="contact-submit">
                  Send Message
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
