import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/common/SectionHeader';
import LoadingState from '../components/common/LoadingState';
import { staggerContainer, staggerItem } from '../utils/animations';
import { getPublishedBerita } from '../services/api';
import './pages.css';

export default function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const beritaArray = await getPublishedBerita();

      // Urutkan berdasarkan tanggal terbaru (sudah diurutkan dari Supabase, tapi untuk jaga-jaga)
      const sortedData = [...beritaArray].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
      setBerita(sortedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter berdasarkan pencarian saja
  const filteredBerita = berita.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.judul.toLowerCase().includes(query) ||
      item.konten.toLowerCase().includes(query) ||
      (item.penulis && item.penulis.toLowerCase().includes(query)) ||
      (item.kategori && item.kategori.toLowerCase().includes(query))
    );
  });

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) return <LoadingState />;
  if (error) return <PageContainer><div className="error-message">{error}</div></PageContainer>;

  return (
    <PageContainer>
      <section className="page-section">
        <div className="container">
          <SectionHeader
            eyebrow="Informasi Terkini"
            title="Berita & Artikel"
            description="Kumpulan berita dan artikel terkait program Blue Carbon."
          />

          <div className="berita-search-wrapper">
            <div className="berita-search-box">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="search-icon">
                <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Cari berita berdasarkan judul, konten, atau penulis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="berita-search-input"
              />
              {searchQuery && (
                <button 
                  className="search-clear-btn"
                  onClick={() => setSearchQuery('')}
                  aria-label="Hapus pencarian"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {searchQuery && filteredBerita.length > 0 && (
            <div className="berita-results-info">
              Menampilkan {filteredBerita.length} berita untuk "{searchQuery}"
            </div>
          )}

          {filteredBerita.length === 0 ? (
            <div className="empty-state">
              <p>
                {searchQuery 
                  ? `Tidak ada berita yang cocok dengan pencarian "${searchQuery}".`
                  : 'Belum ada berita yang tersedia.'}
              </p>
            </div>
          ) : (
            <motion.div 
              className="berita-grid"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredBerita.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="berita-card glass-panel"
                  variants={staggerItem}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {item.gambar && (
                    <div className="berita-card-image">
                      <img src={item.gambar} alt={item.judul} />
                    </div>
                  )}
                  <div className="berita-card-content">
                    <div className="berita-card-meta">
                      <span className={`berita-kategori kategori-${item.kategori.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.kategori}
                      </span>
                      <span className="berita-tanggal">{formatTanggal(item.tanggal)}</span>
                    </div>
                    <h3 className="berita-card-title">{item.judul}</h3>
                    <p className="berita-card-excerpt">
                      {item.konten.substring(0, 150)}...
                    </p>
                    <Link to={`/berita/${item.id}`} className="berita-card-link">
                      Baca Selengkapnya →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
