import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__gradient-line" />
      
      <div className="footer__inner container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <span className="footer__logo-icon">✏️</span>
              <span className="footer__logo-text">Pencil Class</span>
            </Link>
            <p className="footer__tagline">
              Shaping tomorrow's leaders through innovative education from Kindergarten to 12th Grade.
            </p>
            <div className="footer__socials">
              {['Facebook', 'Instagram', 'YouTube', 'WhatsApp'].map((s) => (
                <a key={s} href="#" className="footer__social-link" aria-label={s}>
                  {s === 'Facebook' && '📘'}
                  {s === 'Instagram' && '📸'}
                  {s === 'YouTube' && '▶️'}
                  {s === 'WhatsApp' && '💬'}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <ul className="footer__list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/courses">Courses</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Grades */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Programs</h4>
            <ul className="footer__list">
              <li><Link to="/courses">Kindergarten (KG)</Link></li>
              <li><Link to="/courses">Grade 1 - 5</Link></li>
              <li><Link to="/courses">Grade 6 - 8</Link></li>
              <li><Link to="/courses">Grade 9 - 10 (Board Prep)</Link></li>
              <li><Link to="/courses">Grade 11 - 12 (JEE/NEET)</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get in Touch</h4>
            <ul className="footer__list footer__contact-list">
              <li>
                <span>📍</span>
                123 Education Lane, City - 636001
              </li>
              <li>
                <span>📞</span>
                +91 98765 43210
              </li>
              <li>
                <span>✉️</span>
                info@pencilclass.edu
              </li>
              <li>
                <span>🕐</span>
                Mon - Sat: 9:00 AM - 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Pencil Class. All rights reserved.</p>
          <p>Designed with ❤️ for education</p>
        </div>
      </div>
    </footer>
  );
}
