import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

const Card = ({ 
  children, 
  variant = 'default', 
  hover = true,
  onClick,
  className = '',
  ...props 
}) => {
  const baseClasses = 'card';
  const variantClasses = `card--${variant}`;
  const hoverClasses = hover ? 'card--hover' : '';
  
  const classes = `${baseClasses} ${variantClasses} ${hoverClasses} ${className}`.trim();
  
  const MotionDiv = motion.div;
  
  return (
    <MotionDiv
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};

export default Card;
