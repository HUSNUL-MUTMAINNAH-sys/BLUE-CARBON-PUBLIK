import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  ArrowLeft,
  User,
  Sprout,
  Leaf,
  Ruler,
  ClipboardList,
  Map as MapIcon,
  Info,
  MapPin,
  Milestone,
  Waves,
  Wind,
  Calendar,
  Wallet,
  BarChart3,
  CalendarCheck,
  Activity,
} from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import LoadingState from '../components/common/LoadingState';
import Badge from '../components/common/Badge';
import { getLahanById, getAllMonitoring, formatRupiah } from '../services/api';
import './DetailLahan.css';

// Buat custom marker icon menggunakan divIcon
function buildDetailMarkerIcon() {
  const html = `
    <div class="map-marker map-marker--detail">
      <span class="map-marker__label">📍</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'map-marker-wrapper',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Format siklus panen menjadi "{nilai} x setahun", contoh: 2 -> "2 x setahun"
function formatSiklusPanen(nilai) {
  return `${nilai} x setahun`;
}

// Format produksi (kg) dari data MRV, contoh: 1.96 -> "1.96 kg"
function formatProduksi(angka) {
  return `${angka} kg`;
}

// Format tanggal ke format Indonesia, contoh: 22 Agustus 2026
function formatTanggalIndonesia(tanggal) {
  if (!tanggal) return null;
  return new Date(tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export default function DetailLahan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lahan, setLahan] = useState(null);
  const [monitoring, setMonitoring] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLahan() {
      try {
        setLoading(true);
        // Data Lahan (info dasar) dan Data MRV (riwayat monitoring) diambil terpisah,
        // lalu digabungkan di tampilan — bukan disimpan sebagai satu tabel/data duplikat.
        const [data, monitoringData] = await Promise.all([
          getLahanById(id),
          getAllMonitoring(id),
        ]);
        setLahan(data);
        setMonitoring(monitoringData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchLahan();
  }, [id]);

  // MRV terbaru untuk lahan ini: urutkan berdasarkan Tanggal Monitoring DESC, ambil 1 record teratas.
  // Backend sudah mengurutkan data ini, tapi diurutkan ulang di sini agar aman meski urutan API berubah.
  const latestMonitoring = [...monitoring].sort(
    (a, b) => new Date(b.monitoring_date) - new Date(a.monitoring_date)
  )[0] || null;

  if (loading) {
    return (
      <PageContainer>
        <div style={{ paddingTop: 140 }}>
          <LoadingState />
        </div>
      </PageContainer>
    );
  }

  if (error || !lahan) {
    return (
      <PageContainer>
        <section className="page-section">
          <div className="container">
            <div className="detail-error">
              <button onClick={() => navigate('/peta')} className="detail-back-btn">
                <ArrowLeft size={16} strokeWidth={2} />
                Kembali ke Peta
              </button>
              <h2>Data Tidak Ditemukan</h2>
              <p>{error || 'Lahan yang Anda cari tidak tersedia.'}</p>
            </div>
          </div>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="page-section detail-section">
        <div className="container">
          {/* Back Button */}
          <button onClick={() => navigate('/peta')} className="detail-back-btn">
            <ArrowLeft size={16} strokeWidth={2} />
            Kembali ke Peta
          </button>

          {/* Header */}
          <div className="detail-header">
            <h1 className="detail-title">{lahan.lokasi}</h1>
            <p className="detail-subtitle">Kelurahan Lembang, Kecamatan Bantaeng</p>
          </div>

          {/* Hero Image */}
          <div className="detail-hero">
            <img
              src={lahan.foto || lahan.gambar}
              alt={lahan.lokasi}
              className="detail-hero-img"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x400?text=Foto+Budidaya';
              }}
            />
          </div>

          {/* Quick Stats Cards */}
          <div className="detail-stats-grid">
            <div className="detail-stat-card">
              <div className="stat-icon-box">
                <User size={20} strokeWidth={1.75} />
              </div>
              <div className="stat-body">
                <div className="stat-label">Pembudidaya</div>
                <div className="stat-value">{lahan.pembudidaya}</div>
              </div>
            </div>
            <div className="detail-stat-card">
              <div className="stat-icon-box">
                <Sprout size={20} strokeWidth={1.75} />
              </div>
              <div className="stat-body">
                <div className="stat-label">Jenis Budidaya</div>
                <div className="stat-value">{lahan.jenisPelaku || '-'}</div>
              </div>
            </div>
            <div className="detail-stat-card">
              <div className="stat-icon-box">
                <Ruler size={20} strokeWidth={1.75} />
              </div>
              <div className="stat-body">
                <div className="stat-label">Luas Area</div>
                <div className="stat-value">{lahan.luas.toFixed(2)} ha</div>
              </div>
            </div>
            <div className="detail-stat-card">
              <div className="stat-icon-box">
                <ClipboardList size={20} strokeWidth={1.75} />
              </div>
              <div className="stat-body">
                <div className="stat-label">Status</div>
                <div className="stat-value">
                  <Badge status={lahan.status} compact />
                </div>
              </div>
            </div>
          </div>

          {/* Map + Location Info */}
          <div className="detail-two-col">
            <div className="detail-card detail-map-card">
              <h3 className="detail-card-title">
                <MapIcon size={18} strokeWidth={1.75} />
                Peta Lokasi
              </h3>
              <div className="detail-map">
                <MapContainer
                  center={[lahan.latitude, lahan.longitude]}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ width: '100%', height: '100%' }}
                >
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="Tiles &copy; Esri"
                  />
                  <Marker 
                    position={[lahan.latitude, lahan.longitude]}
                    icon={buildDetailMarkerIcon()}
                  >
                    <Popup>{lahan.lokasi}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>

            <div className="detail-card detail-info-card">
              <h3 className="detail-card-title">
                <Info size={18} strokeWidth={1.75} />
                Informasi Lokasi
              </h3>
              <div className="detail-location-info">
                <div className="info-row">
                  <span className="info-icon-box">
                    <MapPin size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <span className="info-label">Lokasi</span>
                    <span className="info-value">{lahan.lokasi}, Kelurahan Lembang,<br/>Kecamatan Bantaeng</span>
                  </div>
                </div>
                {lahan.akses && (
                  <div className="info-row">
                    <span className="info-icon-box">
                      <Milestone size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <span className="info-label">Akses</span>
                      <span className="info-value">{lahan.akses}</span>
                    </div>
                  </div>
                )}
                {lahan.kedalaman && (
                  <div className="info-row">
                    <span className="info-icon-box">
                      <Waves size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <span className="info-label">Kedalaman</span>
                      <span className="info-value">{lahan.kedalaman}</span>
                    </div>
                  </div>
                )}
                {lahan.jarakDariPantai && (
                  <div className="info-row">
                    <span className="info-icon-box">
                      <Ruler size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <span className="info-label">Jarak dari Pantai</span>
                      <span className="info-value">{lahan.jarakDariPantai}</span>
                    </div>
                  </div>
                )}
                {lahan.gelombang && (
                  <div className="info-row">
                    <span className="info-icon-box">
                      <Wind size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <span className="info-label">Gelombang</span>
                      <span className="info-value">{lahan.gelombang}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="detail-card detail-description-card">
            <h3 className="detail-card-title">Deskripsi & Keunggulan Lokasi</h3>
            <p className="detail-description-text">{lahan.deskripsi}</p>
          </div>

          {/* Data Produksi */}
          {(lahan.jumlahBentangan || lahan.panjangBentangan || lahan.siklusPanen || lahan.jenisBibit) && (
            <div className="detail-card detail-monitoring-card">
              <h3 className="detail-card-title">
                <BarChart3 size={18} strokeWidth={1.75} />
                Data Produksi
              </h3>
              <div className="detail-data-grid">
                {lahan.jumlahBentangan && (
                  <div className="data-item">
                    <div className="data-icon"><Sprout size={28} strokeWidth={1.5} /></div>
                    <div className="data-value">{lahan.jumlahBentangan} unit</div>
                    <div className="data-label">Jumlah Bentangan Tali</div>
                  </div>
                )}
                {lahan.panjangBentangan && (
                  <div className="data-item">
                    <div className="data-icon"><Ruler size={28} strokeWidth={1.5} /></div>
                    <div className="data-value">{lahan.panjangBentangan} meter</div>
                    <div className="data-label">Panjang Tali Bentangan</div>
                  </div>
                )}
                {lahan.siklusPanen && (
                  <div className="data-item">
                    <div className="data-icon"><Calendar size={28} strokeWidth={1.5} /></div>
                    <div className="data-value">{formatSiklusPanen(lahan.siklusPanen)}</div>
                    <div className="data-label">Siklus Panen</div>
                    <div className="data-sublabel">(Panen dalam 1 tahun)</div>
                  </div>
                )}
                {lahan.jenisBibit && (
                  <div className="data-item">
                    <div className="data-icon"><Leaf size={28} strokeWidth={1.5} /></div>
                    <div className="data-value">{lahan.jenisBibit}</div>
                    <div className="data-label">Jenis Bibit</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Data Monitoring Terbaru — bersumber langsung dari MRV terbaru (ID Lahan + Tanggal Monitoring DESC).
              Tidak ada data duplikat: nilai ini selalu mengikuti record MRV paling baru untuk lahan ini. */}
          <div className="detail-card detail-monitoring-card">
            <h3 className="detail-card-title">
              <Activity size={18} strokeWidth={1.75} />
              Data Monitoring Terbaru
            </h3>
            <div className="detail-data-grid">
              <div className="data-item">
                <div className="data-icon"><BarChart3 size={28} strokeWidth={1.5} /></div>
                <div className="data-value">{latestMonitoring ? formatProduksi(latestMonitoring.production) : '-'}</div>
                <div className="data-label">Produksi</div>
              </div>
              <div className="data-item">
                <div className="data-icon"><Wallet size={28} strokeWidth={1.5} /></div>
                <div className="data-value">{latestMonitoring ? formatRupiah(latestMonitoring.revenue) : '-'}</div>
                <div className="data-label">Penghasilan / Panen</div>
              </div>
              <div className="data-item">
                <div className="data-icon"><CalendarCheck size={28} strokeWidth={1.5} /></div>
                <div className="data-value">
                  {latestMonitoring ? formatTanggalIndonesia(latestMonitoring.monitoring_date) : '-'}
                </div>
                <div className="data-label">Diperbarui Pada</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
