import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import { productRoutes } from './routes/product.routes';
import { categoryRoutes } from './routes/category.routes';
import { cartRoutes } from './routes/cart.routes';
import { userRoutes } from './routes/user.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conectar a la base de datos
connectDB();

// Ruta base para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API de E-commerce funcionando correctamente' });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 