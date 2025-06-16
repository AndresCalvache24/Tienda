import { pool } from '../config/database';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductModel {
  static async findAll(): Promise<Product[]> {
    try {
      const result = await pool.request().query('SELECT * FROM Products');
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id: number): Promise<Product | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM Products WHERE id = @id');
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async create(product: Product): Promise<Product> {
    try {
      const result = await pool
        .request()
        .input('name', product.name)
        .input('description', product.description)
        .input('price', product.price)
        .input('stock', product.stock)
        .input('categoryId', product.categoryId)
        .input('imageUrl', product.imageUrl)
        .query(`
          INSERT INTO Products (name, description, price, stock, categoryId, imageUrl, createdAt, updatedAt)
          OUTPUT INSERTED.*
          VALUES (@name, @description, @price, @stock, @categoryId, @imageUrl, GETDATE(), GETDATE())
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id: number, product: Product): Promise<Product | null> {
    try {
      const result = await pool
        .request()
        .input('id', id)
        .input('name', product.name)
        .input('description', product.description)
        .input('price', product.price)
        .input('stock', product.stock)
        .input('categoryId', product.categoryId)
        .input('imageUrl', product.imageUrl)
        .query(`
          UPDATE Products
          SET name = @name,
              description = @description,
              price = @price,
              stock = @stock,
              categoryId = @categoryId,
              imageUrl = @imageUrl,
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
        .query('DELETE FROM Products WHERE id = @id');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
} 