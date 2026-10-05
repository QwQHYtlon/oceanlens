import React from 'react';
import Card from '../Card/Card';
import './ChartCard.css';

const ChartCard = ({ title, children }) => {
  return (
    <Card variant="glass" className="chart-card">
      <h3 className="chart-card__title">{title}</h3>
      <div className="chart-card__content">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;
