import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { slideLeft, slideRight, staggerContainer, staggerItem } from '../utils/animations';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import LoadingState from '../components/common/LoadingState';
import useLocations from '../hooks/useLocations';
import useAutoPlay from '../hooks/useAutoPlay';
import { getPublishedBerita } from '../services/api';
import aerial from '../assets/images/hero/aerial-coastal.png';
import underwater from '../assets/images/mrv/underwater-seaweed.png';
import underwaterAlt from '../assets/images/backgrounds/underwater-alt.png';
import './pages.css';

const SLIDES = [
  { src: aerial, alt: 'Budidaya rumput laut di perairan Kelurahan Lembang' },
  { src: underwater, alt: 'Pemantauan bawah air area budidaya rumput laut' },
  { src: underwaterAlt, alt: 'Tali bentangan budidaya rumput laut di pesisir' },
];

// Konten cadangan yang ditampilkan jika belum ada berita Publish dari Admin Panel
const BERITA_FALLBACK = [
  {
    id: 1,
    image: aerial,
    date: '21 Mei 2026',
    title: 'Pendataan Pembudidaya Rumput Laut di Tamalange',
    desc: 'Kegiatan pendataan pembudidaya rumput laut untuk memperbarui data produksi dan kondisi lapangan.',
  },
  {
    id: 2,
    image: underwater,
    date: '18 Mei 2026',
    title: 'Pembaruan Data Potensi Budidaya Rumput Laut',
    desc: 'Update data potensi dan sebaran lokasi budidaya rumput laut di Kelurahan Lembang.',
  },
  {
    id: 3,
    image: underwaterAlt,
    date: '15 Mei 2026',
    title: 'Waktu Tanam Terbaik: Mei – Juli',
    desc: 'Periode Mei hingga Juli merupakan waktu terbaik untuk memulai budidaya rumput laut dengan hasil yang optimal.',
  },
];

function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="3.4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="10" cy="10" r="1" fill="currentColor" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 16C4 8 10 4 17 4C17 11 13 16 6 16H4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 16C7 12 10 9 15 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="7.5" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 16c0-2.8 2.2-4.6 5-4.6s5 1.8 5 4.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="7.6" r="2.1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M12.6 11.6c2.2.2 3.9 1.8 3.9 4.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 8H17" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.5 2.5V5.5M13.5 2.5V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function formatTanggalBerita(tanggal) {
  const date = new Date(tanggal);
  if (Number.isNaN(date.getTime())) return tanggal;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function truncate(text, max = 140) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

export default function Beranda() {
  const navigate = useNavigate();
  const { loading, totalArea, totalFarmers, totalPoints } = useLocations();
  const [slide, setSlide] = useState(0);
  const [berita, setBerita] = useState(BERITA_FALLBACK);
  const [beritaLoading, setBeritaLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadBerita() {
      try {
        const published = await getPublishedBerita();
        if (!active) return;
        if (published && published.length > 0) {
          setBerita(
            published.slice(0, 3).map((item) => ({
              id: item.id,
              image: item.gambar,
              date: formatTanggalBerita(item.tanggal),
              title: item.judul,
              desc: truncate(item.konten),
            }))
          );
        }
      } catch (error) {
        console.error('Gagal memuat berita terbaru:', error);
        // Biarkan konten cadangan tetap tampil jika API belum tersedia
      } finally {
        if (active) setBeritaLoading(false);
      }
    }

    loadBerita();
    return () => {
      active = false;
    };
  }, []);

  const goNext = useCallback(() => {
    setSlide((s) => (s + 1) % SLIDES.length);
  }, []);
  const goPrev = useCallback(() => {
    setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const autoPlay = useAutoPlay(goNext, 5500);
  useEffect(() => {
    autoPlay.start();
    return () => autoPlay.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer className="no-top-pad">
      <section className="hero hero-carousel">
        <div className="hero-slides">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              className="hero-slide"
              style={{ backgroundImage: `url(${SLIDES[slide].src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              role="img"
              aria-label={SLIDES[slide].alt}
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay" />

        <button
          type="button"
          className="hero-nav-arrow hero-nav-arrow-left"
          onClick={goPrev}
          aria-label="Gambar sebelumnya"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 3.5 5 9l6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-nav-arrow hero-nav-arrow-right"
          onClick={goNext}
          aria-label="Gambar berikutnya"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 3.5l6 5.5-6 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="container hero-content">
          <motion.div
            className="hero-left fade-in"
            initial="hidden"
            animate="visible"
            variants={slideLeft}
          >
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Lembang Bergerak Digital
            </motion.span>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Blue<br />Carbon
            </motion.h1>
            <motion.p
              className="hero-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Sistem Digital MRV &amp; Rintisan Karbon Biru Berbasis Budidaya Rumput Laut.
              Membangun fondasi data, pemetaan, dan sistem MRV untuk mendokumentasikan
              aktivitas budidaya rumput laut masyarakat Kelurahan Lembang.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button variant="primary" onClick={() => navigate('/peta')}>Jelajahi Peta →</Button>
              <Button variant="outline" onClick={() => navigate('/mrv')}>Pelajari Program</Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-right glass-panel fade-in"
            initial="hidden"
            animate="visible"
            variants={slideRight}
          >
            {loading ? (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <LoadingState />
              </div>
            ) : (
              <>
                <motion.div
                  className="hero-panel-label"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Lokasi Terpetakan
                </motion.div>
                <div className="hero-stats-grid">
                  <motion.div
                    className="hero-stat-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <span className="hero-stat-icon"><IconTarget /></span>
                    <span className="hero-stat-text">
                      <span className="hero-stat-value">{totalPoints}</span>
                      <span className="hero-stat-caption">Titik Budidaya</span>
                    </span>
                  </motion.div>
                  <motion.div
                    className="hero-stat-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65 }}
                  >
                    <span className="hero-stat-icon"><IconLeaf /></span>
                    <span className="hero-stat-text">
                      <span className="hero-stat-value">{totalArea.toFixed(1).replace('.', ',')} ha</span>
                      <span className="hero-stat-caption">Luas Area</span>
                    </span>
                  </motion.div>
                  <motion.div
                    className="hero-stat-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                  >
                    <span className="hero-stat-icon"><IconUsers /></span>
                    <span className="hero-stat-text">
                      <span className="hero-stat-value">{totalFarmers}</span>
                      <span className="hero-stat-caption">Pembudidaya</span>
                    </span>
                  </motion.div>
                  <motion.div
                    className="hero-stat-item"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 }}
                  >
                    <span className="hero-stat-icon"><IconCalendar /></span>
                    <span className="hero-stat-text">
                      <span className="hero-stat-caption">Waktu Tanam Terbaik</span>
                      <span className="hero-stat-value hero-stat-value-sm">Mei – Juli</span>
                    </span>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <div className="hero-dots">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`hero-dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
              aria-label={`Tampilkan gambar ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="berita-section">
        <div className="container">
          <div className="berita-header">
            <h2>Berita Terbaru</h2>
            <button 
              className="berita-see-all" 
              onClick={() => navigate('/berita')}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Lihat Semua Berita →
            </button>
          </div>

          <motion.div
            className="berita-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {berita.map((item) => (
              <motion.article 
                className="berita-card" 
                key={item.id} 
                variants={staggerItem}
                onClick={() => navigate(`/berita/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="berita-thumb">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="berita-body">
                  <span className="berita-date">
                    <IconCalendar />
                    {item.date}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <span className="berita-link">Baca Selengkapnya →</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </PageContainer>
  );
}
