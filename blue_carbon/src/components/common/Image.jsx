import { useState } from 'react';
import { motion } from 'framer-motion';
import './common.css';

export default function Image({ src, alt = '', className = '', style, fallbackText = 'Gambar tidak tersedia' }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`img-wrap ${className}`} style={style}>
      {!errored && src ? (
        <>
          {!loaded && (
            <motion.div 
              className="state-block" 
              style={{ 
                position: 'absolute', 
                inset: 0, 
                height: '100%', 
                padding: '20px',
                background: 'var(--ocean)'
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: loaded ? 0 : 1 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{ 
                  width: 24, 
                  height: 24, 
                  border: '2px solid rgba(255,255,255,0.2)', 
                  borderTopColor: 'var(--accent-teal)',
                  borderRadius: '50%'
                }}
              />
            </motion.div>
          )}
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setErrored(true)}
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.1 }}
            transition={{ duration: 0.6 }}
          />
        </>
      ) : (
        <motion.div 
          className="state-block" 
          style={{ height: '100%', padding: '20px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span style={{ fontSize: 12 }}>{fallbackText}</span>
        </motion.div>
      )}
    </div>
  );
}
