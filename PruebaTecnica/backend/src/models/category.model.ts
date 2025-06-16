import { pool } from '../config/database';

export interface Category {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    try {
      const result = await pool.request().query('SELECT * FROM Categories');
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id: number): Promise<Category | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Categories WHERE id = @id');
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async create(category: Category): Promise<Category> {
    try {
      const result = await pool
        .request()
        .input('name', category.name)
        .input('description', category.description)
        .query(`
          INSERT INTO Categories (name, description, createdAt, updatedAt)
          OUTPUT INSERTED.*
          VALUES (@name, @description, GETDATE(), GETDATE())
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id: number, category: Category): Promise<Category | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .input('name', category.name)
        .input('description', category.description)
        .query(`
          UPDATE Categories
          SET name = @name,
              description = @description,
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
        .query('DELETE FROM Categories WHERE id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
} 