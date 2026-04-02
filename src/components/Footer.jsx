import { Link } from 'react-router-dom';
import { businessInfo } from '../data/coursesData';
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
              <span className="footer__logo-text">Pencil Classes</span>
            </Link>
            <p className="footer__tagline">
              Kids After School Program — Handwriting, Drawing & Tuition by {businessInfo.founder}.
            </p>
            <div className="footer__socials">
              <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">📸</a>
              <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="WhatsApp">💬</a>
              <a href={`mailto:${businessInfo.email}`} className="footer__social-link" aria-label="Email">✉️</a>
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

          {/* Our Courses */}
          <div className="footer__col">
            <h4 className="footer__col-title">Our Courses</h4>
            <ul className="footer__list">
              <li><Link to="/courses">Cursive Handwriting</Link></li>
              <li><Link to="/courses">Print & Lucida Handwriting</Link></li>
              <li><Link to="/courses">Tamil Handwriting</Link></li>
              <li><Link to="/courses">Calligraphy</Link></li>
              <li><Link to="/courses">Drawing Classes</Link></li>
              <li><Link to="/courses">All Subject Tuition</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get in Touch</h4>
            <ul className="footer__list footer__contact-list">
              <li>
                <span>📱</span>
                <a href={`https://wa.me/91${businessInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">+91 {businessInfo.whatsapp}</a>
              </li>
              <li>
                <span>✉️</span>
                <a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a>
              </li>
              <li>
                <span>📸</span>
                <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer">{businessInfo.instagramHandle}</a>
              </li>
              <li>
                <span>🌍</span>
                Online & Offline
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Pencil Classes by {businessInfo.founder}. All rights reserved.</p>
          <p>Designed with ❤️ for education</p>
        </div>
      </div>
    </footer>
  );
}
