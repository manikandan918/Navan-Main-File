import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

const navigationLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Sectors', '/sectors'],
  ['Projects', '/projects'],
  ['Insights', '/news'],  
  ['Contact us', '/contact'],

];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button
          className="menu-toggle"
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <nav className={`main-nav ${isMenuOpen ? 'is-open' : ''}`}>
          {navigationLinks.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link className="nav-cta" to="/contact" onClick={closeMenu}>
            Let's talk <ArrowUpRight size={15} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
