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
var Host_1 = __importDefault(require("../models/Host"));
var Bars_1 = __importDefault(require("../models/Bars"));
var Items_1 = __importDefault(require("../models/Items"));
var Categorias_1 = __importDefault(require("../models/Categorias"));
var uuid_1 = require("uuid");
var ItemController = /** @class */ (function () {
    function ItemController() {
    }
    ItemController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, barId, name, description, price, photo_url, categoriaId, barRepo, bar, hostRepo, host, itemRepo, item, dataAgora, timezone, b, categoriaRepo, categoria, itemsLength, err_1, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, barId = _a.barId, name = _a.name, description = _a.description, price = _a.price, photo_url = _a.photo_url, categoriaId = _a.categoriaId;
                        if (!(!barId || !name || !price || !categoriaId)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(505).json({
                                error: 'Missing params'
                            })];
                    case 1:
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 19, , 20]);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 3:
                        bar = _b.sent();
                        if (!bar) return [3 /*break*/, 17];
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({
                                where: { id: id }
                            })];
                    case 4:
                        host = _b.sent();
                        if (!(bar.host.id == (host === null || host === void 0 ? void 0 : host.id))) return [3 /*break*/, 15];
                        itemRepo = typeorm_1.getRepository(Items_1.default);
                        item = new Items_1.default();
                        dataAgora = new Date();
                        timezone = dataAgora.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            dataAgora.setMinutes(dataAgora.getMinutes() - b);
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 13, , 14]);
                        categoriaRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoriaRepo.findOne({
                                where: { id: categoriaId }
                            })];
                    case 6:
                        categoria = _b.sent();
                        return [4 /*yield*/, itemRepo.find({
                                where: { categoria: categoria }
                            })];
                    case 7:
                        itemsLength = _b.sent();
                        console.log(itemsLength.length);
                        if (!categoria) return [3 /*break*/, 11];
                        if (!(categoria.bar.host.id == host.id)) return [3 /*break*/, 9];
                        item.active = true;
                        item.bar = bar;
                        item.created_at = dataAgora;
                        item.photo_url = photo_url;
                        item.description = description;
                        item.name = name;
                        item.price = price;
                        item.categoria = categoria;
                        item.index = Number(itemsLength.length);
                        return [4 /*yield*/, itemRepo.save(item)];
                    case 8:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                created: true,
                                id: item.id,
                                name: item.name,
                                created_at: item.created_at,
                                price: item.price,
                                photo_url: item.photo_url
                            })];
                    case 9: return [2 /*return*/, res.status(403).json({
                            error: 'you are not the host for this category'
                        })];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, res.status(404).json({
                            error: 'Invalid Categoria Id!'
                        })];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(404).json({
                                error: 'Invalid Categoria Id!'
                            })];
                    case 14: return [3 /*break*/, 16];
                    case 15: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this bar!'
                        })];
                    case 16: return [3 /*break*/, 18];
                    case 17: return [2 /*return*/, res.status(505).json({
                            error: 'invalid BarId!'
                        })];
                    case 18: return [3 /*break*/, 20];
                    case 19:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.status(505).json({
                                error: 'invalid BarId!'
                            })];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.listById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var barId, barRepo, bar, itemsRepo, items_1, itemsOrdem_1, itemsCompensados_1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        barId = req.body.barId;
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 2:
                        bar = _a.sent();
                        if (!bar) return [3 /*break*/, 4];
                        itemsRepo = typeorm_1.getRepository(Items_1.default);
                        return [4 /*yield*/, itemsRepo.find({
                                where: { bar: bar }
                            })
                            // listar categorias
                        ];
                    case 3:
                        items_1 = _a.sent();
                        itemsOrdem_1 = [];
                        items_1.map(function (item) {
                            itemsOrdem_1[item.categoria.index] = {
                                categoriaId: item.categoria.id,
                                categoria: item.categoria.name,
                                items: []
                            };
                        });
                        // adicionar items na categoria
                        itemsOrdem_1.map(function (item, index) {
                            var itemsAdicionados = [];
                            items_1.map(function (itemzinho) {
                                if (itemzinho.categoria.id == item.categoriaId) {
                                    itemsAdicionados.push({
                                        id: itemzinho.id,
                                        name: itemzinho.name,
                                        description: itemzinho.description,
                                        price: itemzinho.price,
                                        photo_url: itemzinho.photo_url,
                                        active: itemzinho.active,
                                        index: itemzinho.index,
                                        categoria: itemzinho.categoria.id
                                    });
                                }
                            });
                            itemsAdicionados.sort(function (a, b) { return (a.index > b.index) ? 1 : -1; });
                            itemsOrdem_1[index].items = itemsAdicionados;
                        });
                        itemsCompensados_1 = [];
                        itemsOrdem_1.map(function (item) {
                            itemsCompensados_1.push(item);
                        });
                        return [2 /*return*/, res.json(itemsCompensados_1)];
                    case 4: return [2 /*return*/, res.status(404).json({
                            error: 'Bar Not Found!'
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_3 = _a.sent();
                        console.log(err_3);
                        return [2 /*return*/, res.status(404).json({
                                error: 'Bar Not Found!'
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.editById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, itemId, barId, name, description, price, categoriaId, photo_url, barRepo, barAchado, categoryRepo, categoriaAchada, itemRepo, itemAchado;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, itemId = _a.itemId, barId = _a.barId, name = _a.name, description = _a.description, price = _a.price, categoriaId = _a.categoriaId, photo_url = _a.photo_url;
                        if (!(!itemId || !barId || !name || !price || !categoriaId)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(503).json({
                                error: 'Missing params!'
                            })];
                    case 1:
                        if (!(typeof (price) == 'number')) return [3 /*break*/, 24];
                        if (!uuid_1.validate(itemId)) return [3 /*break*/, 22];
                        if (!uuid_1.validate(barId)) return [3 /*break*/, 20];
                        if (!uuid_1.validate(categoriaId)) return [3 /*break*/, 18];
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 2:
                        barAchado = _b.sent();
                        if (!barAchado) return [3 /*break*/, 16];
                        if (!(barAchado.host.id == id)) return [3 /*break*/, 14];
                        categoryRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoryRepo.findOne({
                                where: { id: categoriaId }
                            })];
                    case 3:
                        categoriaAchada = _b.sent();
                        if (!categoriaAchada) return [3 /*break*/, 12];
                        if (!(categoriaAchada.bar.id == barAchado.id)) return [3 /*break*/, 10];
                        itemRepo = typeorm_1.getRepository(Items_1.default);
                        return [4 /*yield*/, itemRepo.findOne({
                                where: { id: itemId }
                            })];
                    case 4:
                        itemAchado = _b.sent();
                        if (!itemAchado) return [3 /*break*/, 8];
                        if (!(itemAchado.categoria.bar.id == barAchado.id)) return [3 /*break*/, 6];
                        // tudo validado perfeitamente!
                        // agora eh so editar os parametros novos!
                        itemAchado.name = name;
                        itemAchado.description = description;
                        itemAchado.price = price;
                        itemAchado.categoria = categoriaAchada;
                        itemAchado.photo_url = photo_url;
                        return [4 /*yield*/, itemRepo.save(itemAchado)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                id: itemAchado.id,
                                name: itemAchado.name,
                                description: itemAchado.description,
                                price: itemAchado.price,
                                categoria: itemAchado.categoria.id,
                                photo_url: itemAchado.photo_url
                            })];
                    case 6: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this item!'
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, res.status(404).json({
                            error: 'ItemId not found'
                        })];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this category'
                        })];
                    case 11: return [3 /*break*/, 13];
                    case 12: return [2 /*return*/, res.status(404).json({
                            error: 'categoriaId not found'
                        })];
                    case 13: return [3 /*break*/, 15];
                    case 14: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this event'
                        })];
                    case 15: return [3 /*break*/, 17];
                    case 16: return [2 /*return*/, res.status(404).json({
                            error: 'BarId not found!'
                        })];
                    case 17: return [3 /*break*/, 19];
                    case 18: return [2 /*return*/, res.status(403).json({
                            error: 'Invalid categoriaId format, must be a uuid'
                        })];
                    case 19: return [3 /*break*/, 21];
                    case 20: return [2 /*return*/, res.status(403).json({
                            error: 'Invalid barId format, must be a uuid'
                        })];
                    case 21: return [3 /*break*/, 23];
                    case 22: return [2 /*return*/, res.status(403).json({
                            error: 'Invalid itemId format, must be a uuid'
                        })];
                    case 23: return [3 /*break*/, 25];
                    case 24: return [2 /*return*/, res.status(503).json({
                            error: 'Price must be a number'
                        })];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, itemId, itemRepo, itemAchado;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        itemId = req.body.itemId;
                        if (!itemId) return [3 /*break*/, 4];
                        if (!uuid_1.validate(itemId)) return [3 /*break*/, 2];
                        itemRepo = typeorm_1.getRepository(Items_1.default);
                        return [4 /*yield*/, itemRepo.findOne({
                                where: { id: itemId }
                            })];
                    case 1:
                        itemAchado = _a.sent();
                        if (itemAchado) {
                            if (itemAchado.categoria.bar.host.id == id) {
                                itemRepo.delete(itemAchado);
                                return [2 /*return*/, res.json({
                                        deleted: true
                                    })];
                            }
                            else {
                                return [2 /*return*/, res.status(503).json({
                                        error: 'You are not the host for this item!'
                                    })];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({
                                    error: 'Item not found!'
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(503).json({
                            error: 'ItemId must be a uuid'
                        })];
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(503).json({
                            error: 'Missing Params'
                        })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.indexOrder = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, itemsIndex, categoryId, categoryRepo, categoriaAchada, itemsRepo_1, itemsAchados, isTheSameCategory_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, itemsIndex = _a.itemsIndex, categoryId = _a.categoryId;
                        if (!(!itemsIndex || !categoryId)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.json(504).json({
                                error: 'Missing params'
                            })];
                    case 1:
                        if (!uuid_1.validate(categoryId)) return [3 /*break*/, 8];
                        categoryRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoryRepo.findOne({
                                where: { id: categoryId }
                            })];
                    case 2:
                        categoriaAchada = _b.sent();
                        if (!categoriaAchada) return [3 /*break*/, 6];
                        if (!(categoriaAchada.bar.host.id == id)) return [3 /*break*/, 4];
                        itemsRepo_1 = typeorm_1.getRepository(Items_1.default);
                        return [4 /*yield*/, itemsRepo_1.find({
                                where: { categoria: { id: categoryId } }
                            })];
                    case 3:
                        itemsAchados = _b.sent();
                        if (Array.isArray(itemsIndex)) {
                            if (itemsIndex.length == itemsAchados.length) {
                                isTheSameCategory_1 = true;
                                Promise.all(itemsIndex.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    var itemDoMap;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, itemsRepo_1.findOne({ where: { id: item } })];
                                            case 1:
                                                itemDoMap = _a.sent();
                                                if ((itemDoMap === null || itemDoMap === void 0 ? void 0 : itemDoMap.categoria.id) != categoryId) {
                                                    isTheSameCategory_1 = false;
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })).then(function () {
                                    if (isTheSameCategory_1) {
                                        // agora eh so salvar de acordo com o novo index!!!
                                        Promise.all(itemsIndex.map(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                                            var itemDoMap;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, itemsRepo_1.findOne({ where: { id: item } })];
                                                    case 1:
                                                        itemDoMap = _a.sent();
                                                        if (!itemDoMap) return [3 /*break*/, 3];
                                                        itemDoMap.index = index;
                                                        return [4 /*yield*/, itemsRepo_1.save(itemDoMap)];
                                                    case 2:
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })).then(function () {
                                            return res.json({
                                                ok: true
                                            });
                                        }).catch(function () {
                                            return res.status(503).json({
                                                error: 'Error desconhecido!'
                                            });
                                        });
                                    }
                                    else {
                                        return res.status(503).json({
                                            error: 'One/+ of the itens does not exist or does not pertence to the same category'
                                        });
                                    }
                                });
                            }
                            else {
                                return [2 /*return*/, res.status(504).json({
                                        error: 'ItemsIndex must be the same length as the categoryItems!'
                                    })];
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(504).json({
                                    error: 'ItemsIndex must be array'
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this category'
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(404).json({
                            error: 'categoria not found!'
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, res.status(504).json({
                            error: 'categoryId must be a uuid'
                        })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ItemController;
}());
exports.default = new ItemController();
