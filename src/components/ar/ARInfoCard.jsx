import React from 'react';
import './ARInfoCard.css';

const ARInfoCard = ({ 
  name, 
  englishName, 
  depth, 
  description 
}) => {
  return (
    <div className="ar-info-card">
      <h3 className="ar-info-card__name">{name}</h3>
      <p className="ar-info-card__english">{englishName}</p>
      <div className="ar-info-card__meta">
        <span className="ar-info-card__depth">深度：{depth}</span>
      </div>
      <p className="ar-info-card__description">{description}</p>
    </div>
  );
};

export default ARInfoCard;
