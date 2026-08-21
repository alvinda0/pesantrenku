const { promisePool } = require('../config/database');

class User {
  // Find user by email
  static async findByEmail(email) {
    const [rows] = await promisePool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  static async findById(id) {
    const [rows] = await promisePool.query(
      'SELECT id, uuid, nama, email, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Create new user
  static async create(userData) {
    const { nama, email, password, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp } = userData;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      'INSERT INTO users (uuid, nama, email, password, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [uuid, nama, email, password, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp]
    );
    
    return result.insertId;
  }

  // Get all users with filters
  static async getAll(filters = {}) {
    let query = 'SELECT id, uuid, nama, email, role, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp, foto_profile, status, created_at FROM users WHERE 1=1';
    const params = [];

    if (filters.role) {
      query += ' AND role = ?';
      params.push(filters.role);
    }

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (nama LIKE ? OR email LIKE ? OR nis LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await promisePool.query(query, params);
    return rows;
  }

  // Update user
  static async update(id, userData) {
    const fields = [];
    const values = [];

    Object.keys(userData).forEach(key => {
      if (userData[key] !== undefined && key !== 'id' && key !== 'password') {
        fields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    });

    if (fields.length === 0) return false;

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

    const [result] = await promisePool.query(query, values);
    return result.affectedRows > 0;
  }

  // Update password
  static async updatePassword(id, hashedPassword) {
    const [result] = await promisePool.query(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, id]
    );
    return result.affectedRows > 0;
  }

  // Delete user
  static async delete(id) {
    const [result] = await promisePool.query(
      'DELETE FROM users WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  // Get user statistics
  static async getStatistics() {
    const [stats] = await promisePool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN role = 'santri' THEN 1 ELSE 0 END) as total_santri,
        SUM(CASE WHEN role = 'pengajar' THEN 1 ELSE 0 END) as total_pengajar,
        SUM(CASE WHEN status = 'aktif' THEN 1 ELSE 0 END) as total_aktif
      FROM users
    `);
    return stats[0];
  }
}

module.exports = User;
