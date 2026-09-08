// API Service untuk Web Publik — akses langsung ke Supabase (read-only).
// Tidak ada login di sini; akses ditulis lewat anon key dan dibatasi oleh
// Row Level Security (RLS) di Supabase (hanya boleh SELECT, tidak boleh
// INSERT/UPDATE/DELETE).
import { supabase } from '../lib/supabaseClient';

function handle(result, fallbackMessage) {
  const { data, error } = result;
  if (error) {
    throw new Error(error.message || fallbackMessage);
  }
  return data;
}

// GET semua lahan
export async function getAllLahan() {
  try {
    const result = await supabase.from('lahan').select('*').order('id', { ascending: true });
    return handle(result, 'Gagal mengambil data');
  } catch (error) {
    console.error('Error fetching lahan:', error);
    throw error;
  }
}

// GET detail lahan berdasarkan ID
export async function getLahanById(id) {
  try {
    const result = await supabase.from('lahan').select('*').eq('id', id).single();
    return handle(result, 'Lahan tidak ditemukan');
  } catch (error) {
    console.error('Error fetching lahan detail:', error);
    throw error;
  }
}

// GET berita yang sudah Publish (untuk section Berita Terbaru di halaman utama)
export async function getPublishedBerita() {
  try {
    const result = await supabase
      .from('berita')
      .select('*')
      .eq('status', 'Publish')
      .order('tanggal', { ascending: false });
    return handle(result, 'Gagal mengambil data berita');
  } catch (error) {
    console.error('Error fetching published berita:', error);
    throw error;
  }
}

// GET detail berita berdasarkan ID (hanya yang sudah Publish)
export async function getBeritaById(id) {
  try {
    const result = await supabase
      .from('berita')
      .select('*')
      .eq('id', id)
      .eq('status', 'Publish')
      .single();
    return handle(result, 'Berita tidak ditemukan');
  } catch (error) {
    console.error('Error fetching berita detail:', error);
    throw error;
  }
}

// GET semua data monitoring MRV (opsional filter berdasarkan land_id)
export async function getAllMonitoring(landId) {
  try {
    let query = supabase.from('monitoring').select('*').order('monitoring_date', { ascending: false });
    if (landId) query = query.eq('land_id', landId);
    const result = await query;
    return handle(result, 'Gagal mengambil data monitoring');
  } catch (error) {
    console.error('Error fetching monitoring:', error);
    throw error;
  }
}

// Helper untuk format harga ke Rupiah
export function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka);
}
