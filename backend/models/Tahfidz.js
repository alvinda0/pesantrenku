const { promisePool } = require('../config/database');

class Tahfidz {
  // Create new tahfidz record
  static async create(data) {
    const { santri_id, pengajar_id, jenis, surah, juz, halaman, ayat_dari, ayat_sampai, tanggal, waktu, nilai, keterangan } = data;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      `INSERT INTO tahfidz (uuid, santri_id, pengajar_id, jenis, surah, juz, halaman, ayat_dari, ayat_sampai, tanggal, waktu, nilai, keterangan) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuid, santri_id, pengajar_id, jenis, surah, juz, halaman, ayat_dari, ayat_sampai, tanggal, waktu, nilai, keterangan]
    );
    
    return result.insertId;
  }

  // Get all tahfidz records with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT t.*, 
             s.nama as santri_nama, s.nis as santri_nis,
             u.nama as pengajar_nama
      FROM tahfidz t
      LEFT JOIN users s ON t.santri_id = s.id
      LEFT JOIN users u ON t.pengajar_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.santri_id) {
      query += ' AND t.santri_id = ?';
      params.push(filters.santri_id);
    }

    if (filters.pengajar_id) {
      query += ' AND t.pengajar_id = ?';
      params.push(filters.pengajar_id);
    }

    if (filters.jenis) {
      query += ' AND t.jenis = ?';
      params.push(filters.jenis);
    }

    if (filters.tanggal_dari && filters.tanggal_sampai) {
      query += ' AND t.tanggal BETWEEN ? AND ?';
      params.push(filters.tanggal_dari, filters.tanggal_sampai);
    }

    query += ' ORDER BY t.tanggal DESC, t.waktu DESC';

    const [rows] = await promisePool.query(query, params);
    return rows;
  }

  // Get by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT t.*, 
              s.nama as santri_nama, s.nis as santri_nis,
              u.nama as pengajar_nama
       FROM tahfidz t
       LEFT JOIN users s ON t.santri_id = s.id
       LEFT JOIN users u ON t.pengajar_id = u.id
       WHERE t.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Update tahfidz record
  static async update(id, data) {
    const fields = [];
    const values = [];

    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE tahfidz SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await promisePool.query(query, values);
    return result.affectedRows > 0;
  }

  // Delete tahfidz record
  static async delete(id) {
    const [result] = await promisePool.query('DELETE FROM tahfidz WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Get statistics for a santri
  static async getStatsBySantri(santri_id) {
    const [stats] = await promisePool.query(
      `SELECT 
        COUNT(*) as total_setoran,
        SUM(CASE WHEN jenis = 'setoran_baru' THEN 1 ELSE 0 END) as setoran_baru,
        SUM(CASE WHEN jenis = 'muraja_ah' THEN 1 ELSE 0 END) as muraja_ah,
        SUM(CASE WHEN nilai = 'A' THEN 1 ELSE 0 END) as nilai_a,
        SUM(CASE WHEN nilai = 'B' THEN 1 ELSE 0 END) as nilai_b
       FROM tahfidz 
       WHERE santri_id = ?`,
      [santri_id]
    );
    return stats[0];
  }
}

module.exports = Tahfidz;
