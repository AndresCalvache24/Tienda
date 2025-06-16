import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

const router = Router();

router.get('/:userId', CartController.getCart);
router.post('/:userId', CartController.addToCart);
router.put('/:userId/products/:productId', CartController.updateQuantity);
router.delete('/:userId/products/:productId', CartController.removeFromCart);
router.delete('/:userId', CartController.clearCart);

export const cartRoutes = router; 