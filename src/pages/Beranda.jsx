import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { slideLeft, staggerContainer, staggerItem } from '../utils/animations';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import useAutoPlay from '../hooks/useAutoPlay';
import { getPublishedBerita } from '../services/api';
import './pages.css';

// Placeholder images sementara sampai foto asli di-upload
// Gunakan Unsplash untuk preview
const SLIDES = [
  { src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&h=600&fit=crop', alt: 'Sunset dan aktivitas masyarakat di dermaga' },
  { src: 'https://images.unsplash.com/photo-1445531250444-715f4325eb24?w=1200&h=600&fit=crop', alt: 'Tim di tepi laut dengan hamparan rumput laut' },
  { src: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?w=1200&h=600&fit=crop', alt: 'Foto udara perahu-perahu di laut' },
  { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop', alt: 'Aktivitas pembudidaya dan hamparan rumput laut' },
  { src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop', alt: 'Aktivitas pembudidaya di area pengeringan' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop', alt: 'Area pengeringan dengan aktivitas masyarakat' },
];

// Konten cadangan yang ditampilkan jika belum ada berita Publish dari Admin Panel
const BERITA_FALLBACK = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800',
    date: '21 Mei 2026',
    title: 'Pendataan Pembudidaya Rumput Laut di Tamalangnge',
    desc: 'Kegiatan pendataan pembudidaya rumput laut untuk memperbarui data produksi dan kondisi lapangan.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    date: '18 Mei 2026',
    title: 'Pembaruan Data Potensi Budidaya Rumput Laut',
    desc: 'Update data potensi dan sebaran lokasi budidaya rumput laut di Kelurahan Lembang.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    date: '15 Mei 2026',
    title: 'Waktu Tanam Terbaik: Mei – Juli',
    desc: 'Periode Mei hingga Juli merupakan waktu terbaik untuk memulai budidaya rumput laut dengan hasil yang optimal.',
  },
];

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

  const autoPlay = useAutoPlay(goNext, 5000);
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
