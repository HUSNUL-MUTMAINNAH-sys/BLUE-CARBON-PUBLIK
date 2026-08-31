import { useState, useMemo } from 'react';

export default function useFilters(data, { searchKeys = [], filterKey = 'status' } = {}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const statusOptions = useMemo(() => {
    const set = new Set(data.map((d) => d[filterKey]));
    return ['Semua', ...Array.from(set)];
  }, [data, filterKey]);

  const filtered = useMemo(() => {
    let result = [...data];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((item) =>
        searchKeys.some((key) => String(item[key]).toLowerCase().includes(q))
      );
    }

    if (statusFilter !== 'Semua') {
      result = result.filter((item) => item[filterKey] === statusFilter);
    }

    if (sortConfig.key) {
      result.sort((a, b) => {
        const av = a[sortConfig.key];
        const bv = b[sortConfig.key];
        if (typeof av === 'number' && typeof bv === 'number') {
          return sortConfig.direction === 'asc' ? av - bv : bv - av;
        }
        return sortConfig.direction === 'asc'
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }

    return result;
  }, [data, search, statusFilter, sortConfig, searchKeys, filterKey]);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusOptions,
    sortConfig,
    toggleSort,
    filtered,
  };
}
