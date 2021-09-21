import { Router } from 'express';

import HostController from './app/controllers/HostController'

import path from 'path'

import AuthMiddleware from './app/middlewares/AuthMiddleware'
import BarsController from './app/controllers/BarsController';
import ItemsController from './app/controllers/ItemsController';
import CategoriasController from './app/controllers/CategoriasController';
import SessionController from './app/controllers/SessionController';
import PedidosController from './app/controllers/PedidosController';
import AdicionalController from './app/controllers/AdicionalController';
import DeliveryController from './app/controllers/DeliveryController';

const routes = Router();

// HOSTS 
routes.post('/createHost', HostController.create)
routes.post('/loginHost', HostController.login)
routes.post('/getPedidosTrial', AuthMiddleware, HostController.getPedidosTrial)

// SESSIONS
routes.post('/session', SessionController.create)

// PEDIDOS
routes.post('/order', AuthMiddleware, PedidosController.create)
routes.post('/listOrders', AuthMiddleware, PedidosController.listUser)
routes.post('/listBarOrders', AuthMiddleware, PedidosController.listBar)

routes.post('/pedidoValue', AuthMiddleware, PedidosController.setNewValue)

// DELIVERY

routes.post('/orderDelivery', AuthMiddleware, DeliveryController.create)
routes.post('/deliveryList', AuthMiddleware, DeliveryController.listUser)
routes.post('/deliveryBarOrders', AuthMiddleware, DeliveryController.listBar)

routes.post('/deliveryValue', AuthMiddleware, DeliveryController.setNewValue)
routes.post('/getDeliveryTrial', AuthMiddleware, HostController.getDeliveryTrial)
routes.post('/editDelivery', AuthMiddleware, BarsController.editDelivery)

// BARES
routes.post('/createBar', AuthMiddleware, BarsController.create)
routes.post('/getBarByName', BarsController.getByName)
routes.post('/getBarById', AuthMiddleware, BarsController.getById)
routes.post('/listBars', AuthMiddleware, BarsController.list)
routes.post("/editInfo", AuthMiddleware, HostController.edit)

routes.post('/editPremium', AuthMiddleware, BarsController.editPremium)

// CATEGORIAS
routes.post('/createCategoria', AuthMiddleware, CategoriasController.create)
routes.post('/listCategoria', AuthMiddleware, CategoriasController.list)
routes.post('/changeCategoriaIndex', AuthMiddleware, CategoriasController.changeIndex)
routes.post('/deleteCategory', AuthMiddleware, CategoriasController.delete)
routes.post("/renameCategory", AuthMiddleware, CategoriasController.changeName)

// ITEMS
routes.post('/listById', ItemsController.listById)
routes.post('/getById', ItemsController.getById)

// Adicionais
routes.post('/createAdicional', AuthMiddleware, AdicionalController.create)
routes.post('/listAdicional', AuthMiddleware, AdicionalController.list)
routes.post('/deleteAdicional', AuthMiddleware, AdicionalController.delete)
routes.post('/editAdicional', AuthMiddleware, AdicionalController.edit)

routes.post('/createItem', AuthMiddleware, ItemsController.create)
routes.post('/editItem', AuthMiddleware, ItemsController.editById)
routes.post('/deleteItem', AuthMiddleware, ItemsController.delete)
routes.post('/changeItemIndex', AuthMiddleware, ItemsController.indexOrder)

routes.post('/uploadData', AuthMiddleware, ItemsController.uploadData)

export default routes;