import { Request, Response } from 'express';
import { CategoryModel, Category } from '../models/category.model';

export class CategoryController {
  static async getAllCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryModel.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las categorías', error });
    }
  }

  static async getCategoryById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const category = await CategoryModel.findById(id);
      
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la categoría', error });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const categoryData: Category = req.body;
      const newCategory = await CategoryModel.create(categoryData);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la categoría', error });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const categoryData: Category = req.body;
      
      const updatedCategory = await CategoryModel.update(id, categoryData);
      
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await CategoryModel.delete(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      
      res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
  }
} 