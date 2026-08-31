import PageContainer from '../components/layout/PageContainer';
import SectionHeader from '../components/common/SectionHeader';
import './pages.css';

const LINKS = [
  {
    title: 'Website Resmi Kelurahan Lembang',
    url: 'https://lembang-bantaengkab.digitaldesa.id/',
    description: 'Portal resmi Kelurahan Lembang'
  },
  {
    title: 'Portal Data Kelurahan Lembang',
    url: 'https://portaldatalembangbantaeng.net/',
    description: 'Data dan informasi terpadu kelurahan'
  },
  {
    title: 'Website RW 05 Biring Kassi Kelurahan Lembang',
    url: 'https://birkas.online/',
    description: 'Informasi wilayah RW 05'
  },
  {
    title: 'Blog Inovasi Kelurahan Lembang',
    url: 'https://lembangsquadbantaeng.blogspot.com/',
    description: 'Inovasi dan kegiatan kelurahan'
  },
  {
    title: 'Blog TP PKK Kelurahan Lembang',
    url: 'https://tppkklembangbantaeng.blogspot.com/',
    description: 'Tim Penggerak PKK Kelurahan Lembang'
  },
  {
    title: 'Smart Tour Kelurahan Lembang',
    url: 'https://www.keypano.com/v/c63yccwddfma_9-1775624093.html',
    description: 'Tour virtual 360° Kelurahan Lembang'
  }
];

export default function Program() {
  return (
    <PageContainer>
      <section className="page-section">
        <div className="container">
          <SectionHeader 
            eyebrow="Lembang Bergerak Digital" 
            title="Program & Link Terkait"
            description="Portal dan website program Lembang Bergerak Digital"
          />

          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {LINKS.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = 'var(--accent-teal)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  }}
                >
                  <h3 style={{ 
                    color: 'var(--ink)', 
                    fontFamily: 'var(--font-heading)', 
                    fontWeight: 400,
                    fontSize: '1.25rem',
                    margin: 0
                  }}>
                    {link.title}
                  </h3>
                  <p style={{ 
                    color: 'var(--muted)', 
                    fontSize: '0.9rem',
                    margin: 0 
                  }}>
                    {link.description}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    color: 'var(--accent-teal)',
                    fontSize: '0.85rem',
                    marginTop: '0.25rem'
                  }}>
                    <span>{link.url}</span>
                    <span>↗</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="glass-panel" style={{ padding: '2rem', marginTop: '2.5rem' }}>
              <h4 style={{ 
                color: 'var(--ink)', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 400, 
                marginBottom: '1rem',
                fontSize: '1.25rem'
              }}>
                Tentang Program
              </h4>
              <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.6 }}>
                Lembang Bergerak Digital adalah inisiatif transformasi digital Kelurahan Lembang, 
                Kecamatan Bantaeng, Sulawesi Selatan. Program ini mencakup berbagai platform digital 
                untuk meningkatkan transparansi, pelayanan publik, dan pemberdayaan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
