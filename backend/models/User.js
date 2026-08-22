const { promisePool } = require('../config/database');

class User {
  // Find user by email (with role name)
  static async findByEmail(email) {
    const [rows] = await promisePool.query(
      `SELECT u.*, r.nama as role, r.nama as role_nama 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.email = ?`,
      [email]
    );
    return rows[0];
  }

  // Find user by ID (with role name)
  static async findById(id) {
    const [rows] = await promisePool.query(
      `SELECT u.id, u.uuid, u.nama, u.email, u.role_id, r.nama as role, 
              u.nis, u.tempat_lahir, u.tanggal_lahir, u.jenis_kelamin, 
              u.alamat, u.no_telp, u.foto_profile, u.status, u.created_at 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.id = ?`,
      [id]
    );
    return rows[0];
  }
  
  // Find user by UUID (with role name)
  static async findByUuid(uuid) {
    const [rows] = await promisePool.query(
      `SELECT u.id, u.uuid, u.nama, u.email, u.role_id, r.nama as role, 
              u.nis, u.tempat_lahir, u.tanggal_lahir, u.jenis_kelamin, 
              u.alamat, u.no_telp, u.foto_profile, u.status, u.created_at 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.uuid = ?`,
      [uuid]
    );
    return rows[0];
  }

  // Create new user
  static async create(userData) {
    const { nama, email, password, role_id, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp } = userData;
    
    // Generate UUID
    const { v4: uuidv4 } = require('uuid');
    const uuid = uuidv4();
    
    const [result] = await promisePool.query(
      'INSERT INTO users (uuid, nama, email, password, role_id, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [uuid, nama, email, password, role_id, nis, tempat_lahir, tanggal_lahir, jenis_kelamin, alamat, no_telp]
    );
    
    return result.insertId;
  }
  
  // Get role ID by role name
  static async getRoleIdByName(roleName) {
    const [rows] = await promisePool.query(
      'SELECT id FROM roles WHERE nama = ?',
      [roleName]
    );
    return rows[0]?.id;
  }

  // Get all users with filters and pagination
  static async getAll(filters = {}) {
    let query = `SELECT u.id, u.uuid, u.nama, u.email, u.role_id, r.nama as role, 
                        u.nis, u.tempat_lahir, u.tanggal_lahir, u.jenis_kelamin, 
                        u.alamat, u.no_telp, u.foto_profile, u.status, u.created_at 
                 FROM users u 
                 LEFT JOIN roles r ON u.role_id = r.id 
                 WHERE 1=1`;
    const params = [];

    if (filters.role_name) {
      query += ' AND r.nama = ?';
      params.push(filters.role_name);
    }

    if (filters.status) {
      query += ' AND u.status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (u.nama LIKE ? OR u.email LIKE ? OR u.nis LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    // Exclude specific users if needed
    if (filters.exclude_user_id) {
      query += ' AND u.id != ?';
      params.push(filters.exclude_user_id);
    }

    query += ' ORDER BY u.created_at DESC';

    // Add pagination if provided
    if (filters.limit && filters.offset !== undefined) {
      query += ' LIMIT ? OFFSET ?';
      params.push(filters.limit, filters.offset);
    }

    const [rows] = await promisePool.query(query, params);
    return rows;
  }
  
  // Get total count for pagination
  static async getCount(filters = {}) {
    let query = `SELECT COUNT(*) as total
                 FROM users u 
                 LEFT JOIN roles r ON u.role_id = r.id 
                 WHERE 1=1`;
    const params = [];

    if (filters.role_name) {
      query += ' AND r.nama = ?';
      params.push(filters.role_name);
    }

    if (filters.status) {
      query += ' AND u.status = ?';
      params.push(filters.status);
    }

    if (filters.search) {
      query += ' AND (u.nama LIKE ? OR u.email LIKE ? OR u.nis LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }
    
    if (filters.exclude_user_id) {
      query += ' AND u.id != ?';
      params.push(filters.exclude_user_id);
    }

    const [rows] = await promisePool.query(query, params);
    return rows[0].total;
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
        SUM(CASE WHEN r.nama = 'santri' THEN 1 ELSE 0 END) as total_santri,
        SUM(CASE WHEN r.nama = 'pengajar' THEN 1 ELSE 0 END) as total_pengajar,
        SUM(CASE WHEN u.status = 'aktif' THEN 1 ELSE 0 END) as total_aktif
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
    `);
    return stats[0];
  }
}

module.exports = User;
