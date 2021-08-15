"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("../models/User"));
var Events_1 = __importDefault(require("../models/Events"));
var Compra_1 = __importDefault(require("../models/Compra"));
var Items_Comprados_1 = __importDefault(require("../models/Items_Comprados"));
var ItemCompradoController = /** @class */ (function () {
    function ItemCompradoController() {
    }
    ItemCompradoController.prototype.listItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepo, user, itemsCompradosRepo, itemsComprados, itemCompradosReturn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(403).json({ error: 'You are a host!' })];
                        }
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { user: user } })
                            //console.log(ArrayItems)
                        ];
                    case 2:
                        itemsComprados = _a.sent();
                        itemCompradosReturn = [];
                        itemsComprados.map(function (itemComprado) {
                            delete itemComprado.item.event.host;
                            itemCompradosReturn.push(itemComprado);
                        });
                        return [2 /*return*/, res.json(itemCompradosReturn)];
                }
            });
        });
    };
    ItemCompradoController.prototype.listRetiraveis = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, eventId, userRepo, user, eventRepo, event_1, itemsCompradosRepo, itemsComprados, itemsRetiraveisArray_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        eventId = req.body.eventId;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!!user) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(403).json({ error: 'You are a host!' })];
                    case 2:
                        if (!eventId) return [3 /*break*/, 7];
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 3:
                        event_1 = _a.sent();
                        if (!event_1) return [3 /*break*/, 5];
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { user: user, event: event_1 } })];
                    case 4:
                        itemsComprados = _a.sent();
                        itemsRetiraveisArray_1 = [];
                        itemsComprados.map(function (itemzinho) {
                            if (itemzinho.retirado) {
                                // console.log('nao retirado')
                                if (itemzinho.retirado.retirado_at) {
                                }
                                else {
                                    if (itemzinho.refund) {
                                    }
                                    else {
                                        itemsRetiraveisArray_1.push(itemzinho);
                                    }
                                }
                            }
                            else {
                                if (itemzinho.refund) {
                                }
                                else {
                                    itemsRetiraveisArray_1.push(itemzinho);
                                }
                            }
                        });
                        return [2 /*return*/, res.json(itemsRetiraveisArray_1)];
                    case 5: return [2 /*return*/, res.status(500).json({ error: 'Invalid event!' })];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(405).json({ error: 'Missing eventId!' })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ItemCompradoController.prototype.historico = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepo, user, compraRepo, compras, comprasValue_1, itemCompradoRepo_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        compraRepo = typeorm_1.getRepository(Compra_1.default);
                        return [4 /*yield*/, compraRepo.find({ where: { user: user } })];
                    case 2:
                        compras = _a.sent();
                        comprasValue_1 = [];
                        itemCompradoRepo_1 = typeorm_1.getRepository(Items_Comprados_1.default);
                        Promise.all(compras.map(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                            var itemsComprado, arrayItems;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, itemCompradoRepo_1.find({ where: { compra: item } })];
                                    case 1:
                                        itemsComprado = _a.sent();
                                        arrayItems = [];
                                        itemsComprado.map(function (itemzinho) {
                                            arrayItems.push({
                                                id: itemzinho.id,
                                                price: itemzinho.price,
                                                itemId: itemzinho.item.id,
                                                itemName: itemzinho.item.name,
                                                itemPhoto: itemzinho.item.photo_url,
                                                itemType: itemzinho.item.type,
                                                retirado_at: itemzinho.retirado ? itemzinho.retirado.retirado_at ? new Date(itemzinho.retirado.retirado_at).getDate() + "/" + new Date(itemzinho.retirado.retirado_at).getMonth() + "/" + new Date(itemzinho.retirado.retirado_at).getFullYear() + " " + new Date(itemzinho.retirado.retirado_at).getHours() + ":" + new Date(itemzinho.retirado.retirado_at).getMinutes() : null : null,
                                                refund: itemzinho.refund ? new Date(itemzinho.refund.created_at).getDate() + "/" + new Date(itemzinho.refund.created_at).getMonth() + "/" + new Date(itemzinho.refund.created_at).getFullYear() + " " + new Date(itemzinho.refund.created_at).getHours() + ":" + new Date(itemzinho.refund.created_at).getMinutes() : null
                                            });
                                        });
                                        comprasValue_1.push({
                                            id: item.id,
                                            eventId: item.event.id,
                                            eventName: item.event.title,
                                            price: item.price,
                                            purchased_at: new Date(item.purchased_at).getDate() + "/" + new Date(item.purchased_at).getMonth() + "/" + new Date(item.purchased_at).getFullYear() + " " + new Date(item.purchased_at).getHours() + ":" + new Date(item.purchased_at).getMinutes(),
                                            items: arrayItems
                                        });
                                        return [2 /*return*/];
                                }
                            });
                        }); })).then(function () {
                            comprasValue_1.map(function (item) {
                                console.log(item);
                            });
                            return res.json(comprasValue_1);
                        });
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(405).json({ error: 'Invalid User!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ItemCompradoController;
}());
exports.default = new ItemCompradoController();
