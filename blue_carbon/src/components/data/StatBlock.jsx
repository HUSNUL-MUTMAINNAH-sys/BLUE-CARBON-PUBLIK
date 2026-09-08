import { motion } from 'framer-motion';
import { scaleUp, pulse } from '../../utils/animations';
import './data.css';

export default function StatBlock({ value, label }) {
  return (
    <motion.div 
      className="stat-block glass-panel"
      initial="hidden"
      animate="visible"
      variants={scaleUp}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
    >
      <motion.div 
        className="stat-value"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        {value}
      </motion.div>
      <div className="stat-label">{label}</div>
    </motion.div>
  );
}
