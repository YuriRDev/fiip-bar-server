"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HostController_1 = __importDefault(require("./app/controllers/HostController"));
var AuthMiddleware_1 = __importDefault(require("./app/middlewares/AuthMiddleware"));
var BarsController_1 = __importDefault(require("./app/controllers/BarsController"));
var ItemsController_1 = __importDefault(require("./app/controllers/ItemsController"));
var CategoriasController_1 = __importDefault(require("./app/controllers/CategoriasController"));
var routes = express_1.Router();
// HOSTS 
routes.post('/createHost', HostController_1.default.create);
routes.post('/loginHost', HostController_1.default.login);
// BARES
routes.post('/createBar', AuthMiddleware_1.default, BarsController_1.default.create);
routes.post('/getBarByName', BarsController_1.default.getByName);
routes.post('/getBarById', AuthMiddleware_1.default, BarsController_1.default.getById);
routes.post('/listBars', AuthMiddleware_1.default, BarsController_1.default.list);
// CATEGORIAS
routes.post('/createCategoria', AuthMiddleware_1.default, CategoriasController_1.default.create);
routes.post('/listCategoria', AuthMiddleware_1.default, CategoriasController_1.default.list);
routes.post('/changeCategoriaIndex', AuthMiddleware_1.default, CategoriasController_1.default.changeIndex);
routes.post('/deleteCategory', AuthMiddleware_1.default, CategoriasController_1.default.delete);
// ITEMS
routes.post('/listById', ItemsController_1.default.listById);
routes.post('/createItem', AuthMiddleware_1.default, ItemsController_1.default.create);
routes.post('/editItem', AuthMiddleware_1.default, ItemsController_1.default.editById);
routes.post('/deleteItem', AuthMiddleware_1.default, ItemsController_1.default.delete);
routes.post('/changeItemIndex', AuthMiddleware_1.default, ItemsController_1.default.indexOrder);
exports.default = routes;
