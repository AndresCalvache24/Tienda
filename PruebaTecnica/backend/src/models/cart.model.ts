import { pool } from '../config/database';

export interface CartItem {
  id?: number;
  userId: number;
  productId: number;
  quantity: number;
}

export interface CartItemWithProduct extends CartItem {
  product?: {
    name: string;
    price: number;
    imageUrl?: string;
  };
}

export class CartModel {
  static async getCartItems(userId: number): Promise<CartItemWithProduct[]> {
    try {
      const result = await pool
        .request()
        .input('userId', userId)
        .query(`
          SELECT ci.*, p.name, p.price, p.imageUrl
          FROM CartItems ci
          JOIN Products p ON ci.productId = p.id
          WHERE ci.userId = @userId
        `);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async addToCart(item: CartItem): Promise<CartItem> {
    try {
      const result = await pool
        .request()
        .input('userId', item.userId)
        .input('productId', item.productId)
        .input('quantity', item.quantity)
        .query(`
          MERGE INTO CartItems WITH (HOLDLOCK) AS target
          USING (VALUES (@userId, @productId, @quantity)) AS source (userId, productId, quantity)
          ON target.userId = source.userId AND target.productId = source.productId
          WHEN MATCHED THEN
            UPDATE SET quantity = target.quantity + source.quantity
          WHEN NOT MATCHED THEN
            INSERT (userId, productId, quantity)
            VALUES (source.userId, source.productId, source.quantity)
          OUTPUT INSERTED.*;
        `);
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async updateQuantity(item: CartItem): Promise<CartItem | null> {
    try {
      const result = await pool
        .request()
        .input('userId', item.userId)
        .input('productId', item.productId)
        .input('quantity', item.quantity)
        .query(`
          UPDATE CartItems
          SET quantity = @quantity
          OUTPUT INSERTED.*
          WHERE userId = @userId AND productId = @productId
        `);
      return result.recordset[0] || null;
    } catch (error) {
      throw error;
    }
  }

  static async removeFromCart(userId: number, productId: number): Promise<boolean> {
    try {
      const result = await pool
        .request()
        .input('userId', userId)
        .input('productId', productId)
        .query('DELETE FROM CartItems WHERE userId = @userId AND productId = @productId');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }

  static async clearCart(userId: number): Promise<boolean> {
    try {
      const result = await pool
        .request()
        .input('userId', userId)
        .query('DELETE FROM CartItems WHERE userId = @userId');
      return result.rowsAffected[0] > 0;
    } catch (error) {
      throw error;
    }
  }
} 