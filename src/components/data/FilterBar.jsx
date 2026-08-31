import Button from '../common/Button';
import './data.css';

export default function FilterBar({ search, setSearch, statusFilter, setStatusFilter, statusOptions, onExport }) {
  return (
    <div className="filter-bar glass-panel">
      <div className="filter-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Cari pembudidaya, lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Cari data"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="filter-select"
        aria-label="Filter status"
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>{opt === 'Semua' ? 'Semua Status' : opt}</option>
        ))}
      </select>

      <Button variant="primary" size="sm" onClick={onExport}>Export CSV</Button>
    </div>
  );
}
