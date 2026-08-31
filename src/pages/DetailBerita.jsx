import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageContainer from '../components/layout/PageContainer';
import LoadingState from '../components/common/LoadingState';
import { getBeritaById } from '../services/api';
import './pages.css';

export default function DetailBerita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBerita();
  }, [id]);

  const fetchBerita = async () => {
    try {
      setLoading(true);
      const data = await getBeritaById(id);
      setBerita(data);
    } catch (err) {
      if (err.message && err.message.includes('tidak ditemukan')) {
        navigate('/berita');
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
  if (!berita) return null;

  return (
    <PageContainer>
      <section className="page-section">
        <div className="container" style={{ maxWidth: 840 }}>
          <Link to="/berita" className="back-link">
            ← Kembali ke Berita
          </Link>

          <motion.article 
            className="berita-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="berita-detail-header">
              <span className={`berita-kategori kategori-${berita.kategori.toLowerCase().replace(/\s+/g, '-')}`}>
                {berita.kategori}
              </span>
              <h1 className="berita-detail-title">{berita.judul}</h1>
              <div className="berita-detail-meta">
                <span className="berita-tanggal">{formatTanggal(berita.tanggal)}</span>
                {berita.penulis && <span className="berita-penulis">oleh {berita.penulis}</span>}
              </div>
            </div>

            {berita.gambar && (
              <div className="berita-detail-image">
                <img src={berita.gambar} alt={berita.judul} />
              </div>
            )}

            <div className="berita-detail-content">
              {berita.konten && berita.konten.split('\n').map((paragraph, index) => (
                paragraph.trim() && <p key={index}>{paragraph}</p>
              ))}
            </div>

            {berita.tags && berita.tags.length > 0 && (
              <div className="berita-tags">
                {berita.tags.map((tag, index) => (
                  <span key={index} className="berita-tag">{tag}</span>
                ))}
              </div>
            )}
          </motion.article>

          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <Link to="/berita" className="btn btn-secondary">
              Lihat Berita Lainnya
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
