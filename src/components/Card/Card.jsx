import { motion } from 'framer-motion';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  hover = false,
  onClick,
  className = '',
  role,
  tabIndex,
  onKeyDown,
  ...props
}) => {
  const classes = ['card', `card--${variant}`, hover ? 'card--hover' : '', className]
    .filter(Boolean)
    .join(' ');
  const interactive = typeof onClick === 'function';

  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (!interactive || event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event);
    }
  };

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' } : undefined}
      transition={{ duration: 0.3 }}
      role={role ?? (interactive ? 'button' : undefined)}
      tabIndex={tabIndex ?? (interactive ? 0 : undefined)}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
