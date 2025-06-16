import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/upload', upload.single('file'), UserController.uploadUsers);

export const userRoutes = router; 