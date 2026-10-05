import React from 'react';
import './SectionTitle.css';

const SectionTitle = ({ title, subtitle, align = 'left' }) => {
  return (
    <div className={`section-title section-title--${align}`}>
      <h2 className="section-title__title">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
