import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoKelurahan from '../../assets/logo-kelurahan.png';
import './layout.css';

const NAV_ITEMS = [
  { label: 'Beranda', to: '/' },
  { label: 'Berita', to: '/berita' },
  { label: 'Peta', to: '/peta' },
  { label: 'MRV', to: '/mrv' },
  { label: 'Kontak', to: '/kontak' },
];

const menuVariants = {
  closed: { opacity: 0, height: 0 },
  open: { 
    opacity: 1, 
    height: "auto",
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 }
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header 
      className="navbar navbar-solid"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="navbar-inner container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-mark" aria-hidden="true">
            <img src={logoKelurahan} alt="" />
          </span>
          <span className="brand-text">
            <strong>BLUE CARBON</strong>
            <small>LEMBANG BERGERAK DIGITAL</small>
          </span>
        </NavLink>

        <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`} aria-label="Navigasi utama">
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="navbar-actions">
          <motion.button
            className="navbar-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <span /><span /><span />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
