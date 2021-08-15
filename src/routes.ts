import { Router } from 'express';

import HostController from './app/controllers/HostController'

import path from 'path'

import AuthMiddleware from './app/middlewares/AuthMiddleware'
import BarsController from './app/controllers/BarsController';
import ItemsController from './app/controllers/ItemsController';
import CategoriasController from './app/controllers/CategoriasController';

const routes = Router();

// HOSTS 
routes.post('/createHost', HostController.create)
routes.post('/loginHost', HostController.login)

// BARES
routes.post('/createBar', AuthMiddleware, BarsController.create)
routes.post('/getBarByName', BarsController.getByName)

//ITEMS
routes.post('/createCategoria', AuthMiddleware, CategoriasController.create)

routes.post('/createItem', AuthMiddleware, ItemsController.create)
routes.post('/listById', ItemsController.listById)

export default routes;