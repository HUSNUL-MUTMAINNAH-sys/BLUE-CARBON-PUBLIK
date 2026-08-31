import { useCallback, useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import InteractiveMap from '../components/map/InteractiveMap';
import LocationPanel from '../components/map/LocationPanel';
import BudidayaList from '../components/map/BudidayaList';
import SectionHeader from '../components/common/SectionHeader';
import LoadingState from '../components/common/LoadingState';
import useMapLocation from '../hooks/useMapLocation';
import useAutoPlay from '../hooks/useAutoPlay';
import { getAllLahan } from '../services/api';
import PetaBackgroundDecor from '../components/map/PetaBackgroundDecor';
import './Peta.css';

export default function Peta() {
  const [lahanData, setLahanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLokasi, setFilterLokasi] = useState('Semua');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllLahan();
        const transformedData = data.map((lahan, index) => ({
          id: lahan.id,
          number: String(index + 1).padStart(2, '0'),
          name: lahan.lokasi,
          kelurahan: 'Kelurahan Lembang',
          kecamatan: 'Kecamatan Bantaeng',
          coordinates: [lahan.latitude, lahan.longitude],
          area: `${lahan.luas.toFixed(2)}`,
          areaValue: lahan.luas,
          farmers: lahan.pembudidaya,
          cycle: lahan.siklusPanen ?? lahan.siklus ?? 0,
          status: lahan.status,
          photoVariant: 'default',
          description: lahan.deskripsi,
          foto: lahan.foto || lahan.gambar,
        }));
        setLahanData(transformedData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const { locations, active, activeId, goTo, next, previous } = useMapLocation(lahanData);
  const [fullscreen, setFullscreen] = useState(false);

  // Get unique locations for filter
  const lokasiOptions = ['Semua', ...new Set(lahanData.map(l => l.name))];

  const handleTick = useCallback(() => {
    next();
  }, [next]);

  const { isPlaying, toggle, stop } = useAutoPlay(handleTick, 3500);

  const selectManual = useCallback(
    (id) => {
      stop();
      goTo(id);
    },
    [goTo, stop]
  );

  if (loading) {
    return (
      <PageContainer className="peta-ocean-bg">
        <PetaBackgroundDecor />
        <div style={{ paddingTop: 140, position: 'relative', zIndex: 1 }}>
          <LoadingState />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="peta-ocean-bg">
      <PetaBackgroundDecor />
      <section className="page-section">
        <div className="container">
          <SectionHeader
            eyebrow="Peta"
            title="Peta Potensi Budidaya"
            description="Kelurahan Lembang, Kecamatan Bantaeng - klik marker atau timeline untuk berpindah lokasi."
          />

          <div className="map-page__layout">
            <div className="map-page__map">
              <InteractiveMap
                locations={locations}
                activeId={activeId}
                onSelect={selectManual}
                fullscreen={fullscreen}
                onToggleFullscreen={() => setFullscreen((f) => !f)}
              />
            </div>
            <LocationPanel location={active} total={locations.length} />
          </div>

          {/* Search & Filter */}
          <div className="peta-search-section">
            <input
              type="text"
              placeholder="Cari nama pembudidaya atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="peta-search-input"
            />
            <select
              value={filterLokasi}
              onChange={(e) => setFilterLokasi(e.target.value)}
              className="peta-filter-select"
            >
              {lokasiOptions.map(lokasi => (
                <option key={lokasi} value={lokasi}>{lokasi}</option>
              ))}
            </select>
            <button className="peta-search-btn">
              Cari
            </button>
          </div>

          {/* Daftar Titik Budidaya */}
          <BudidayaList
            locations={locations}
            activeId={activeId}
            onSelect={selectManual}
            searchQuery={searchQuery}
            filterLokasi={filterLokasi}
          />
        </div>
      </section>
    </PageContainer>
  );
}
