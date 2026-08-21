const { validationResult } = require('express-validator');
const Tahfidz = require('../models/Tahfidz');
const { successResponse, errorResponse } = require('../utils/helpers');

// @desc    Get all tahfidz records
// @route   GET /api/tahfidz
// @access  Private
const getAllTahfidz = async (req, res) => {
  try {
    const { santri_id, ustadz_id, jenis, tanggal_dari, tanggal_sampai } = req.query;

    const filters = {};
    
    // If user is santri, only show their records
    if (req.user.role === 'santri') {
      filters.santri_id = req.user.id;
    } else if (santri_id) {
      filters.santri_id = santri_id;
    }

    if (ustadz_id) filters.ustadz_id = ustadz_id;
    if (jenis) filters.jenis = jenis;
    if (tanggal_dari && tanggal_sampai) {
      filters.tanggal_dari = tanggal_dari;
      filters.tanggal_sampai = tanggal_sampai;
    }

    const tahfidz = await Tahfidz.getAll(filters);

    successResponse(res, tahfidz, 'Data tahfidz berhasil diambil');
  } catch (error) {
    console.error('Get all tahfidz error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data tahfidz');
  }
};

// @desc    Get tahfidz by ID
// @route   GET /api/tahfidz/:id
// @access  Private
const getTahfidzById = async (req, res) => {
  try {
    const tahfidz = await Tahfidz.findById(req.params.id);

    if (!tahfidz) {
      return errorResponse(res, 'Data tahfidz tidak ditemukan', 404);
    }

    // Check authorization
    if (req.user.role === 'santri' && tahfidz.santri_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    successResponse(res, tahfidz, 'Data tahfidz berhasil diambil');
  } catch (error) {
    console.error('Get tahfidz by ID error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data tahfidz');
  }
};

// @desc    Create new tahfidz record
// @route   POST /api/tahfidz
// @access  Private (Ustadz only)
const createTahfidz = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { santri_id, jenis, surah, juz, halaman, ayat_dari, ayat_sampai, tanggal, waktu, nilai, keterangan } = req.body;

    const tahfidzId = await Tahfidz.create({
      santri_id,
      pengajar_id: req.user.id,
      jenis,
      surah,
      juz,
      halaman,
      ayat_dari,
      ayat_sampai,
      tanggal,
      waktu,
      nilai,
      keterangan
    });

    const tahfidz = await Tahfidz.findById(tahfidzId);

    successResponse(res, tahfidz, 'Data tahfidz berhasil ditambahkan', 201);
  } catch (error) {
    console.error('Create tahfidz error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menambahkan data tahfidz');
  }
};

// @desc    Update tahfidz record
// @route   PUT /api/tahfidz/:id
// @access  Private (Ustadz only)
const updateTahfidz = async (req, res) => {
  try {
    const tahfidz = await Tahfidz.findById(req.params.id);

    if (!tahfidz) {
      return errorResponse(res, 'Data tahfidz tidak ditemukan', 404);
    }

    // Only the pengajar who created it can update
    if (tahfidz.pengajar_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses untuk mengubah data ini', 403);
    }

    const { jenis, surah, juz, halaman, ayat_dari, ayat_sampai, tanggal, waktu, nilai, keterangan } = req.body;

    const updateData = {};
    if (jenis) updateData.jenis = jenis;
    if (surah) updateData.surah = surah;
    if (juz !== undefined) updateData.juz = juz;
    if (halaman !== undefined) updateData.halaman = halaman;
    if (ayat_dari !== undefined) updateData.ayat_dari = ayat_dari;
    if (ayat_sampai !== undefined) updateData.ayat_sampai = ayat_sampai;
    if (tanggal) updateData.tanggal = tanggal;
    if (waktu) updateData.waktu = waktu;
    if (nilai) updateData.nilai = nilai;
    if (keterangan !== undefined) updateData.keterangan = keterangan;

    await Tahfidz.update(req.params.id, updateData);

    const updatedTahfidz = await Tahfidz.findById(req.params.id);

    successResponse(res, updatedTahfidz, 'Data tahfidz berhasil diupdate');
  } catch (error) {
    console.error('Update tahfidz error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengupdate data tahfidz');
  }
};

// @desc    Delete tahfidz record
// @route   DELETE /api/tahfidz/:id
// @access  Private (Ustadz only)
const deleteTahfidz = async (req, res) => {
  try {
    const tahfidz = await Tahfidz.findById(req.params.id);

    if (!tahfidz) {
      return errorResponse(res, 'Data tahfidz tidak ditemukan', 404);
    }

    // Only the pengajar who created it can delete
    if (tahfidz.pengajar_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses untuk menghapus data ini', 403);
    }

    await Tahfidz.delete(req.params.id);

    successResponse(res, null, 'Data tahfidz berhasil dihapus');
  } catch (error) {
    console.error('Delete tahfidz error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menghapus data tahfidz');
  }
};

// @desc    Get tahfidz statistics for a santri
// @route   GET /api/tahfidz/stats/:santri_id
// @access  Private
const getTahfidzStats = async (req, res) => {
  try {
    const santri_id = req.params.santri_id;

    // Check authorization
    if (req.user.role === 'santri' && parseInt(santri_id) !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    const stats = await Tahfidz.getStatsBySantri(santri_id);

    successResponse(res, stats, 'Statistik tahfidz berhasil diambil');
  } catch (error) {
    console.error('Get tahfidz stats error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil statistik tahfidz');
  }
};

module.exports = {
  getAllTahfidz,
  getTahfidzById,
  createTahfidz,
  updateTahfidz,
  deleteTahfidz,
  getTahfidzStats
};
