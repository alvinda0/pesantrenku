const { validationResult } = require('express-validator');
const Pelanggaran = require('../models/Violation');
const { successResponse, errorResponse } = require('../utils/helpers');


const getAllPelanggaran = async (req, res) => {
  try {
    const { santri_id, jenis_pelanggaran_id, status, tingkat, tanggal_dari, tanggal_sampai } = req.query;

    const filters = {};
    
    // If user is santri, only show their records
    if (req.user.role === 'santri') {
      filters.santri_id = req.user.id;
    } else if (santri_id) {
      filters.santri_id = santri_id;
    }

    if (jenis_pelanggaran_id) filters.jenis_pelanggaran_id = jenis_pelanggaran_id;
    if (status) filters.status = status;
    if (tingkat) filters.tingkat = tingkat;
    if (tanggal_dari && tanggal_sampai) {
      filters.tanggal_dari = tanggal_dari;
      filters.tanggal_sampai = tanggal_sampai;
    }

    const pelanggaran = await Pelanggaran.getAll(filters);

    successResponse(res, pelanggaran, 'Data pelanggaran berhasil diambil');
  } catch (error) {
    console.error('Get all pelanggaran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data pelanggaran');
  }
};

const getPelanggaranById = async (req, res) => {
  try {
    const pelanggaran = await Pelanggaran.findById(req.params.id);

    if (!pelanggaran) {
      return errorResponse(res, 'Data pelanggaran tidak ditemukan', 404);
    }

    // Check authorization
    if (req.user.role === 'santri' && pelanggaran.santri_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    successResponse(res, pelanggaran, 'Data pelanggaran berhasil diambil');
  } catch (error) {
    console.error('Get pelanggaran by ID error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data pelanggaran');
  }
};

const createPelanggaran = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { santri_id, jenis_pelanggaran_id, tanggal, waktu, lokasi, kronologi, sanksi } = req.body;

    const pelanggaranId = await Pelanggaran.create({
      santri_id,
      jenis_pelanggaran_id,
      tanggal,
      waktu,
      lokasi,
      kronologi,
      sanksi,
      dicatat_oleh: req.user.id
    });

    const pelanggaran = await Pelanggaran.findById(pelanggaranId);

    successResponse(res, pelanggaran, 'Data pelanggaran berhasil ditambahkan', 201);
  } catch (error) {
    console.error('Create pelanggaran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menambahkan data pelanggaran');
  }
};

const updatePelanggaran = async (req, res) => {
  try {
    const pelanggaran = await Pelanggaran.findById(req.params.id);

    if (!pelanggaran) {
      return errorResponse(res, 'Data pelanggaran tidak ditemukan', 404);
    }

    const { jenis_pelanggaran_id, tanggal, waktu, lokasi, kronologi, sanksi, status } = req.body;

    const updateData = {};
    if (jenis_pelanggaran_id) updateData.jenis_pelanggaran_id = jenis_pelanggaran_id;
    if (tanggal) updateData.tanggal = tanggal;
    if (waktu) updateData.waktu = waktu;
    if (lokasi !== undefined) updateData.lokasi = lokasi;
    if (kronologi) updateData.kronologi = kronologi;
    if (sanksi !== undefined) updateData.sanksi = sanksi;
    if (status) updateData.status = status;

    await Pelanggaran.update(req.params.id, updateData);

    const updatedPelanggaran = await Pelanggaran.findById(req.params.id);

    successResponse(res, updatedPelanggaran, 'Data pelanggaran berhasil diupdate');
  } catch (error) {
    console.error('Update pelanggaran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengupdate data pelanggaran');
  }
};

const deletePelanggaran = async (req, res) => {
  try {
    const pelanggaran = await Pelanggaran.findById(req.params.id);

    if (!pelanggaran) {
      return errorResponse(res, 'Data pelanggaran tidak ditemukan', 404);
    }

    await Pelanggaran.delete(req.params.id);

    successResponse(res, null, 'Data pelanggaran berhasil dihapus');
  } catch (error) {
    console.error('Delete pelanggaran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menghapus data pelanggaran');
  }
};

const getPelanggaranStats = async (req, res) => {
  try {
    const santri_id = req.params.santri_id;

    // Check authorization
    if (req.user.role === 'santri' && parseInt(santri_id) !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    const stats = await Pelanggaran.getStatsBySantri(santri_id);

    successResponse(res, stats, 'Statistik pelanggaran berhasil diambil');
  } catch (error) {
    console.error('Get pelanggaran stats error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil statistik pelanggaran');
  }
};

const getAllJenisPelanggaran = async (req, res) => {
  try {
    const jenisPelanggaran = await Pelanggaran.getAllJenisPelanggaran();

    successResponse(res, jenisPelanggaran, 'Data jenis pelanggaran berhasil diambil');
  } catch (error) {
    console.error('Get all jenis pelanggaran error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data jenis pelanggaran');
  }
};

module.exports = {
  getAllPelanggaran,
  getPelanggaranById,
  createPelanggaran,
  updatePelanggaran,
  deletePelanggaran,
  getPelanggaranStats,
  getAllJenisPelanggaran
};
