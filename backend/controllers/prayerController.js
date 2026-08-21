const { validationResult } = require('express-validator');
const JurnalShalat = require('../models/PrayerJournal');
const { successResponse, errorResponse } = require('../utils/helpers');

const getAllJurnalShalat = async (req, res) => {
  try {
    const { santri_id, tanggal, tanggal_dari, tanggal_sampai } = req.query;

    const filters = {};
    
    // If user is santri, only show their records
    if (req.user.role === 'santri') {
      filters.santri_id = req.user.id;
    } else if (santri_id) {
      filters.santri_id = santri_id;
    }

    if (tanggal) filters.tanggal = tanggal;
    if (tanggal_dari && tanggal_sampai) {
      filters.tanggal_dari = tanggal_dari;
      filters.tanggal_sampai = tanggal_sampai;
    }

    const jurnalShalat = await JurnalShalat.getAll(filters);

    successResponse(res, jurnalShalat, 'Data jurnal shalat berhasil diambil');
  } catch (error) {
    console.error('Get all jurnal shalat error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data jurnal shalat');
  }
};


const getJurnalShalatById = async (req, res) => {
  try {
    const jurnalShalat = await JurnalShalat.findById(req.params.id);

    if (!jurnalShalat) {
      return errorResponse(res, 'Data jurnal shalat tidak ditemukan', 404);
    }

    // Check authorization
    if (req.user.role === 'santri' && jurnalShalat.santri_id !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    successResponse(res, jurnalShalat, 'Data jurnal shalat berhasil diambil');
  } catch (error) {
    console.error('Get jurnal shalat by ID error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil data jurnal shalat');
  }
};


const createOrUpdateJurnalShalat = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, 'Validasi gagal', 400, errors.array());
    }

    const { santri_id, tanggal, subuh, dzuhur, ashar, maghrib, isya, keterangan } = req.body;

    await JurnalShalat.createOrUpdate({
      santri_id,
      tanggal,
      subuh: subuh || 'tidak_hadir',
      dzuhur: dzuhur || 'tidak_hadir',
      ashar: ashar || 'tidak_hadir',
      maghrib: maghrib || 'tidak_hadir',
      isya: isya || 'tidak_hadir',
      keterangan,
      dicatat_oleh: req.user.id
    });

    const jurnalShalat = await JurnalShalat.findBySantriAndDate(santri_id, tanggal);

    successResponse(res, jurnalShalat, 'Data jurnal shalat berhasil disimpan', 201);
  } catch (error) {
    console.error('Create/Update jurnal shalat error:', error);
    errorResponse(res, 'Terjadi kesalahan saat menyimpan data jurnal shalat');
  }
};


const updateJurnalShalat = async (req, res) => {
  try {
    const jurnalShalat = await JurnalShalat.findById(req.params.id);

    if (!jurnalShalat) {
      return errorResponse(res, 'Data jurnal shalat tidak ditemukan', 404);
    }

    const { subuh, dzuhur, ashar, maghrib, isya, keterangan } = req.body;

    const updateData = { dicatat_oleh: req.user.id };
    if (subuh) updateData.subuh = subuh;
    if (dzuhur) updateData.dzuhur = dzuhur;
    if (ashar) updateData.ashar = ashar;
    if (maghrib) updateData.maghrib = maghrib;
    if (isya) updateData.isya = isya;
    if (keterangan !== undefined) updateData.keterangan = keterangan;

    await JurnalShalat.update(req.params.id, updateData);

    const updatedJurnalShalat = await JurnalShalat.findById(req.params.id);

    successResponse(res, updatedJurnalShalat, 'Data jurnal shalat berhasil diupdate');
  } catch (error) {
    console.error('Update jurnal shalat error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengupdate data jurnal shalat');
  }
};


const getJurnalShalatStats = async (req, res) => {
  try {
    const santri_id = req.params.santri_id;
    const { tanggal_dari, tanggal_sampai } = req.query;

    // Check authorization
    if (req.user.role === 'santri' && parseInt(santri_id) !== req.user.id) {
      return errorResponse(res, 'Anda tidak memiliki akses ke data ini', 403);
    }

    if (!tanggal_dari || !tanggal_sampai) {
      return errorResponse(res, 'Parameter tanggal_dari dan tanggal_sampai harus diisi', 400);
    }

    const stats = await JurnalShalat.getStatsBySantri(santri_id, tanggal_dari, tanggal_sampai);

    successResponse(res, stats, 'Statistik jurnal shalat berhasil diambil');
  } catch (error) {
    console.error('Get jurnal shalat stats error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil statistik jurnal shalat');
  }
};

const getDailyReport = async (req, res) => {
  try {
    const { tanggal } = req.query;

    if (!tanggal) {
      return errorResponse(res, 'Parameter tanggal harus diisi', 400);
    }

    const report = await JurnalShalat.getDailyReport(tanggal);

    successResponse(res, report, 'Laporan harian jurnal shalat berhasil diambil');
  } catch (error) {
    console.error('Get daily report error:', error);
    errorResponse(res, 'Terjadi kesalahan saat mengambil laporan harian');
  }
};

module.exports = {
  getAllJurnalShalat,
  getJurnalShalatById,
  createOrUpdateJurnalShalat,
  updateJurnalShalat,
  getJurnalShalatStats,
  getDailyReport
};
