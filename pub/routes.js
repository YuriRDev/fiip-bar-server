"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var HostController_1 = __importDefault(require("./app/controllers/HostController"));
var EventController_1 = __importDefault(require("./app/controllers/EventController"));
var ItemController_1 = __importDefault(require("./app/controllers/ItemController"));
var BartenderController_1 = __importDefault(require("./app/controllers/BartenderController"));
var UserController_1 = __importDefault(require("./app/controllers/UserController"));
var CompraController_1 = __importDefault(require("./app/controllers/CompraController"));
var RetiradoController_1 = __importDefault(require("./app/controllers/RetiradoController"));
var ItemCompradoController_1 = __importDefault(require("./app/controllers/ItemCompradoController"));
var path_1 = __importDefault(require("path"));
var AuthMiddleware_1 = __importDefault(require("./app/middlewares/AuthMiddleware"));
var routes = express_1.Router();
// USERS
routes.post('/login', UserController_1.default.login);
routes.post('/join', UserController_1.default.join);
routes.post("/token", UserController_1.default.token);
routes.post("/eventJoin", AuthMiddleware_1.default, UserController_1.default.eventJoin);
routes.post("/leaveEvent", AuthMiddleware_1.default, UserController_1.default.leaveEvent);
// HOSTS 
routes.post('/createHost', HostController_1.default.create);
routes.post('/loginHost', HostController_1.default.login);
routes.post('/isHost', AuthMiddleware_1.default, HostController_1.default.isHost);
routes.post('/sendNotification', AuthMiddleware_1.default, HostController_1.default.sendNotification);
// EVENTOS
routes.post('/createEvent', AuthMiddleware_1.default, EventController_1.default.create);
routes.post('/deleteEvent', AuthMiddleware_1.default, EventController_1.default.delete);
routes.post('/editEvent', AuthMiddleware_1.default, EventController_1.default.edit);
routes.post('/listEvent', EventController_1.default.list);
routes.post('/getEventById', EventController_1.default.getById);
routes.post('/getEventByName', EventController_1.default.getByName);
routes.post('/searchEventByName', EventController_1.default.searchByName);
routes.post('/myEvents', AuthMiddleware_1.default, EventController_1.default.myEvents);
routes.post('/eventReport', AuthMiddleware_1.default, EventController_1.default.report);
routes.post('/finalEventReport', AuthMiddleware_1.default, EventController_1.default.finalReport);
routes.post('/eventGraphic', AuthMiddleware_1.default, EventController_1.default.eventGraphic);
routes.post('/hostDataReport', AuthMiddleware_1.default, EventController_1.default.hostDataReport);
// ITEMS
routes.post('/createItem', AuthMiddleware_1.default, ItemController_1.default.create);
routes.post('/deleteItem', AuthMiddleware_1.default, ItemController_1.default.delete);
routes.post('/editItem', AuthMiddleware_1.default, ItemController_1.default.edit);
routes.post('/listItem', ItemController_1.default.list);
routes.post('/getItemById', ItemController_1.default.getById);
routes.post('/createPromo', AuthMiddleware_1.default, ItemController_1.default.createPromo);
routes.post('/deletePromo', AuthMiddleware_1.default, ItemController_1.default.deletePromo);
// BARTENDERS
routes.post('/createBartender', AuthMiddleware_1.default, BartenderController_1.default.create);
routes.post('/deleteBartender', AuthMiddleware_1.default, BartenderController_1.default.delete);
routes.post('/editBartender', AuthMiddleware_1.default, BartenderController_1.default.edit);
routes.post('/listBartender', AuthMiddleware_1.default, BartenderController_1.default.list);
routes.post('/loginBartender', BartenderController_1.default.login);
routes.post('/renewBartender', AuthMiddleware_1.default, BartenderController_1.default.renew);
// COMPRAS
routes.post('/comprar', AuthMiddleware_1.default, CompraController_1.default.create);
routes.post('/refund', AuthMiddleware_1.default, CompraController_1.default.refound);
// >>> N FAZ NADA routes.post('/listItems', AuthMiddleware, CompraController.listItems)
// ITEMS COMPRADOS
routes.post("/listItemsComprados", AuthMiddleware_1.default, ItemCompradoController_1.default.listItems);
routes.post('/listItemsRetiraveis', AuthMiddleware_1.default, ItemCompradoController_1.default.listRetiraveis);
routes.post('/historicoCompras', AuthMiddleware_1.default, ItemCompradoController_1.default.historico);
// REPORT
// removido*
// RETIRAR
routes.post('/retirarCreate', AuthMiddleware_1.default, RetiradoController_1.default.create);
// BARTENDER SCAM >>>>> NAO VAI PRECISAR DE MIDDLEWARE
routes.post('/bartenderScan', RetiradoController_1.default.bartenderScan);
routes.post('/listQrCode', RetiradoController_1.default.listQrCode);
routes.post('/userListQrCode', AuthMiddleware_1.default, RetiradoController_1.default.userListQrCode);
// routes.post('/getExcel', RetiradoController.excel)
// routes.post('/backup', AuthMiddleware, ItemController.backup)
routes.get('/*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/fiipSite' + '/index.html'));
});
exports.default = routes;
