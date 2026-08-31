import { useState, useEffect, useMemo } from 'react';
import { getAllLahan } from '../services/api';

export default function useLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllLahan();
        // Transform backend data to match location format
        const transformedData = data.map((lahan, index) => ({
          id: lahan.id,
          number: String(index + 1).padStart(2, '0'),
          name: lahan.lokasi,
          kelurahan: 'Kelurahan Lembang',
          kecamatan: 'Kecamatan Bantaeng',
          coordinates: [lahan.latitude, lahan.longitude],
          area: `${lahan.luas.toFixed(2).replace('.', ',')} ha`,
          areaValue: lahan.luas,
          farmers: 1, // Default value since backend doesn't have this
          cycle: lahan.siklusPanen ?? lahan.siklus ?? 0,
          status: lahan.status,
          photoVariant: 'default',
          description: lahan.deskripsi || '',
          pembudidaya: lahan.pembudidaya,
          harga: lahan.harga,
          foto: lahan.foto || lahan.gambar,
        }));
        setLocations(transformedData);
      } catch (error) {
        console.error('Error loading locations:', error);
        setLocations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const totalArea = useMemo(
    () => locations.reduce((sum, l) => sum + l.areaValue, 0),
    [locations]
  );
  
  const totalFarmers = useMemo(
    () => {
      // Count unique pembudidaya
      const uniqueFarmers = new Set(locations.map(l => l.pembudidaya));
      return uniqueFarmers.size;
    },
    [locations]
  );

  return {
    locations,
    loading,
    totalArea,
    totalFarmers,
    totalPoints: locations.length,
    totalCycles: locations.reduce((sum, l) => sum + l.cycle, 0),
  };
}
