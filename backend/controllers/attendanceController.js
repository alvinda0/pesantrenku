const { validationResult } = require('express-validator');
const Kehadiran = require('../models/Attendance');
const { successResponse, errorResponse } = require('../utils/helpers');


const getAllKehadiran = async (req, res) => {
  try {
    const { user_id, user_type, tanggal, tanggal_dari, tanggal_sampai, status } = req.query;

    const filters = {};
    
    // If user is santri, only show their records
    if (req.user.role === 'santri') {
      filters.user_id = req.user.id;
      filters.user_type = 'santri';
    } else {
      if (user_id) filters.user_id = user_id;
      if (user_type) filters.user_type = user_type;
    }

    if (tanggal) filters.tanggal = tanggal;
    if (tanggal_dari && tanggal_sampai) {
      filters.tanggal_dari = tanggal_dari;
      filters.tanggal_sampai = tanggal_sampai;
    }
    if (status) filters.status = status;

    const kehadiran = await Kehadiran.getAll(filters);

    successResponse(res, kehadiran, 'Data kehadiran berhasil diambil');
  } catch (error) {
    console.error('Get all kehadiran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data kehadiran');
  }
};


const getKehadiranById = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findById(req.params.id);

    if (!kehadiran) {
      return errorResponse(res, 'Data kehadiran tidak ditemukan', 404);
    }

    // Check authorization
    if (req.user.role === 'santri' && kehadiran.user_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    successResponse(res, kehadiran, 'Data kehadiran berhasil diambil');
  } catch (error) {
    console.error('Get kehadiran by ID error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data kehadiran');
  }
};

const createKehadiran = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { user_id, user_type, tanggal, waktu_masuk, waktu_keluar, status, keterangan } = req.body;

    // Check if already exists
    const existing = await Kehadiran.findByUserAndDate(user_id, tanggal);
    if (existing) {
      return errorResponse(res, 'Data kehadiran untuk tanggal ini sudah ada', 400);
    }

    const kehadiranId = await Kehadiran.create({
      user_id,
      user_type,
      tanggal,
      waktu_masuk,
      waktu_keluar,
      status,
      keterangan,
      dicatat_oleh: req.user.id
    });

    const kehadiran = await Kehadiran.findById(kehadiranId);

    successResponse(res, kehadiran, 'Data kehadiran berhasil ditambahkan', 201);
  } catch (error) {
    console.error('Create kehadiran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menambahkan data kehadiran');
  }
};

const updateKehadiran = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findById(req.params.id);

    if (!kehadiran) {
      return errorResponse(res, 'Data kehadiran tidak ditemukan', 404);
    }

    const { waktu_masuk, waktu_keluar, status, keterangan } = req.body;

    const updateData = {};
    if (waktu_masuk !== undefined) updateData.waktu_masuk = waktu_masuk;
    if (waktu_keluar !== undefined) updateData.waktu_keluar = waktu_keluar;
    if (status) updateData.status = status;
    if (keterangan !== undefined) updateData.keterangan = keterangan;

    await Kehadiran.update(req.params.id, updateData);

    const updatedKehadiran = await Kehadiran.findById(req.params.id);

    successResponse(res, updatedKehadiran, 'Data kehadiran berhasil diupdate');
  } catch (error) {
    console.error('Update kehadiran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengupdate data kehadiran');
  }
};

const deleteKehadiran = async (req, res) => {
  try {
    const kehadiran = await Kehadiran.findById(req.params.id);

    if (!kehadiran) {
      return errorResponse(res, 'Data kehadiran tidak ditemukan', 404);
    }

    await Kehadiran.delete(req.params.id);

    successResponse(res, null, 'Data kehadiran berhasil dihapus');
  } catch (error) {
    console.error('Delete kehadiran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menghapus data kehadiran');
  }
};

const getKehadiranStats = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const { tanggal_dari, tanggal_sampai } = req.query;

    // Check authorization
    if (req.user.role === 'santri' && parseInt(user_id) !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    if (!tanggal_dari || !tanggal_sampai) {
      return errorResponse(res, 'Parameter tanggal_dari dan tanggal_sampai harus diisi', 400);
    }

    const stats = await Kehadiran.getStatsByUser(user_id, tanggal_dari, tanggal_sampai);

    successResponse(res, stats, 'Statistik kehadiran berhasil diambil');
  } catch (error) {
    console.error('Get kehadiran stats error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil statistik kehadiran');
  }
};

const getDailyReport = async (req, res) => {
  try {
    const { tanggal, user_type } = req.query;

    if (!tanggal) {
      return errorResponse(res, 'Parameter tanggal harus diisi', 400);
    }

    const report = await Kehadiran.getDailyReport(tanggal, user_type || 'santri');

    successResponse(res, report, 'Laporan harian kehadiran berhasil diambil');
  } catch (error) {
    console.error('Get daily report error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil laporan harian');
  }
};

module.exports = {
  getAllKehadiran,
  getKehadiranById,
  createKehadiran,
  updateKehadiran,
  deleteKehadiran,
  getKehadiranStats,
  getDailyReport
};
