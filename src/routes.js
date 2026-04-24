import { Router} from 'express';
import User from './app/models/User.js';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';

const routes = new Router();


routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

export default routes;