import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Timetable Generator</h3>
          <p className="footer-text">
            An automated solution for university faculty scheduling with optimal resource utilization.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" className="social-link">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" className="social-link">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://linkedin.com" className="social-link">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com" className="social-link">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            <li><Link to="/profile" className="footer-link">My Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-contact">
            <li>123 University Avenue</li>
            <li>City, State 12345</li>
            <li>Email: info@timetable.edu</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Faculty Timetable Generator. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;