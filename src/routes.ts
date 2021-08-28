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
routes.post('/getBarById', AuthMiddleware, BarsController.getById)
routes.post('/listBars', AuthMiddleware, BarsController.list)

// CATEGORIAS
routes.post('/createCategoria', AuthMiddleware, CategoriasController.create)
routes.post('/listCategoria', AuthMiddleware, CategoriasController.list)
routes.post('/changeCategoriaIndex', AuthMiddleware, CategoriasController.changeIndex)
routes.post('/deleteCategory', AuthMiddleware, CategoriasController.delete)

// ITEMS
routes.post('/listById', ItemsController.listById)
routes.post('/createItem', AuthMiddleware, ItemsController.create)
routes.post('/editItem', AuthMiddleware, ItemsController.editById)
routes.post('/deleteItem', AuthMiddleware, ItemsController.delete)
routes.post('/changeItemIndex', AuthMiddleware, ItemsController.indexOrder)


export default routes;