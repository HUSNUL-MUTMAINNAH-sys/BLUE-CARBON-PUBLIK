import { useState } from 'react';
import './BudidayaList.css';

export default function BudidayaList({ 
  locations, 
  activeId, 
  onSelect,
  searchQuery = '',
  filterLokasi = 'Semua'
}) {
  // Filter berdasarkan search query dan lokasi
  const filteredLocations = locations.filter(loc => {
    const matchSearch = !searchQuery || 
      loc.farmers.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchLokasi = filterLokasi === 'Semua' || loc.name === filterLokasi;
    
    return matchSearch && matchLokasi;
  });

  if (filteredLocations.length === 0) {
    return (
      <div className="budidaya-list">
        <h3 className="budidaya-list__title">Daftar Titik Budidaya</h3>
        <div className="budidaya-list__empty">
          <p>Tidak ada data yang sesuai dengan pencarian Anda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="budidaya-list">
      <h3 className="budidaya-list__title">Daftar Titik Budidaya</h3>
      <div className="budidaya-list__items">
        {filteredLocations.map((loc) => (
          <button
            key={loc.id}
            className={`budidaya-list__item ${loc.id === activeId ? 'budidaya-list__item--active' : ''}`}
            onClick={() => onSelect(loc.id)}
          >
            <div className="budidaya-list__item-image">
              {loc.foto ? (
                <img 
                  src={loc.foto} 
                  alt={loc.farmers}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="budidaya-list__placeholder">
                  <span>Foto</span>
                </div>
              )}
            </div>

            <div className="budidaya-list__item-content">
              <div className="budidaya-list__item-header">
                <span className="budidaya-list__item-number">{loc.number}</span>
                <h4 className="budidaya-list__item-name">{loc.farmers}</h4>
              </div>
              
              <div className="budidaya-list__item-meta">
                <span className="budidaya-list__item-area">
                  {loc.area} ha
                </span>
                <span className="budidaya-list__item-separator">•</span>
                <span className="budidaya-list__item-cycle">
                  Siklus {loc.cycle}
                </span>
              </div>

              <div className="budidaya-list__item-location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21s-7-5.33-7-11a7 7 0 0 1 14 0c0 5.67-7 11-7 11Z"/>
                </svg>
                <span>{loc.name}</span>
              </div>

              <div className="budidaya-list__item-status">
                <span className={`budidaya-list__status-badge budidaya-list__status-${loc.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {loc.status}
                </span>
              </div>
            </div>

            <div className="budidaya-list__item-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
