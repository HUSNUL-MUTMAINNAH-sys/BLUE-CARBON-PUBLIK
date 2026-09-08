import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Komponen untuk animasi saat elemen muncul di viewport
 */
export default function ScrollReveal({ 
  children, 
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  once = true,
  className = ''
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: once,
    margin: "-100px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
