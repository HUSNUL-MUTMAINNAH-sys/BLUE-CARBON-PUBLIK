import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/common/SectionHeader';
import { buildMarkerIcon } from '../components/map/MapMarker';
import 'leaflet/dist/leaflet.css';
import '../components/map/map.css';
import './pages.css';

const OFFICE_COORDS = [-5.5508, 119.9601];

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/kellembangbtg/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '40px', height: '40px' }}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: '#1877f2'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/lembangsquadbantaeng/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '40px', height: '40px' }}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: '#e4405f'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@kelurahanlembangbantaeng?si=EqUEaEeyc4PjTZDh',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '40px', height: '40px' }}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: '#ff0000'
  },
  {
    name: 'WhatsApp',
    url: 'https://whatsapp.com/channel/0029Vb8YMztGufIvSwwJh112',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '40px', height: '40px' }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.484 1.34 5.004l-1.42 5.185 5.309-1.393a9.96 9.96 0 0 0 4.768 1.213h.005c5.513 0 9.996-4.483 9.996-9.997a9.93 9.93 0 0 0-2.928-7.07 9.933 9.933 0 0 0-7.073-2.939zm5.848 15.845a8.283 8.283 0 0 1-5.851 2.423h-.004a8.3 8.3 0 0 1-4.229-1.158l-.303-.18-3.15.826.841-3.07-.198-.315a8.264 8.264 0 0 1-1.267-4.404c0-4.583 3.73-8.312 8.316-8.312a8.26 8.26 0 0 1 5.877 2.438 8.257 8.257 0 0 1 2.435 5.878 8.285 8.285 0 0 1-2.467 5.874z"/>
      </svg>
    ),
    color: '#25D366'
  }
];

export default function Kontak() {
  return (
    <PageContainer>
      <section className="page-section">
        <div className="container">
          <SectionHeader eyebrow="Hubungi Kami" title="Kontak Program" />

          <div className="two-col-grid">
            <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', height: 380 }}>
              <MapContainer key={OFFICE_COORDS.join(',')} center={OFFICE_COORDS} zoom={17} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='Tiles &copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
                <Marker position={OFFICE_COORDS} icon={buildMarkerIcon('📍', true)}>
                  <Popup>Kantor Kelurahan Lembang, Kecamatan Bantaeng</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className="glass-panel" style={{ padding: 28 }}>
              <h4 style={{ color: 'var(--ink)', fontFamily: 'var(--font-heading)', fontWeight: 400, marginBottom: 20 }}>
                Informasi Lokasi
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alamat</div>
                  <p style={{ color: 'var(--ink)', marginTop: 4 }}>
                    Kelurahan Lembang<br />
                    Kecamatan Bantaeng<br />
                    Kabupaten Bantaeng<br />
                    Sulawesi Selatan
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Program</div>
                  <p style={{ color: 'var(--ink)', marginTop: 4 }}>Lembang Bergerak Digital</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <h4 style={{ 
              color: 'var(--ink)', 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 400, 
              marginBottom: '1.5rem',
              fontSize: '1.5rem'
            }}>
              Media Sosial
            </h4>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    const circle = e.currentTarget.querySelector('.social-circle');
                    if (circle) {
                      circle.style.background = social.color;
                      circle.style.transform = 'scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    const circle = e.currentTarget.querySelector('.social-circle');
                    if (circle) {
                      circle.style.background = 'rgba(14, 71, 80, 0.08)';
                      circle.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <div 
                    className="social-circle"
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'rgba(14, 71, 80, 0.08)',
                      border: '2px solid rgba(14, 71, 80, 0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--ink)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {social.icon}
                  </div>
                  <div style={{ 
                    color: 'var(--ink)', 
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    maxWidth: '120px'
                  }}>
                    {social.name}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
