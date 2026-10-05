import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  to,
  ...props 
}) => {
  const baseClasses = 'button';
  const variantClasses = `button--${variant}`;
  const sizeClasses = `button--${size}`;
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses}`.trim();
  
  const MotionButton = motion.button;
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  return (
    <MotionButton
      className={classes}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
};

export default Button;
