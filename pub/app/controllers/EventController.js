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
var Items_Comprados_1 = __importDefault(require("../models/Items_Comprados"));
var Item_1 = __importDefault(require("../models/Item"));
var EventController = /** @class */ (function () {
    function EventController() {
    }
    EventController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host, _a, title, description, banner_url, start_at, closes_at, address, eventRepo, sameName, evento;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _b.sent();
                        if (!host) {
                            return [2 /*return*/, res.status(403).json({ error: 'hostId not found!' })];
                        }
                        _a = req.body, title = _a.title, description = _a.description, banner_url = _a.banner_url, start_at = _a.start_at, closes_at = _a.closes_at, address = _a.address;
                        if (!title || !description || !banner_url || !start_at || !closes_at || !address) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                        }
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.createQueryBuilder()
                                .where("LOWER(title) = LOWER(:title)", { title: title })
                                .getOne()];
                    case 2:
                        sameName = _b.sent();
                        if (!sameName) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(500).json({ error: 'Event Name already in use!' })];
                    case 3:
                        evento = eventRepo.create({
                            host: host,
                            title: title,
                            description: description,
                            banner_url: banner_url,
                            start_at: start_at,
                            closes_at: closes_at,
                            address: address
                        });
                        return [4 /*yield*/, eventRepo.save(evento)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json(evento)];
                }
            });
        });
    };
    EventController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host, eventId, eventRepo, event_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!host) {
                            return [2 /*return*/, res.status(403).json({ error: 'hostId not found!' })];
                        }
                        eventId = req.body.eventId;
                        if (!eventId) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing EventId!' })];
                        }
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 3:
                        event_1 = _a.sent();
                        if (!event_1) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid EventId!' })];
                        }
                        if (event_1.host.id != id) {
                            return [2 /*return*/, res.status(403).json({ error: 'Your are not the host for this event!' })];
                        }
                        return [4 /*yield*/, eventRepo.delete(event_1)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, res.json({ deleted: true })];
                    case 5:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid EventId!' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, eventId, title, description, banner_url, start_at, closes_at, eventRepo, evento, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, eventId = _a.eventId, title = _a.title, description = _a.description, banner_url = _a.banner_url, start_at = _a.start_at, closes_at = _a.closes_at;
                        // Verificar se falta informacao
                        if (!title || !description || !banner_url || !start_at || !closes_at) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                        }
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })
                            // Verificacao de evento
                        ];
                    case 2:
                        evento = _c.sent();
                        // Verificacao de evento
                        if (!evento) {
                            return [2 /*return*/, res.status(404).json({ error: 'Event Not Found!' })];
                        }
                        // Verificar Host!
                        if (evento.host.id != id) {
                            return [2 /*return*/, res.status(403).json({ error: 'Your are not the host for this event!' })];
                        }
                        evento.title = title;
                        ;
                        evento.description = description;
                        evento.banner_url = banner_url || null;
                        evento.start_at = start_at;
                        evento.closes_at = closes_at || null;
                        return [4 /*yield*/, eventRepo.save(evento)];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, res.send(evento)];
                    case 4:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid EventID!' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var eventRepo, event, initial, eventoInitial_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.find({ select: ['id', 'title', 'banner_url', 'description', 'start_at', 'closes_at', 'address'] })];
                    case 1:
                        event = _a.sent();
                        initial = req.body.initial;
                        if (initial) {
                            eventoInitial_1 = [];
                            event.map(function (item) {
                                if (String(item.title).includes(initial)) {
                                    eventoInitial_1.push(item);
                                }
                            });
                            return [2 /*return*/, res.json(eventoInitial_1)];
                        }
                        else {
                            return [2 /*return*/, res.json(event)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idInput, eventRepo, event_2, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        idInput = req.body.idInput;
                        if (!idInput) {
                            console.log('missing idinput error');
                            return [2 /*return*/, res.status(409).json({ error: 'Missing nameInput!' })];
                        }
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: idInput }, select: ['id', 'title', 'banner_url', 'description', 'start_at', 'closes_at'] })];
                    case 2:
                        event_2 = _b.sent();
                        return [2 /*return*/, res.json(event_2)];
                    case 3:
                        _a = _b.sent();
                        console.log("error no catch");
                        return [2 /*return*/, res.status(409).json({ error: 'Catch > Invalid Id!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.getByName = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var nameInput, eventRepo, eventName, event_3, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nameInput = req.body.nameInput;
                        if (!nameInput) {
                            console.log('missing idinput error');
                            return [2 /*return*/, res.status(409).json({ error: 'Missing idInput!' })];
                        }
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        eventName = nameInput.split('-').join(" ").toLowerCase();
                        return [4 /*yield*/, eventRepo.createQueryBuilder()
                                .where("LOWER(title) = LOWER(:eventName)", { eventName: eventName })
                                .getOne()];
                    case 2:
                        event_3 = _b.sent();
                        if (event_3) {
                            return [2 /*return*/, res.json(event_3)];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid name ' })];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        console.log("error no catch");
                        return [2 /*return*/, res.status(409).json({ error: 'Catch > Invalid Name!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.searchByName = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var eventRepo, search, event_4, eventArray_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        search = req.body.search;
                        if (!search) return [3 /*break*/, 2];
                        return [4 /*yield*/, eventRepo.find()];
                    case 1:
                        event_4 = _a.sent();
                        eventArray_1 = [];
                        event_4.map(function (item) {
                            if (String((item.title)).toLowerCase().includes(String(search).toLowerCase())) {
                                console.log("contains!");
                            }
                            eventArray_1.push({
                                id: item.id,
                                title: item.title,
                                banner_url: item.banner_url,
                                description: item.description,
                                start_at: item.start_at,
                                closes_at: item.closes_at
                            });
                        });
                        return [2 /*return*/, res.json(eventArray_1)];
                    case 2: return [2 /*return*/, res.json([])];
                }
            });
        });
    };
    EventController.prototype.myEvents = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host, eventRepo, evento, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 2:
                        host = _b.sent();
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.find({ where: { host: host } })];
                    case 3:
                        evento = _b.sent();
                        if (!host) {
                            return [2 /*return*/, res.json(404).json({ error: 'Host not found!' })];
                        }
                        if (!evento) {
                            return [2 /*return*/, res.status(404).json({ error: 'Event Not Found!' })];
                        }
                        return [2 /*return*/, res.send(evento)];
                    case 4:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid EventID!' })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.report = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, eventId, hostRepo, host, eventRepo, evento, itemRepo, items, itemsStringfyBrute, itemsStringfyFiltered, current, cnt, i, returnedItems, categorias, categoriasFiltered, current, cnt, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        eventId = req.body.eventId;
                        if (!eventId) {
                            return [2 /*return*/, res.status(500).json({ error: 'Missing eventId!' })];
                        }
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.find({ where: { host: host, id: eventId } })];
                    case 2:
                        evento = _a.sent();
                        itemRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemRepo.find({ where: { event: eventId } })];
                    case 3:
                        items = _a.sent();
                        if (!host) {
                            return [2 /*return*/, res.json(404).json({ error: 'Not a host!' })];
                        }
                        if (!evento) {
                            return [2 /*return*/, res.status(404).json({ error: 'Event Not Found!' })];
                        }
                        itemsStringfyBrute = [];
                        items.map(function (item) {
                            if (item.retirado) {
                                if (item.retirado.retirado_at) {
                                    itemsStringfyBrute.push(JSON.stringify({
                                        id: item.item.id,
                                        unityPrice: item.item.app_price,
                                        name: item.item.name,
                                        price: item.price,
                                        category: item.item.type,
                                    }));
                                }
                            }
                        });
                        itemsStringfyBrute.sort();
                        itemsStringfyFiltered = [];
                        current = null;
                        cnt = 0;
                        for (i = 0; i < itemsStringfyBrute.length; i++) {
                            if (itemsStringfyBrute[i] != current) {
                                if (cnt > 0) {
                                    itemsStringfyFiltered.push({ item: current, quantity: cnt });
                                }
                                current = itemsStringfyBrute[i];
                                cnt = 1;
                            }
                            else {
                                cnt++;
                            }
                        }
                        if (cnt > 0) {
                            itemsStringfyFiltered.push({ item: current, quantity: cnt });
                        }
                        returnedItems = [];
                        itemsStringfyFiltered.map(function (item) {
                            // console.log(item)
                            returnedItems.push({
                                id: JSON.parse(item.item).id,
                                name: "" + JSON.parse(item.item).name,
                                unityPrice: (JSON.parse(item.item).unityPrice),
                                price: JSON.parse(item.item).price * item.quantity,
                                quantity: item.quantity,
                                category: JSON.parse(item.item).category
                            });
                        });
                        categorias = [];
                        categoriasFiltered = [];
                        returnedItems.map(function (item) {
                            // console.log(item.category, item.price)
                            categorias.push(item.category);
                        });
                        categorias.sort();
                        current = null;
                        cnt = 0;
                        for (i = 0; i < categorias.length; i++) {
                            if (categorias[i] != current) {
                                if (cnt > 0) {
                                    categoriasFiltered.push({ category: current, total: 0, quantity: 0 });
                                }
                                current = categorias[i];
                                cnt = 1;
                            }
                            else {
                                cnt++;
                            }
                        }
                        if (cnt > 0) {
                            categoriasFiltered.push({ category: current, total: 0, quantity: 0 });
                        }
                        // console.log(categoriasFiltered)
                        // Botando preco real no categoriasFiltered!
                        returnedItems.map(function (item) {
                            categoriasFiltered.map(function (itemzinho, index) {
                                if (item.category == itemzinho.category) {
                                    itemzinho.total += item.price;
                                    itemzinho.quantity += item.quantity;
                                }
                            });
                        });
                        // console.log(categoriasFiltered)
                        returnedItems.sort(function (a, b) { return (a.quantity < b.quantity) ? 1 : -1; });
                        categoriasFiltered.sort(function (a, b) { return (a.quantity < b.quantity) ? 1 : -1; });
                        return [2 /*return*/, res.send({ allItems: returnedItems, categoryPrice: categoriasFiltered })];
                }
            });
        });
    };
    EventController.prototype.finalReport = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, eventId, hostRepo, host, eventRepo, event_5, itemRepo, itemsCompradosRepo, itemsComprados, itemsRetirados_1, itemsRetiradosCompleto_1, repetidos, current, cnt, i, itemMaisCompradoItem, itemMaisComprado, dinheiroTotal_1, usuariosQueCompraram_1, uniqueArray, consumoMedio;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        eventId = req.body.eventId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!(host && eventId)) return [3 /*break*/, 9];
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { host: host } })];
                    case 2:
                        event_5 = _a.sent();
                        if (!event_5) return [3 /*break*/, 7];
                        if (!((event_5 === null || event_5 === void 0 ? void 0 : event_5.host.id) == id)) return [3 /*break*/, 5];
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { event: eventId, retirado: typeorm_1.Not(typeorm_1.IsNull()) } })
                            // Item mais comprado
                            // Logica:
                            // Listar todos items retirados
                            // ver quais deles apareceram mais vezes
                        ];
                    case 3:
                        itemsComprados = _a.sent();
                        itemsRetirados_1 = [];
                        itemsRetiradosCompleto_1 = [];
                        itemsComprados.map(function (item, index) {
                            if (item.retirado) {
                                if (item.retirado.retirado_at) {
                                    itemsRetirados_1.push(item.item.id);
                                    itemsRetiradosCompleto_1.push(item);
                                }
                            }
                        });
                        repetidos = [];
                        itemsRetirados_1.sort();
                        current = null;
                        cnt = 0;
                        for (i = 0; i < itemsRetirados_1.length; i++) {
                            if (itemsRetirados_1[i] != current) {
                                if (cnt > 0) {
                                    repetidos.push({
                                        id: current,
                                        vezes: cnt
                                    });
                                }
                                current = itemsRetirados_1[i];
                                cnt = 1;
                            }
                            else {
                                cnt++;
                            }
                        }
                        if (cnt > 0) {
                            repetidos.push({
                                id: current,
                                vezes: cnt
                            });
                        }
                        repetidos.sort(function (a, b) { return (a.vezes < b.vezes) ? 1 : -1; });
                        return [4 /*yield*/, itemRepo.findOne({ where: { id: repetidos[0].id } })];
                    case 4:
                        itemMaisCompradoItem = _a.sent();
                        itemMaisComprado = {
                            id: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.id,
                            name: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.name,
                            description: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.description,
                            photo_url: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.photo_url,
                            type: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.type,
                            app_price: itemMaisCompradoItem === null || itemMaisCompradoItem === void 0 ? void 0 : itemMaisCompradoItem.app_price,
                            compradoVezes: repetidos[0].vezes
                        };
                        console.log(itemMaisComprado);
                        dinheiroTotal_1 = 0;
                        usuariosQueCompraram_1 = [];
                        itemsRetiradosCompleto_1.map(function (item, index) {
                            dinheiroTotal_1 += item.price;
                            usuariosQueCompraram_1.push(item.retirado.user.id);
                        });
                        console.log(dinheiroTotal_1);
                        uniqueArray = usuariosQueCompraram_1.filter(function (item, pos) {
                            return usuariosQueCompraram_1.indexOf(item) == pos;
                        });
                        consumoMedio = (dinheiroTotal_1 / uniqueArray.length);
                        // console.log(consumoMedio)
                        return [2 /*return*/, res.json({
                                dinheiroTotal: dinheiroTotal_1,
                                consumoMedio: consumoMedio,
                                itemMaisComprado: itemMaisComprado
                            })];
                    case 5: return [2 /*return*/, res.status(405).json({ error: 'you are not the host for this event' })];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(404).json({ error: 'invalid event!' })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(403).json({ error: 'Invalid host' })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.eventGraphic = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, eventId, hostRepo, host, eventRepo, event_6, itemsCompradosRepo, itemsComprados, itemsCompradosPorData_1, hoje, timezoneHoje, b, dataHoje_1, dataAmanha_1, horaT_1, datas, timeOffset, horaAgora, _loop_1, codeRender, valorLength;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        eventId = req.body.eventId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!eventId) return [3 /*break*/, 8];
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 2:
                        event_6 = _a.sent();
                        if (!(event_6 && host)) return [3 /*break*/, 6];
                        if (!(event_6.host.id == host.id)) return [3 /*break*/, 4];
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { event: event_6, retirado: typeorm_1.Not(typeorm_1.IsNull()) } })
                            // filtrar com os items comprados HOJE!
                        ];
                    case 3:
                        itemsComprados = _a.sent();
                        itemsCompradosPorData_1 = [];
                        hoje = new Date(Date.now());
                        timezoneHoje = hoje.getTimezoneOffset();
                        if (timezoneHoje != 180) {
                            b = 180 - timezoneHoje;
                            hoje.setMinutes(hoje.getMinutes() - b);
                        }
                        dataHoje_1 = (hoje.getFullYear() + "-" + (hoje.getMonth() + 1) + "-" + hoje.getDate());
                        dataAmanha_1 = (hoje.getFullYear() + "-" + (hoje.getMonth() + 1) + "-" + (hoje.getDate() + 1));
                        itemsComprados.map(function (item, index) {
                            if (item.retirado) {
                                if (item.retirado.retirado_at) {
                                    if (item.retirado.retirado_at >= new Date(dataHoje_1) && item.retirado.retirado_at <= new Date(dataAmanha_1)) {
                                        itemsCompradosPorData_1.push({
                                            itemId: item.item.id,
                                            itemPrice: item.price,
                                            retirado: (item.retirado.retirado_at.getFullYear() + "-" + (item.retirado.retirado_at.getMonth() + 1) + "-" + item.retirado.retirado_at.getDate() + " " + item.retirado.retirado_at.getHours() + ":" + item.retirado.retirado_at.getMinutes())
                                        });
                                    }
                                }
                            }
                        });
                        horaT_1 = 0;
                        datas = [];
                        timeOffset = (hoje.getTimezoneOffset());
                        horaAgora = new Date(hoje).getHours();
                        _loop_1 = function () {
                            var valorT = 0;
                            itemsCompradosPorData_1.map(function (item, index) {
                                if (new Date(item.retirado).getHours() == horaT_1) {
                                    valorT += item.itemPrice;
                                }
                            });
                            datas.push({
                                hora: horaT_1 + ":00",
                                value: valorT
                            });
                            horaT_1++;
                        };
                        // console.log("hora agora ", horaAgora)
                        while (horaT_1 <= horaAgora) {
                            _loop_1();
                        }
                        codeRender = [];
                        // Mostrar somente as ultimas 7 horas!
                        if (datas.length > 7) {
                            valorLength = datas.length - 7;
                            while (valorLength <= datas.length - 1) {
                                codeRender.push(datas[valorLength]);
                                valorLength++;
                            }
                        }
                        //console.log(datas)
                        //console.log(itemsCompradosPorData)
                        return [2 /*return*/, res.json(codeRender)];
                    case 4: return [2 /*return*/, res.status(500).json({ error: 'You are not the host for this event!' })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(500).json({ error: 'Invalid event or Host' })];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, res.status(500).json({ error: 'Missing eventId' })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    EventController.prototype.hostDataReport = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host, eventRepo, events, eventArray_2, itemsRetiradosRepo_1, todosItemsRetirados_1, pegarDados;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!host) return [3 /*break*/, 3];
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.find({ where: { host: host } })];
                    case 2:
                        events = _a.sent();
                        if (events.length > 0) {
                            eventArray_2 = [];
                            events.map(function (item) {
                                eventArray_2.push(item.id);
                            });
                            itemsRetiradosRepo_1 = typeorm_1.getRepository(Items_Comprados_1.default);
                            todosItemsRetirados_1 = [];
                            pegarDados = function () {
                                return Promise.all(eventArray_2.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    var itemsRetiradosValidos, itemsRetiradosAchado;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                itemsRetiradosValidos = [];
                                                return [4 /*yield*/, itemsRetiradosRepo_1.find({
                                                        where: {
                                                            event: { id: item },
                                                            refund: typeorm_1.IsNull(),
                                                            retirado: typeorm_1.Not(typeorm_1.IsNull())
                                                        },
                                                    })];
                                            case 1:
                                                itemsRetiradosAchado = _a.sent();
                                                itemsRetiradosAchado.map(function (itemzinho) {
                                                    if (itemzinho.retirado.retirado_at) {
                                                        itemsRetiradosValidos.push({
                                                            id: itemzinho.id,
                                                            price: itemzinho.price,
                                                            retirado_at: itemzinho.retirado.retirado_at
                                                        });
                                                    }
                                                });
                                                itemsRetiradosValidos.map(function (cadaItem) {
                                                    todosItemsRetirados_1.push(cadaItem);
                                                });
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            };
                            pegarDados().then(function () {
                                // agora eh soh listar por semana / mes / ano 
                                // listando por semana: 
                                // pegando o atual dia da semana [0,1,2,3,4,5,6] 
                                var data = new Date();
                                var timezone = data.getTimezoneOffset();
                                // timezone brasil = 180 
                                if (timezone != 180) {
                                    var b = 180 - timezone;
                                    data.setMinutes(data.getMinutes() - b);
                                }
                                var hojeEmDiaDeSemana = (data.getDay());
                                // criando array com o valor de dias de hoje, ontem e antes ( de acordo com o dia da semana )
                                var j = 0;
                                var graficoDaSemana = [];
                                while (j <= hojeEmDiaDeSemana) {
                                    graficoDaSemana.push({
                                        dia: j,
                                        valor: 0
                                    });
                                    j++;
                                }
                                // console.log(graficoDaSemana)
                                graficoDaSemana.map(function (item, index) {
                                    var valorDoDia = 0;
                                    // pegando o primeiro valor ( ou seja, dia hoje - (valor do length de graficoSemana - dia ))
                                    // diaDeData: data.getDate() - ((graficoDaSemana.length - 1) - item.dia)
                                    todosItemsRetirados_1.map(function (itemzinho) {
                                        if ((itemzinho.retirado_at).getDate() == (data.getDate() - ((graficoDaSemana.length - 1) - item.dia))) {
                                            valorDoDia += itemzinho.price;
                                        }
                                    });
                                    graficoDaSemana[index].valor = valorDoDia;
                                });
                                // criando array com valores da semana desse mes, essa semana, semana passada ( de acordo com a semana do dia 0,1,2,3)
                                // 1 > pegar o dia da semana que o mes comeca
                                var dataHoje = new Date();
                                var timezoneHoje = data.getTimezoneOffset();
                                // timezone brasil = 180 
                                if (timezoneHoje != 180) {
                                    var b = 180 - timezoneHoje;
                                    dataHoje.setMinutes(dataHoje.getMinutes() - b);
                                }
                                var semanaComecaNa = new Date(dataHoje.setDate(1)).getDay();
                                // estamos na semana :
                                var currentWeek = (Math.floor((data.getDate()) + (semanaComecaNa - 1)) / 7);
                                var dadosSemana = [];
                                var l = 0;
                                while (l <= currentWeek) {
                                    dadosSemana.push({
                                        semana: l,
                                        valor: 0
                                    });
                                    l++;
                                }
                                // fazer map da dadosSemana e pegar o valor de cada semana 
                                var hoje = data.getDate();
                                var k = 1;
                                var _loop_2 = function () {
                                    var currentWeek_1 = Math.floor(((k) + (semanaComecaNa - 1)) / 7);
                                    todosItemsRetirados_1.map(function (item, index) {
                                        if ((item.retirado_at).getDate() == k) {
                                            dadosSemana[currentWeek_1].valor += item.price;
                                        }
                                    });
                                    k++;
                                };
                                while (k <= hoje) {
                                    _loop_2();
                                }
                                // console.log(dadosSemana)
                                // agora pegar por mes!
                                // pegar o mes atual, e fazer um novo array de objetos
                                var mesAtual = data.getMonth();
                                var dadosMes = [];
                                var c = 1;
                                while (c <= mesAtual + 1) {
                                    dadosMes.push({
                                        mes: c,
                                        valor: 0
                                    });
                                    c++;
                                }
                                // fazer map agora e pegar valor dos items de cada mes
                                var valorTotal = 0;
                                todosItemsRetirados_1.map(function (item, index) {
                                    var mesItem = item.retirado_at.getMonth();
                                    dadosMes[mesItem].valor += item.price;
                                    valorTotal += item.price;
                                });
                                return res.json({
                                    graficoDaSemana: graficoDaSemana,
                                    dadosSemana: dadosSemana,
                                    dadosMes: dadosMes,
                                    valorTotal: valorTotal
                                });
                            }).catch(function () {
                                console.log('teve um erro no servidor?');
                                return res.status(500).json({ error: 'Erro interno ? > Catch promise all' });
                            });
                        }
                        else {
                            return [2 /*return*/, res.status(500).json({ error: 'Host does not have events!' })];
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(403).json({ error: 'You are not a host!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return EventController;
}());
exports.default = new EventController();
