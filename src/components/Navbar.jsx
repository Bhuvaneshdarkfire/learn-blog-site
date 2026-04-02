import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pencilLogo from '../pencil logo.jpeg';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/courses', label: 'Courses' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" id="nav-logo">
          <img src={pencilLogo} alt="Pencil Classes" className="navbar__logo-img" />
          <span className="navbar__logo-text">Pencil Classes</span>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`} id="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                {location.pathname === link.path && <span className="navbar__link-indicator" />}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/courses" className="btn btn-primary navbar__cta" id="nav-cta">
          Explore Courses
        </Link>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-burger"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
