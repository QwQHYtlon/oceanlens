import React from 'react';
import Card from '../Card/Card';
import './MetricCard.css';

const MetricCard = ({ value, label, description, icon }) => {
  return (
    <Card variant="glass" className="metric-card">
      {icon && <div className="metric-card__icon">{icon}</div>}
      <div className="metric-card__value">{value}</div>
      <div className="metric-card__label">{label}</div>
      {description && <p className="metric-card__description">{description}</p>}
    </Card>
  );
};

export default MetricCard;
