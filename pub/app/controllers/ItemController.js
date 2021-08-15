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
var Events_1 = __importDefault(require("../models/Events"));
var Item_1 = __importDefault(require("../models/Item"));
var Promocoes_1 = __importDefault(require("../models/Promocoes"));
var ItemController = /** @class */ (function () {
    function ItemController() {
    }
    ItemController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, eventId, description, photo_url, quantity, name, type, app_price, eventRepo, evento, hostRepo, host, thisRepo, data, timezone, b, itemRepo, item, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, eventId = _a.eventId, description = _a.description, photo_url = _a.photo_url, quantity = _a.quantity, name = _a.name, type = _a.type, app_price = _a.app_price;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 2:
                        evento = _b.sent();
                        if (!evento) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid EventId!' })];
                        }
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 3:
                        host = _b.sent();
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId, host: host } })];
                    case 4:
                        thisRepo = _b.sent();
                        if (!thisRepo) {
                            return [2 /*return*/, res.status(403).json({ error: 'You are not the host of this event!' })];
                        }
                        // Verificar dados primarios
                        if (!eventId || !name || !type || !app_price) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing information' })];
                        }
                        if (app_price <= 0) {
                            return [2 /*return*/, res.status(409).json({ error: 'AppPrice need to be greater than 0' })];
                        }
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        item = itemRepo.create({
                            event: evento,
                            name: name,
                            description: description,
                            photo_url: photo_url,
                            type: type,
                            app_price: app_price,
                            quantity: quantity,
                            quantityOriginal: quantity,
                            created_at: data
                        });
                        return [4 /*yield*/, itemRepo.save(item)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.json(item)];
                    case 6:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid EventId!', status: err_1 })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, id, itemRepo, item, itemHost, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        itemId = req.body.itemId;
                        id = req.userId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.findOne({ where: { id: itemId } })];
                    case 2:
                        item = _b.sent();
                        itemHost = item === null || item === void 0 ? void 0 : item.event.host.id;
                        // verificar se o id eh igual o HostId 
                        if (!item) {
                            return [2 /*return*/, res.status(403).json({ error: "Invalid item Id!" })];
                        }
                        if (itemHost != id) {
                            return [2 /*return*/, res.status(403).json({ error: "You are not the host for this event!" })];
                        }
                        if (!item) return [3 /*break*/, 4];
                        return [4 /*yield*/, itemRepo.delete(item)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, res.json(itemHost)];
                    case 5:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({ error: "Catch > Invalid item Id! (not uuid)" })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, itemId, description, photo_url, balcao_price, quantity, name, type, app_price, itemRepo, item, itemHost, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, itemId = _a.itemId, description = _a.description, photo_url = _a.photo_url, balcao_price = _a.balcao_price, quantity = _a.quantity, name = _a.name, type = _a.type, app_price = _a.app_price;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.findOne({ where: { id: itemId } })];
                    case 2:
                        item = _c.sent();
                        itemHost = item === null || item === void 0 ? void 0 : item.event.host.id;
                        // verificar se o id eh igual o HostId 
                        if (!item) {
                            return [2 /*return*/, res.status(403).json({ error: "1- Invalid item Id!" })];
                        }
                        if (itemHost != id) {
                            return [2 /*return*/, res.status(403).json({ error: "You are not the host for this event!" })];
                        }
                        // se for o dono, editar
                        if (item)
                            item.name = name;
                        item.description = description || null;
                        item.photo_url = photo_url || null;
                        item.type = type;
                        item.app_price = app_price;
                        item.quantity = quantity || null;
                        return [4 /*yield*/, itemRepo.save(item)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, res.json(item)];
                    case 4:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(404).json({ error: "Catch > Invalid item Id! (not uuid)" })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var eventId, eventRepo, event_1, itemRepo, items_1, nomesCategorias_1, arrayReturned_1, arrayFinalReturned_1, arrayObjPromo_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventId = req.body.eventId;
                        if (!eventId) return [3 /*break*/, 5];
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })
                            // Verificar se existe evento
                        ];
                    case 1:
                        event_1 = _a.sent();
                        if (!event_1) return [3 /*break*/, 3];
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.find({ where: { event: event_1 } })
                            // fazer map e pegar lista de nomes de categoria (por ordem alfabetica)
                        ];
                    case 2:
                        items_1 = _a.sent();
                        nomesCategorias_1 = [];
                        items_1.map(function (item) {
                            // vendo se ja existe no array
                            if (!item.promocoes) {
                                var jaExiste_1 = false;
                                nomesCategorias_1.map(function (itemzinho) {
                                    if (itemzinho == item.type) {
                                        jaExiste_1 = true;
                                    }
                                });
                                if (!jaExiste_1) {
                                    nomesCategorias_1.push(item.type);
                                }
                            }
                        });
                        arrayReturned_1 = [];
                        nomesCategorias_1.map(function (item) {
                            arrayReturned_1.push({ categoria: item, items: [] });
                        });
                        // listando agora por categoria:
                        // menos os em promocao!!
                        arrayReturned_1.map(function (item, index) {
                            // vendo se os items fazem parte da categoria
                            items_1.map(function (itemzinho) {
                                if (itemzinho.type == item.categoria) {
                                    if (!itemzinho.promocoes) {
                                        var itemParaAdd = {
                                            id: itemzinho.id,
                                            name: itemzinho.name,
                                            description: itemzinho.description,
                                            type: itemzinho.type,
                                            photo_url: itemzinho.photo_url,
                                            app_price: itemzinho.app_price,
                                            quantity: itemzinho.quantity,
                                            quantityOriginal: itemzinho.quantityOriginal,
                                        };
                                        arrayReturned_1[index].items.push(itemParaAdd);
                                    }
                                    else {
                                        if (!itemzinho.promocoes.valid) {
                                            var itemParaAdd = {
                                                id: itemzinho.id,
                                                name: itemzinho.name,
                                                description: itemzinho.description,
                                                type: itemzinho.type,
                                                photo_url: itemzinho.photo_url,
                                                app_price: itemzinho.app_price,
                                                quantity: itemzinho.quantity,
                                                quantityOriginal: itemzinho.quantityOriginal,
                                            };
                                            arrayReturned_1[index].items.push(itemParaAdd);
                                        }
                                        else {
                                            var data = new Date();
                                            var timezone = data.getTimezoneOffset();
                                            // timezone brasil = 180 
                                            if (timezone != 180) {
                                                var b = 180 - timezone;
                                                data.setMinutes(data.getMinutes() - b);
                                            }
                                            if (itemzinho.promocoes.valid_until) {
                                                var dataDoItem = new Date(itemzinho.promocoes.valid_until);
                                                if (dataDoItem < data) {
                                                    var itemParaAdd = {
                                                        id: itemzinho.id,
                                                        name: itemzinho.name,
                                                        description: itemzinho.description,
                                                        type: itemzinho.type,
                                                        photo_url: itemzinho.photo_url,
                                                        app_price: itemzinho.app_price,
                                                        quantity: itemzinho.quantity,
                                                        quantityOriginal: itemzinho.quantityOriginal,
                                                    };
                                                    arrayReturned_1[index].items.push(itemParaAdd);
                                                }
                                            }
                                        }
                                    }
                                }
                            });
                        });
                        arrayFinalReturned_1 = [{
                                categoria: "PROMOÇÕES Fiip",
                                items: []
                            }];
                        arrayObjPromo_1 = [];
                        items_1.map(function (item) {
                            if (item.promocoes) {
                                if (item.promocoes.valid) {
                                    if (item.promocoes.valid_until != null) {
                                        var data = new Date();
                                        var timezone = data.getTimezoneOffset();
                                        // timezone brasil = 180 
                                        if (timezone != 180) {
                                            var b = 180 - timezone;
                                            data.setMinutes(data.getMinutes() - b);
                                        }
                                        if (item.promocoes.valid_until > data) {
                                            // valido
                                            var itemParaAdd = {
                                                id: item.id,
                                                name: item.name,
                                                photo_url: item.photo_url,
                                                description: item.description,
                                                type: item.type,
                                                app_price: item.app_price,
                                                promo_price: item.promocoes.price,
                                                quantity: item.quantity,
                                                quantityOriginal: item.quantityOriginal,
                                            };
                                            arrayObjPromo_1.push(itemParaAdd);
                                        }
                                        else {
                                            // nao valido
                                        }
                                    }
                                    else {
                                        var itemParaAdd = {
                                            id: item.id,
                                            name: item.name,
                                            photo_url: item.photo_url,
                                            description: item.description,
                                            type: item.type,
                                            app_price: item.app_price,
                                            promo_price: item.promocoes.price,
                                            quantity: item.quantity,
                                            quantityOriginal: item.quantityOriginal,
                                        };
                                        arrayObjPromo_1.push(itemParaAdd);
                                    }
                                }
                            }
                        });
                        if (arrayObjPromo_1.length > 0) {
                            arrayFinalReturned_1[0].items = arrayObjPromo_1;
                            // juntando as duas tabela!
                            arrayReturned_1.map(function (item) {
                                arrayFinalReturned_1.push(item);
                            });
                            return [2 /*return*/, res.json(arrayFinalReturned_1)];
                        }
                        else {
                            return [2 /*return*/, res.json(arrayReturned_1)];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(404).json({ error: 'Event not found!' })];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, res.status(405).json({ error: 'Missing eventId' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, itemsRepo, eventoItem, hasPrecoPromo, data, timezone, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = req.body.itemId;
                        itemsRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemsRepo.findOne({ where: { id: itemId } })];
                    case 1:
                        eventoItem = _a.sent();
                        if (!eventoItem) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid ItemId!' })];
                        }
                        else {
                            hasPrecoPromo = false;
                            if (eventoItem.promocoes) {
                                if (eventoItem.promocoes.valid) {
                                    if (eventoItem.promocoes.valid_until) {
                                        data = new Date();
                                        timezone = data.getTimezoneOffset();
                                        // timezone brasil = 180 
                                        if (timezone != 180) {
                                            b = 180 - timezone;
                                            data.setMinutes(data.getMinutes() - b);
                                        }
                                        if (eventoItem.promocoes.valid_until > data) {
                                            hasPrecoPromo = true;
                                        }
                                        else {
                                            hasPrecoPromo = false;
                                        }
                                    }
                                    else {
                                        hasPrecoPromo = true;
                                    }
                                }
                                else {
                                    hasPrecoPromo = false;
                                }
                            }
                            else {
                                hasPrecoPromo = false;
                            }
                            if (hasPrecoPromo) {
                                return [2 /*return*/, res.json({
                                        id: eventoItem.id,
                                        name: eventoItem.name,
                                        description: eventoItem.description,
                                        photo_url: eventoItem.photo_url,
                                        type: eventoItem.type,
                                        app_price: eventoItem.app_price,
                                        quantity: eventoItem.quantity,
                                        quantityOriginal: eventoItem.quantityOriginal,
                                        active: eventoItem.active,
                                        promo_price: eventoItem.promocoes.price
                                    })];
                            }
                            else {
                                return [2 /*return*/, res.json({
                                        id: eventoItem.id,
                                        name: eventoItem.name,
                                        description: eventoItem.description,
                                        photo_url: eventoItem.photo_url,
                                        type: eventoItem.type,
                                        app_price: eventoItem.app_price,
                                        quantity: eventoItem.quantity,
                                        quantityOriginal: eventoItem.quantityOriginal,
                                        active: eventoItem.active,
                                    })];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.createPromo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, itemId, price, valid_until, id, hostRepo, host, itemRepo, item, promoRepo, promo, data, timezone, b, validUntilHour, validUntilMinute;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, itemId = _a.itemId, price = _a.price, valid_until = _a.valid_until;
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.find({ where: { id: id } })];
                    case 1:
                        host = _b.sent();
                        if (!(itemId || price)) return [3 /*break*/, 13];
                        if (!host) return [3 /*break*/, 11];
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.findOne({ where: { id: itemId } })];
                    case 2:
                        item = _b.sent();
                        if (!item) return [3 /*break*/, 9];
                        if (!(item.event.host.id == id)) return [3 /*break*/, 7];
                        if (!(price < item.app_price)) return [3 /*break*/, 5];
                        promoRepo = typeorm_1.getRepository(Promocoes_1.default);
                        promo = new Promocoes_1.default();
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        promo.created_at = data;
                        promo.price = Number(Number(price).toFixed(2));
                        promo.valid = true;
                        if (valid_until) {
                            validUntilHour = String(valid_until).split(':')[0];
                            validUntilMinute = String(valid_until).split(':')[1];
                            if (Number(validUntilHour) > 0) {
                                data.setHours(data.getHours() + Number(validUntilHour));
                            }
                            if (Number(validUntilMinute) > 0) {
                                data.setMinutes(data.getMinutes() + Number(validUntilMinute));
                            }
                            promo.valid_until = data;
                        }
                        else {
                        }
                        return [4 /*yield*/, promoRepo.save(promo)];
                    case 3:
                        _b.sent();
                        console.log(promo.id);
                        item.promocoes = promo;
                        return [4 /*yield*/, itemRepo.save(item)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json({ ok: true })
                            // cria uma nova promocao 
                        ];
                    case 5: return [2 /*return*/, res.status(405).json({ error: 'can not send promotion value bigger then the price' })];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(405).json({ error: 'not the host for this event!' })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(405).json({ error: 'Item not found!' })];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, res.status(405).json({ error: 'not a host' })];
                    case 12: return [3 /*break*/, 14];
                    case 13: return [2 /*return*/, res.status(405).json({ error: 'Missing body!' })];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.deletePromo = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, id, hostRepo, host, itemRepo, itemAchado, promoRepo, promoFound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = req.body.itemId;
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.find({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!host) return [3 /*break*/, 13];
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.findOne({ where: { id: itemId } })];
                    case 2:
                        itemAchado = _a.sent();
                        if (!itemAchado) return [3 /*break*/, 11];
                        if (!((itemAchado === null || itemAchado === void 0 ? void 0 : itemAchado.event.host.id) == id)) return [3 /*break*/, 9];
                        if (!itemAchado.promocoes) return [3 /*break*/, 7];
                        promoRepo = typeorm_1.getRepository(Promocoes_1.default);
                        return [4 /*yield*/, promoRepo.findOne({ where: { id: itemAchado.promocoes.id } })];
                    case 3:
                        promoFound = _a.sent();
                        if (!promoFound) return [3 /*break*/, 5];
                        promoFound.valid = false;
                        return [4 /*yield*/, promoRepo.save(promoFound)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.json({ ok: 'Promotion removed!' })];
                    case 5: return [2 /*return*/, res.status(500).json({ error: 'the item does not have a promo id' })];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(500).json({ error: 'the item does not have a promo id' })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(403).json({ error: ' You are not the host for this event' })];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, res.status(404).json({ error: 'ItemID not found!' })];
                    case 12: return [3 /*break*/, 14];
                    case 13: return [2 /*return*/, res.status(403).json({ error: 'You are not a host' })];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ItemController.prototype.backup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemRepo, getAllItems, arrayTotal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        { /*
                        {
                        "eventId": "cc1d8f44-6120-4603-ab5a-147e3993f0fe",
                        "name": "Heineken",
                        "description": "340 ml",
                        "type": "Cerveja",
                        "app_price": 5.6,
                        "photo_url": "https://imagetest-yline1.s3-sa-east-1.amazonaws.com/s3/8bf255fb-fdb7-4bea-93ae-8ca2febf67e8",
                        "quantity": null
                    }
                        */
                        }
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        return [4 /*yield*/, itemRepo.find({ where: { id: typeorm_1.Not(typeorm_1.IsNull()) } })];
                    case 1:
                        getAllItems = _a.sent();
                        arrayTotal = [];
                        getAllItems.map(function (item) {
                            arrayTotal.push({
                                eventId: item.event.id,
                                name: item.name,
                                description: item.description,
                                type: item.type,
                                app_price: item.app_price,
                                photo_url: item.photo_url,
                                quantity: null
                            });
                        });
                        return [2 /*return*/, res.json(arrayTotal)];
                }
            });
        });
    };
    return ItemController;
}());
exports.default = new ItemController();
