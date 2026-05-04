import { Router} from 'express';
import multer from 'multer';
import User from './app/models/User.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/productController.js';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);

export default routes;