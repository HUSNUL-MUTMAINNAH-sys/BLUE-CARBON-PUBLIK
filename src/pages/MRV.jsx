import { useEffect, useState, useMemo } from 'react';
import PageContainer from '../components/layout/PageContainer';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ProductionChart from '../components/mrv/ProductionChart';
import LocationComparisonChart from '../components/mrv/LocationComparisonChart';
import { getAllMonitoring, getAllLahan } from '../services/api';
import underwater from '../assets/images/mrv/underwater-seaweed.png';
import '../components/mrv/production-chart.css';
import './pages.css';

// Palet warna tetap untuk setiap lokasi (mengikuti tema teal yang sudah ada di desain)
const LOCATION_COLORS = ['#1C8C86', '#2FD1C7', '#0E5F62', '#8FE0DB'];

export default function MRV() {
  const [monitoring, setMonitoring] = useState([]);
  const [lahanList, setLahanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLokasi, setFilterLokasi] = useState('Semua Lokasi');
  const [filterTahun, setFilterTahun] = useState('Semua');

  useEffect(() => {
    async function fetchData() {
      try {
        const [monitoringData, lahanData] = await Promise.all([
          getAllMonitoring(),
          getAllLahan(),
        ]);
        setMonitoring(monitoringData);
        setLahanList(lahanData);
      } catch (error) {
        console.error('Error loading data MRV:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Gabungkan data monitoring dengan lokasi lahan (data lahan & data MRV tetap terpisah di database)
  const joined = useMemo(() => {
    return monitoring.map((m) => {
      const lahan = lahanList.find((l) => l.id === m.land_id);
      return { ...m, lokasi: lahan?.lokasi || 'Tidak diketahui' };
    });
  }, [monitoring, lahanList]);

  const lokasiOptions = useMemo(() => {
    return ['Semua Lokasi', ...new Set(lahanList.map((l) => l.lokasi))];
  }, [lahanList]);

  const tahunOptions = useMemo(() => {
    const tahunSet = new Set(joined.map((m) => new Date(m.monitoring_date).getFullYear()));
    return ['Semua', ...Array.from(tahunSet).sort((a, b) => b - a)];
  }, [joined]);

  const filtered = useMemo(() => {
    return joined
      .filter((m) => {
        if (filterLokasi !== 'Semua Lokasi' && m.lokasi !== filterLokasi) return false;
        if (filterTahun !== 'Semua' && new Date(m.monitoring_date).getFullYear() !== parseInt(filterTahun)) return false;
        return true;
      })
      .sort((a, b) => new Date(a.monitoring_date) - new Date(b.monitoring_date));
  }, [joined, filterLokasi, filterTahun]);

  const lokasiUnik = useMemo(() => {
    return filterLokasi === 'Semua Lokasi'
      ? Array.from(new Set(filtered.map((m) => m.lokasi)))
      : [filterLokasi];
  }, [filtered, filterLokasi]);

  // Pivot data monitoring menjadi bentuk { period, [lokasi]: produksi } agar bisa digambar sebagai line chart
  const chartData = useMemo(() => {
    const periodeMap = new Map();

    filtered.forEach((m) => {
      const dateObj = new Date(m.monitoring_date);
      const period = dateObj.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
      const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;

      if (!periodeMap.has(key)) {
        periodeMap.set(key, { period, _sort: dateObj.getTime() });
      }
      const row = periodeMap.get(key);
      row[m.lokasi] = m.production;
    });

    return Array.from(periodeMap.values()).sort((a, b) => a._sort - b._sort);
  }, [filtered]);

  // Pivot data monitoring menjadi bentuk { period, [lokasi]: penghasilan } untuk grafik Perkembangan Penghasilan Panen
  const revenueChartData = useMemo(() => {
    const periodeMap = new Map();

    filtered.forEach((m) => {
      const dateObj = new Date(m.monitoring_date);
      const period = dateObj.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });
      const key = `${dateObj.getFullYear()}-${dateObj.getMonth()}`;

      if (!periodeMap.has(key)) {
        periodeMap.set(key, { period, _sort: dateObj.getTime() });
      }
      const row = periodeMap.get(key);
      row[m.lokasi] = m.revenue;
    });

    return Array.from(periodeMap.values()).sort((a, b) => a._sort - b._sort);
  }, [filtered]);

  const series = useMemo(() => {
    return lokasiUnik.map((lokasi, idx) => ({
      key: lokasi,
      name: lokasi,
      color: LOCATION_COLORS[idx % LOCATION_COLORS.length],
    }));
  }, [lokasiUnik]);

  // Visualisasi tambahan: total produksi per lokasi (hanya relevan saat menampilkan semua lokasi)
  const comparisonData = useMemo(() => {
    if (filterLokasi !== 'Semua Lokasi') return [];
    const totals = new Map();
    filtered.forEach((m) => {
      totals.set(m.lokasi, (totals.get(m.lokasi) || 0) + m.production);
    });
    return Array.from(totals.entries()).map(([lokasi, total], idx) => ({
      lokasi,
      total: Math.round(total * 100) / 100,
      color: LOCATION_COLORS[idx % LOCATION_COLORS.length],
    }));
  }, [filtered, filterLokasi]);

  const chartTitle = filterLokasi === 'Semua Lokasi'
    ? 'Perkembangan Produksi Rumput Laut'
    : `Perkembangan Produksi — ${filterLokasi}`;

  const revenueChartTitle = filterLokasi === 'Semua Lokasi'
    ? 'Perkembangan Penghasilan Panen'
    : `Perkembangan Penghasilan Panen — ${filterLokasi}`;

  const formatRupiahShort = (value) => `Rp${Number(value).toLocaleString('id-ID')}`;

  return (
    <PageContainer className="no-top-pad">
      <section className="page-hero-band" style={{ backgroundImage: `url(${underwater})` }}>
        <div className="hero-overlay" style={{ background: 'rgba(6,42,48,0.65)' }} />
        <div className="container">
          <span className="eyebrow">Monitoring, Reporting &amp; Verification</span>
          <h1 style={{ fontSize: 'clamp(34px, 4.5vw, 54px)', color: 'var(--white)', margin: '12px 0 12px' }}>
            MRV
          </h1>
          <p style={{ color: 'rgba(245,247,244,0.82)', maxWidth: 520, fontSize: 15 }}>
            Monitoring dan perkembangan produksi berdasarkan data yang tersedia.
          </p>
        </div>
      </section>

      <section className="page-section" style={{ background: 'var(--deep-navy)' }}>
        <div className="container">
          {loading ? (
            <LoadingState label="Memuat data monitoring..." />
          ) : filtered.length === 0 && monitoring.length === 0 ? (
            <EmptyState
              title="Data Monitoring Belum Tersedia"
              description="Grafik akan tampil setelah admin menambahkan data monitoring."
            />
          ) : (
            <div className="glass-panel mrv-chart-panel">
              <div className="mrv-filter-row">
                <select
                  className="mrv-filter-select"
                  value={filterLokasi}
                  onChange={(e) => setFilterLokasi(e.target.value)}
                >
                  {lokasiOptions.map((lokasi) => (
                    <option key={lokasi} value={lokasi}>{lokasi}</option>
                  ))}
                </select>

                <select
                  className="mrv-filter-select"
                  value={filterTahun}
                  onChange={(e) => setFilterTahun(e.target.value)}
                >
                  {tahunOptions.map((tahun) => (
                    <option key={tahun} value={tahun}>{tahun === 'Semua' ? 'Semua Tahun' : tahun}</option>
                  ))}
                </select>
              </div>

              <h2 className="mrv-chart-title">{chartTitle}</h2>
              <p className="mrv-chart-subtitle">Sumbu horizontal menunjukkan periode monitoring, sumbu vertikal menunjukkan produksi (kg).</p>

              {chartData.length === 0 ? (
                <EmptyState
                  title="Belum Ada Data untuk Filter Ini"
                  description="Coba ubah pilihan lokasi atau tahun."
                />
              ) : (
                <ProductionChart data={chartData} series={series} />
              )}
            </div>
          )}

          {!loading && revenueChartData.length > 0 && (
            <div className="glass-panel mrv-chart-panel" style={{ marginTop: 24 }}>
              <h2 className="mrv-chart-title">{revenueChartTitle}</h2>
              <p className="mrv-chart-subtitle">Sumbu horizontal menunjukkan periode monitoring, sumbu vertikal menunjukkan penghasilan panen (Rp).</p>
              <ProductionChart
                data={revenueChartData}
                series={series}
                unit=""
                valueLabel="Penghasilan Panen"
                formatValue={formatRupiahShort}
              />
            </div>
          )}

          {comparisonData.length > 1 && (
            <div className="glass-panel mrv-chart-panel" style={{ marginTop: 24 }}>
              <h2 className="mrv-chart-title">Perbandingan Produksi Berdasarkan Lokasi</h2>
              <p className="mrv-chart-subtitle">Total produksi kumulatif pada periode yang dipilih.</p>
              <LocationComparisonChart data={comparisonData} />
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
