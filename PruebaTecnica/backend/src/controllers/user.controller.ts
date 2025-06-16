import { Request, Response } from 'express';
import { UserModel, User } from '../models/user.model';
import * as csv from 'fast-csv';
import { Readable } from 'stream';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const user = await UserModel.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const userData: User = req.body;
      const existingUser = await UserModel.findByEmail(userData.email);
      
      if (existingUser) {
        return res.status(400).json({ message: 'El email ya está registrado' });
      }
      
      const newUser = await UserModel.create(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el usuario', error });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const userData: Partial<User> = req.body;
      
      const updatedUser = await UserModel.update(id, userData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const success = await UserModel.delete(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      
      res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  }

  static async uploadUsers(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha proporcionado ningún archivo' });
      }

      const fileBuffer = req.file.buffer;
      const stream = Readable.from(fileBuffer);
      const users: User[] = [];

      stream
        .pipe(csv.parse({ headers: true }))
        .on('data', (data: any) => {
          users.push({
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role || 'user'
          });
        })
        .on('end', async () => {
          try {
            const createdUsers = await Promise.all(
              users.map(user => UserModel.create(user))
            );
            res.status(201).json({
              message: 'Usuarios creados correctamente',
              users: createdUsers
            });
          } catch (error) {
            res.status(500).json({
              message: 'Error al crear los usuarios',
              error
            });
          }
        });
    } catch (error) {
      res.status(500).json({ message: 'Error al procesar el archivo CSV', error });
    }
  }
} 