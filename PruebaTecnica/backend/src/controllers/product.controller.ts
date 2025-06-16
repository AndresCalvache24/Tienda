import { Request, Response } from 'express';
import { ProductModel, Product } from '../models/product.model';

export class ProductController {
  static async getAllProducts(req: Request, res: Response) {
    try {
      const products = await ProductModel.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos', error });
    }
  }

  static async getProductById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const product = await ProductModel.findById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el producto', error });
    }
  }

  static async createProduct(req: Request, res: Response) {
    try {
      const productData: Product = req.body;
      const newProduct = await ProductModel.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el producto', error });
    }
  }

  static async updateProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const productData: Product = req.body;
      
      const updatedProduct = await ProductModel.update(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
  }

  static async deleteProduct(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await ProductModel.delete(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
  }
} 