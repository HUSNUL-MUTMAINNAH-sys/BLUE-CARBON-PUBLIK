import { motion } from 'framer-motion';
import { scaleUp } from '../../utils/animations';
import './common.css';

const statusMap = {
  Aktif: 'badge-aktif',
  'Dalam Pendataan': 'badge-pending',
  'Tidak Aktif': 'badge-inactive',
};

export default function Badge({ status, compact = false }) {
  const cls = statusMap[status] || 'badge-pending';
  return (
    <motion.span 
      className={`badge ${cls} ${compact ? 'badge-compact' : ''}`}
      initial="hidden"
      animate="visible"
      variants={scaleUp}
    >
      {status}
    </motion.span>
  );
}
