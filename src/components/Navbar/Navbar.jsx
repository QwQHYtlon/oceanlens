import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../Button/Button';
import { navItems, isNavItemActive } from '../../data/navigation';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [menuPath, setMenuPath] = useState(location.pathname);
  const isOpen = menuOpen && menuPath === location.pathname;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setMenuOpen(!isOpen);
    setMenuPath(location.pathname);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" aria-label="主要導覽">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="OceanLens 首頁">
          <span className="navbar__logo-text">OceanLens</span>
          <span className="navbar__logo-subtitle">海洋透視鏡</span>
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-label={isOpen ? '關閉選單' : '開啟選單'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {isOpen && (
          <button
            type="button"
            className="navbar__backdrop"
            aria-label="關閉選單"
            onClick={closeMenu}
          />
        )}

        <div
          id="primary-navigation"
          className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}
        >
          {navItems.map((item) => {
            const active = isNavItemActive(item.path, location.pathname);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`navbar__link ${active ? 'navbar__link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="navbar__cta">
            <Button to="/explore" variant="primary" size="small" onClick={closeMenu}>
              開始探索
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
