const { promisePool } = require('../config/database');

class JurnalShalat {
  // Create or update jurnal shalat
  static async createOrUpdate(data) {
    const { santri_id, tanggal, subuh, dzuhur, ashar, maghrib, isya, keterangan, dicatat_oleh } = data;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      `INSERT INTO jurnal_shalat (uuid, santri_id, tanggal, subuh, dzuhur, ashar, maghrib, isya, keterangan, dicatat_oleh) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE 
       subuh = VALUES(subuh),
       dzuhur = VALUES(dzuhur),
       ashar = VALUES(ashar),
       maghrib = VALUES(maghrib),
       isya = VALUES(isya),
       keterangan = VALUES(keterangan),
       dicatat_oleh = VALUES(dicatat_oleh)`,
      [uuid, santri_id, tanggal, subuh, dzuhur, ashar, maghrib, isya, keterangan, dicatat_oleh]
    );
    
    return result.insertId || result.affectedRows;
  }

  // Get all jurnal shalat with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT js.*, 
             s.nama as santri_nama, s.nis as santri_nis,
             u.nama as dicatat_oleh_nama
      FROM jurnal_shalat js
      LEFT JOIN users s ON js.santri_id = s.id
      LEFT JOIN users u ON js.dicatat_oleh = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.santri_id) {
      query += ' AND js.santri_id = ?';
      params.push(filters.santri_id);
    }

    if (filters.tanggal) {
      query += ' AND js.tanggal = ?';
      params.push(filters.tanggal);
    }

    if (filters.tanggal_dari && filters.tanggal_sampai) {
      query += ' AND js.tanggal BETWEEN ? AND ?';
      params.push(filters.tanggal_dari, filters.tanggal_sampai);
    }

    query += ' ORDER BY js.tanggal DESC';

    const [rows] = await promisePool.query(query, params);
    return rows;
  }

  // Get by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT js.*, 
              s.nama as santri_nama, s.nis as santri_nis,
              u.nama as dicatat_oleh_nama
       FROM jurnal_shalat js
       LEFT JOIN users s ON js.santri_id = s.id
       LEFT JOIN users u ON js.dicatat_oleh = u.id
       WHERE js.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Get by santri and date
  static async findBySantriAndDate(santri_id, tanggal) {
    const [rows] = await promisePool.query(
      'SELECT * FROM jurnal_shalat WHERE santri_id = ? AND tanggal = ?',
      [santri_id, tanggal]
    );
    return rows[0];
  }

  // Update jurnal shalat
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
    const query = `UPDATE jurnal_shalat SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await promisePool.query(query, values);
    return result.affectedRows > 0;
  }

  // Get statistics for a santri
  static async getStatsBySantri(santri_id, tanggal_dari, tanggal_sampai) {
    const [stats] = await promisePool.query(
      `SELECT 
        COUNT(*) as total_hari,
        SUM(CASE WHEN subuh = 'hadir' THEN 1 ELSE 0 END) as subuh_hadir,
        SUM(CASE WHEN dzuhur = 'hadir' THEN 1 ELSE 0 END) as dzuhur_hadir,
        SUM(CASE WHEN ashar = 'hadir' THEN 1 ELSE 0 END) as ashar_hadir,
        SUM(CASE WHEN maghrib = 'hadir' THEN 1 ELSE 0 END) as maghrib_hadir,
        SUM(CASE WHEN isya = 'hadir' THEN 1 ELSE 0 END) as isya_hadir
       FROM jurnal_shalat 
       WHERE santri_id = ? AND tanggal BETWEEN ? AND ?`,
      [santri_id, tanggal_dari, tanggal_sampai]
    );
    return stats[0];
  }

  // Get daily report
  static async getDailyReport(tanggal) {
    const [rows] = await promisePool.query(
      `SELECT 
        s.id, s.nama, s.nis,
        COALESCE(js.subuh, 'tidak_hadir') as subuh,
        COALESCE(js.dzuhur, 'tidak_hadir') as dzuhur,
        COALESCE(js.ashar, 'tidak_hadir') as ashar,
        COALESCE(js.maghrib, 'tidak_hadir') as maghrib,
        COALESCE(js.isya, 'tidak_hadir') as isya
       FROM users s
       LEFT JOIN jurnal_shalat js ON s.id = js.santri_id AND js.tanggal = ?
       WHERE s.role = 'santri' AND s.status = 'aktif'
       ORDER BY s.nama`,
      [tanggal]
    );
    return rows;
  }
}

module.exports = JurnalShalat;
