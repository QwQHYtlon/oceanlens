import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from '../Button/Button';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: '首頁' },
    { path: '/explore', label: '探索海洋' },
    { path: '/species', label: '海洋生物' },
    { path: '/simulation', label: '生態模擬' },
    { path: '/ai', label: 'AI 科普' }
  ];
  
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-text">OceanLens</span>
          <span className="navbar__logo-subtitle">海洋透視鏡</span>
        </Link>
        
        <button 
          className="navbar__toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
        
        <div className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navbar__link ${location.pathname === item.path ? 'navbar__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="navbar__cta">
            <Button to="/explore" variant="primary" size="small">
              開始探索
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
