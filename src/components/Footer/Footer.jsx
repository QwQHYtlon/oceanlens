import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navLinks = [
    { path: '/', label: '首頁' },
    { path: '/explore', label: '探索海洋' },
    { path: '/species', label: '海洋生物' },
    { path: '/simulation', label: '生態模擬' },
    { path: '/ai', label: 'AI 科普' }
  ];
  
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <h3 className="footer__title">OceanLens</h3>
          <p className="footer__subtitle">海洋透視鏡</p>
          <p className="footer__tagline">讓不能潛水的人，也能探索海洋。</p>
        </div>
        
        <div className="footer__links">
          <h4 className="footer__heading">導航</h4>
          <ul className="footer__nav">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="footer__info">
          <h4 className="footer__heading">關於</h4>
          <p className="footer__description">
            Interactive Ocean Education Platform
          </p>
          <p className="footer__copyright">
            © 2026 OceanLens. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
