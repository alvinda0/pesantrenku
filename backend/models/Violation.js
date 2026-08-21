const { promisePool } = require('../config/database');

class Pelanggaran {
  // Create new pelanggaran record
  static async create(data) {
    const { santri_id, jenis_pelanggaran_id, tanggal, waktu, lokasi, kronologi, sanksi, dicatat_oleh } = data;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      `INSERT INTO pelanggaran (uuid, santri_id, jenis_pelanggaran_id, tanggal, waktu, lokasi, kronologi, sanksi, dicatat_oleh) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuid, santri_id, jenis_pelanggaran_id, tanggal, waktu, lokasi, kronologi, sanksi, dicatat_oleh]
    );
    
    return result.insertId;
  }

  // Get all pelanggaran with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT p.*, 
             s.nama as santri_nama, s.nis as santri_nis,
             jp.nama as jenis_pelanggaran, jp.tingkat, jp.poin,
             u.nama as dicatat_oleh_nama
      FROM pelanggaran p
      LEFT JOIN users s ON p.santri_id = s.id
      LEFT JOIN jenis_pelanggaran jp ON p.jenis_pelanggaran_id = jp.id
      LEFT JOIN users u ON p.dicatat_oleh = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.santri_id) {
      query += ' AND p.santri_id = ?';
      params.push(filters.santri_id);
    }

    if (filters.jenis_pelanggaran_id) {
      query += ' AND p.jenis_pelanggaran_id = ?';
      params.push(filters.jenis_pelanggaran_id);
    }

    if (filters.status) {
      query += ' AND p.status = ?';
      params.push(filters.status);
    }

    if (filters.tingkat) {
      query += ' AND jp.tingkat = ?';
      params.push(filters.tingkat);
    }

    if (filters.tanggal_dari && filters.tanggal_sampai) {
      query += ' AND p.tanggal BETWEEN ? AND ?';
      params.push(filters.tanggal_dari, filters.tanggal_sampai);
    }

    query += ' ORDER BY p.tanggal DESC, p.waktu DESC';

    const [rows] = await promisePool.query(query, params);
    return rows;
  }

  // Get by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT p.*, 
              s.nama as santri_nama, s.nis as santri_nis,
              jp.nama as jenis_pelanggaran, jp.tingkat, jp.poin, jp.deskripsi,
              u.nama as dicatat_oleh_nama
       FROM pelanggaran p
       LEFT JOIN users s ON p.santri_id = s.id
       LEFT JOIN jenis_pelanggaran jp ON p.jenis_pelanggaran_id = jp.id
       LEFT JOIN users u ON p.dicatat_oleh = u.id
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Update pelanggaran record
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
    const query = `UPDATE pelanggaran SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await promisePool.query(query, values);
    return result.affectedRows > 0;
  }

  // Delete pelanggaran record
  static async delete(id) {
    const [result] = await promisePool.query('DELETE FROM pelanggaran WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Get statistics by santri
  static async getStatsBySantri(santri_id) {
    const [stats] = await promisePool.query(
      `SELECT 
        COUNT(*) as total_pelanggaran,
        SUM(jp.poin) as total_poin,
        SUM(CASE WHEN jp.tingkat = 'ringan' THEN 1 ELSE 0 END) as pelanggaran_ringan,
        SUM(CASE WHEN jp.tingkat = 'sedang' THEN 1 ELSE 0 END) as pelanggaran_sedang,
        SUM(CASE WHEN jp.tingkat = 'berat' THEN 1 ELSE 0 END) as pelanggaran_berat
       FROM pelanggaran p
       LEFT JOIN jenis_pelanggaran jp ON p.jenis_pelanggaran_id = jp.id
       WHERE p.santri_id = ?`,
      [santri_id]
    );
    return stats[0];
  }

  // Get all jenis pelanggaran
  static async getAllJenisPelanggaran() {
    const [rows] = await promisePool.query(
      'SELECT * FROM jenis_pelanggaran ORDER BY tingkat, nama'
    );
    return rows;
  }

  // Get jenis pelanggaran by ID
  static async getJenisPelanggaranById(id) {
    const [rows] = await promisePool.query(
      'SELECT * FROM jenis_pelanggaran WHERE id = ?',
      [id]
    );
    return rows[0];
  }
}

module.exports = Pelanggaran;
