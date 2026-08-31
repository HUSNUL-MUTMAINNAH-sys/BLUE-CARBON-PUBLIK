import { motion } from 'framer-motion';
import { hoverScale, tapEffect } from '../../utils/animations';
import './common.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  onClick,
  href,
  type = 'button',
  disabled,
  ariaLabel,
}) {
  const classes = `btn btn-${variant} btn-${size}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="btn-icon">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <motion.a 
        href={href} 
        className={classes} 
        aria-label={ariaLabel}
        whileHover={!disabled ? hoverScale.hover : {}}
        whileTap={!disabled ? tapEffect.tap : {}}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={!disabled ? hoverScale.hover : {}}
      whileTap={!disabled ? tapEffect.tap : {}}
    >
      {content}
    </motion.button>
  );
}
