import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import Logo from './Logo';

const contactEmail = process.env.REACT_APP_CONTACT_EMAIL || 'xaa6090@gmail.com';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo light />
          <p className="footer-blurb">
            Independent thinking. Measured decisions. Better-built outcomes.
          </p>
        </div>

        <div className="footer-col">
          <span className="footer-label">Explore</span>
          <Link to="/">Home</Link>
          <Link to="/about">About Navan</Link>
          <Link to="/services">Our services</Link>
          <Link to="/sectors">Sectors</Link>
          <Link to="/projects">Projects</Link>
        </div>

        <div className="footer-col">
          <span className="footer-label">Connect</span>
          <Link to="/contact">
            Contact us <ArrowUpRight size={14} />
          </Link>
          <Link to="/careers">Careers</Link>
          {/* {contactEmail ? (
            <a href={`mailto:${contactEmail}`}>
              <Mail size={14} /> Email Navan
            </a>
          ) : (
            <Link to="/contact">
              <Mail size={14} /> Contact email
            </Link>
          )} */}
        </div>

        <div className="footer-last">
          <span className="footer-label">Start a conversation</span>
          <h3>Good projects begin with clear numbers.</h3>
          <Link to="/contact" className="footer-link">
            Talk to our team <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Navan Quantity Surveyors</span>
        <span>Cost clarity for the built environment.</span>
      </div>
    </footer>
  );
}