import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header className="header-container">
        <Link to="/" onClick={closeMenu}>
          <img 
            src="https://static.wixstatic.com/media/cdd9be_d63f4ce942b64baf8a658460902244af~mv2.png" 
            alt="妙根塗裝" 
            className="main-logo" 
          />
        </Link>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </div>
      </header>

      <nav className={`nav-overlay ${isOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>

        <Link to="/projects" className="nav-link" onClick={closeMenu}>Projects</Link>
        <Link to="/about" className="nav-link" onClick={closeMenu}>About Us</Link>
        <Link to="/recruit" className="nav-link" onClick={closeMenu}>Recruit</Link>
        <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>

      </nav>
    </>
  );
}
