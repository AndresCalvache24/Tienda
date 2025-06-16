import { pool } from '../config/database';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserModel {
  static async findAll(): Promise<User[]> {
    try {
      const result = await pool.request().query('SELECT id, username, email, role, createdAt, updatedAt FROM Users');
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id: number): Promise<User | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .query('SELECT id, username, email, role, createdAt, updatedAt FROM Users WHERE id = @id');
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await pool
        .request()
        .input('email', email)
        .query('SELECT * FROM Users WHERE email = @email');
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async create(user: User): Promise<User> {
    try {
      const result = await pool
        .request()
        .input('username', user.username)
        .input('email', user.email)
        .input('password', user.password)
        .input('role', user.role || 'user')
        .query(`
          INSERT INTO Users (username, email, password, role, createdAt, updatedAt)
          OUTPUT INSERTED.*
          VALUES (@username, @email, @password, @role, GETDATE(), GETDATE())
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id: number, user: Partial<User>): Promise<User | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .input('username', user.username)
        .input('email', user.email)
        .input('role', user.role)
        .query(`
          UPDATE Users
          SET username = @username,
              email = @email,
              role = @role,
              updatedAt = GETDATE()
          OUTPUT INSERTED.*
          WHERE id = @id
        `);
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id: number): Promise<boolean> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .query('DELETE FROM Users WHERE id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
} 