import { motion } from 'framer-motion';
import Badge from '../common/Badge';
import EmptyState from '../common/EmptyState';
import './data.css';

const tableVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3 }
  }
};

export default function DataTable({ rows, sortConfig, toggleSort, page, totalPages, onPrev, onNext }) {
  const columns = [
    { key: 'name', label: 'Nama Pembudidaya' },
    { key: 'location', label: 'Lokasi' },
    { key: 'area', label: 'Luas (ha)' },
    { key: 'cycle', label: 'Siklus' },
    { key: 'status', label: 'Status' },
    { key: 'updated', label: 'Update' },
  ];

  if (!rows.length) {
    return <EmptyState title="Tidak ada data yang cocok" description="Coba ubah kata kunci pencarian atau filter." />;
  }

  return (
    <motion.div 
      className="data-table-wrap glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="data-table">
        <motion.thead
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <tr>
            {columns.map((col) => (
              <motion.th 
                key={col.key} 
                onClick={() => toggleSort(col.key)}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
              >
                {col.label}
                {sortConfig.key === col.key && (
                  <motion.span 
                    className="sort-arrow"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {sortConfig.direction === 'asc' ? ' ↑' : ' ↓'}
                  </motion.span>
                )}
              </motion.th>
            ))}
          </tr>
        </motion.thead>
        <motion.tbody
          variants={tableVariants}
          initial="hidden"
          animate="visible"
        >
          {rows.map((row) => (
            <motion.tr 
              key={row.id}
              variants={rowVariants}
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                scale: 1.01
              }}
            >
              <td>{row.name}</td>
              <td>{row.location}</td>
              <td>{row.area.toFixed(2)}</td>
              <td>{row.cycle}</td>
              <td><Badge status={row.status} /></td>
              <td>{row.updated}</td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      <motion.div 
        className="table-pagination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.button 
          onClick={onPrev} 
          disabled={page === 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Sebelumnya
        </motion.button>
        <span>Halaman {page} dari {totalPages}</span>
        <motion.button 
          onClick={onNext} 
          disabled={page === totalPages}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Berikutnya →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
