const { promisePool } = require('../config/database');

class Kehadiran {
  // Create new kehadiran record
  static async create(data) {
    const { user_id, user_type, tanggal, waktu_masuk, waktu_keluar, status, keterangan, dicatat_oleh } = data;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      `INSERT INTO kehadiran (uuid, user_id, user_type, tanggal, waktu_masuk, waktu_keluar, status, keterangan, dicatat_oleh) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuid, user_id, user_type, tanggal, waktu_masuk, waktu_keluar, status, keterangan, dicatat_oleh]
    );
    
    return result.insertId;
  }

  // Get all kehadiran with filters
  static async getAll(filters = {}) {
    let query = `
      SELECT k.*, 
             u.nama as user_nama, u.nis, u.role,
             p.nama as dicatat_oleh_nama
      FROM kehadiran k
      LEFT JOIN users u ON k.user_id = u.id
      LEFT JOIN users p ON k.dicatat_oleh = p.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.user_id) {
      query += ' AND k.user_id = ?';
      params.push(filters.user_id);
    }

    if (filters.user_type) {
      query += ' AND k.user_type = ?';
      params.push(filters.user_type);
    }

    if (filters.tanggal) {
      query += ' AND k.tanggal = ?';
      params.push(filters.tanggal);
    }

    if (filters.tanggal_dari && filters.tanggal_sampai) {
      query += ' AND k.tanggal BETWEEN ? AND ?';
      params.push(filters.tanggal_dari, filters.tanggal_sampai);
    }

    if (filters.status) {
      query += ' AND k.status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY k.tanggal DESC, k.waktu_masuk DESC';

    const [rows] = await promisePool.query(query, params);
    return rows;
  }

  // Get by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT k.*, 
              u.nama as user_nama, u.nis, u.role,
              p.nama as dicatat_oleh_nama
       FROM kehadiran k
       LEFT JOIN users u ON k.user_id = u.id
       LEFT JOIN users p ON k.dicatat_oleh = p.id
       WHERE k.id = ?`,
      [id]
    );
    return rows[0];
  }

  // Check if already exists
  static async findByUserAndDate(user_id, tanggal) {
    const [rows] = await promisePool.query(
      'SELECT * FROM kehadiran WHERE user_id = ? AND tanggal = ?',
      [user_id, tanggal]
    );
    return rows[0];
  }

  // Update kehadiran record
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
    const query = `UPDATE kehadiran SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await promisePool.query(query, values);
    return result.affectedRows > 0;
  }

  // Delete kehadiran record
  static async delete(id) {
    const [result] = await promisePool.query('DELETE FROM kehadiran WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Get statistics
  static async getStatsByUser(user_id, tanggal_dari, tanggal_sampai) {
    const [stats] = await promisePool.query(
      `SELECT 
        COUNT(*) as total_hari,
        SUM(CASE WHEN status = 'hadir' THEN 1 ELSE 0 END) as hadir,
        SUM(CASE WHEN status = 'izin' THEN 1 ELSE 0 END) as izin,
        SUM(CASE WHEN status = 'sakit' THEN 1 ELSE 0 END) as sakit,
        SUM(CASE WHEN status = 'alpha' THEN 1 ELSE 0 END) as alpha
       FROM kehadiran 
       WHERE user_id = ? AND tanggal BETWEEN ? AND ?`,
      [user_id, tanggal_dari, tanggal_sampai]
    );
    return stats[0];
  }

  // Get daily report
  static async getDailyReport(tanggal, user_type = 'santri') {
    const [rows] = await promisePool.query(
      `SELECT 
        u.id, u.nama, u.nis, u.role,
        COALESCE(k.status, 'alpha') as status,
        k.waktu_masuk, k.waktu_keluar, k.keterangan
       FROM users u
       LEFT JOIN kehadiran k ON u.id = k.user_id AND k.tanggal = ?
       WHERE u.role = ? AND u.status = 'aktif'
       ORDER BY u.nama`,
      [tanggal, user_type]
    );
    return rows;
  }
}

module.exports = Kehadiran;
