const db = require('../config/database');

class Role {
  // Get all roles
  static async findAll() {
    const query = `
      SELECT uuid, nama, deskripsi, created_at, updated_at
      FROM roles
      ORDER BY id ASC
    `;
    
    const [rows] = await db.query(query);
    return rows;
  }

  // Get role by UUID
  static async findByUuid(uuid) {
    const query = `
      SELECT uuid, nama, deskripsi, created_at, updated_at
      FROM roles
      WHERE uuid = ?
    `;
    
    const [rows] = await db.query(query, [uuid]);
    return rows[0];
  }

  // Get role by name
  static async findByName(nama) {
    const query = `
      SELECT uuid, nama, deskripsi, created_at, updated_at
      FROM roles
      WHERE nama = ?
    `;
    
    const [rows] = await db.query(query, [nama]);
    return rows[0];
  }
}

module.exports = Role;
