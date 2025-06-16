import { Request, Response } from 'express';
import { CartModel, CartItem } from '../models/cart.model';

export class CartController {
  static async getCart(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const cartItems = await CartModel.getCartItems(userId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
  }

  static async addToCart(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const cartItem: CartItem = {
        userId,
        productId: req.body.productId,
        quantity: req.body.quantity
      };

      const addedItem = await CartModel.addToCart(cartItem);
      res.status(201).json(addedItem);
    } catch (error) {
      res.status(500).json({ message: 'Error al agregar al carrito', error });
    }
  }

  static async updateQuantity(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const cartItem: CartItem = {
        userId,
        productId: parseInt(req.params.productId),
        quantity: req.body.quantity
      };

      const updatedItem = await CartModel.updateQuantity(cartItem);
      
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item no encontrado en el carrito' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la cantidad', error });
    }
  }

  static async removeFromCart(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);
      
      const success = await CartModel.removeFromCart(userId, productId);
      
      if (!success) {
        return res.status(404).json({ message: 'Item no encontrado en el carrito' });
      }
      
      res.json({ message: 'Item eliminado del carrito correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar del carrito', error });
    }
  }

  static async clearCart(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.userId);
      const success = await CartModel.clearCart(userId);
      
      if (!success) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
      
      res.json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al vaciar el carrito', error });
    }
  }
} 