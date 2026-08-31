import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../utils/animations';
import './layout.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <motion.div 
          className="footer-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="footer-brand" variants={staggerItem}>
            <strong>Blue Carbon</strong>
            <p style={{ maxWidth: 340 }}>
              Sistem digital MRV dan rintisan karbon biru berbasis budidaya rumput laut
              masyarakat Kelurahan Lembang, Kecamatan Bantaeng, Sulawesi Selatan.
            </p>
          </motion.div>
          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Navigasi</h4>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/">Beranda</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/berita">Berita</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/peta">Peta</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/mrv">MRV</Link>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Link to="/kontak">Kontak</Link>
            </motion.div>
          </motion.div>
          <motion.div className="footer-col" variants={staggerItem}>
            <h4>Program</h4>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://lembang-bantaengkab.digitaldesa.id/" target="_blank" rel="noopener noreferrer">
                Website Resmi Kelurahan
              </a>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://portaldatalembangbantaeng.net/" target="_blank" rel="noopener noreferrer">
                Portal Data
              </a>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://birkas.online/" target="_blank" rel="noopener noreferrer">
                Website RW 05 Biring Kassi
              </a>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://lembangsquadbantaeng.blogspot.com/" target="_blank" rel="noopener noreferrer">
                Blog Inovasi
              </a>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://tppkklembangbantaeng.blogspot.com/" target="_blank" rel="noopener noreferrer">
                Blog TP PKK
              </a>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <a href="https://www.keypano.com/v/c63yccwddfma_9-1775624093.html" target="_blank" rel="noopener noreferrer">
                Smart Tour 360°
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <span>© 2026 Kelurahan Lembang, Kecamatan Bantaeng. Mode demonstrasi.</span>
          <span>Dibuat oleh Mahasiswa KKN 79 UIN Alauddin Makassar</span>
        </motion.div>
      </div>
    </footer>
  );
}
