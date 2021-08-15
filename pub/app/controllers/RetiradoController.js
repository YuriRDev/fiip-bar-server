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
var Bartender_1 = __importDefault(require("../models/Bartender"));
var Retirado_1 = __importDefault(require("../models/Retirado"));
var Items_Comprados_1 = __importDefault(require("../models/Items_Comprados"));
var RetiradoController = /** @class */ (function () {
    function RetiradoController() {
    }
    RetiradoController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, itemWalletId, userRepo, user, itemWalletRepo, itemWalletList, alreadyRetirado_1, retiradoRepo, retirado, retiradoId_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        itemWalletId = req.body.itemWalletId;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 11];
                        if (!itemWalletId) return [3 /*break*/, 9];
                        itemWalletRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemWalletRepo.findByIds(itemWalletId)];
                    case 2:
                        itemWalletList = _a.sent();
                        alreadyRetirado_1 = false;
                        console.log('chegou aqui!');
                        console.log(itemWalletList);
                        if (!(itemWalletList.length > 0)) return [3 /*break*/, 7];
                        itemWalletList.map(function (item) {
                            if (item.retirado) {
                                if (item.retirado.retirado_at || item.refund) {
                                    console.log("ja foi retirado");
                                    alreadyRetirado_1 = true;
                                }
                            }
                            else {
                                if (item.refund) {
                                    alreadyRetirado_1 = true;
                                }
                            }
                        });
                        if (!!alreadyRetirado_1) return [3 /*break*/, 5];
                        retiradoRepo = typeorm_1.getRepository(Retirado_1.default);
                        retirado = new Retirado_1.default();
                        retirado.user = user;
                        return [4 /*yield*/, retiradoRepo.save(retirado)
                            // o ID do retirado = 
                        ];
                    case 3:
                        _a.sent();
                        retiradoId_1 = retirado.id;
                        // agora precisa mudar o ID de todos os itemRepos pra esse retiradoId
                        itemWalletList.map(function (item) {
                            // console.log(item.retirado)
                            item.retirado = retiradoId_1;
                        });
                        return [4 /*yield*/, itemWalletRepo.save(itemWalletList)
                            // console.log(itemWalletList)
                            // agora eh retornar com o valor do ID!
                        ];
                    case 4:
                        _a.sent();
                        // console.log(itemWalletList)
                        // agora eh retornar com o valor do ID!
                        return [2 /*return*/, res.send(retiradoId_1)];
                    case 5: return [2 /*return*/, res.status(403).json({ error: 'Um ou mais itens ja foram retirados ou reembolsados' })];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(403).json({ error: 'Invalid ItemWalletId' })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(409).json({ error: 'Missing ItemWalletId!' })];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, res.status(403).json({ error: 'Invalid User! you host?' })];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    RetiradoController.prototype.bartenderScan = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, key, password, retiradoId, retiradoRepo, retirado, bartRepo, bartender_1, itemWalletRepo, itemsCompradosList, foiReembolsado_1, isBarmanValid_1, items, data, timezone, b;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, key = _a.key, password = _a.password, retiradoId = _a.retiradoId;
                        if (!key || !password || !retiradoId) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                        }
                        retiradoRepo = typeorm_1.getRepository(Retirado_1.default);
                        return [4 /*yield*/, retiradoRepo.findOne({ where: { id: retiradoId } })];
                    case 1:
                        retirado = _b.sent();
                        if (!!retirado) return [3 /*break*/, 2];
                        console.log("erro retirado id");
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid RetiradoId!' })];
                    case 2:
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartRepo.findOne({ where: { key: key } })
                            // se nao existir retorna erro
                        ];
                    case 3:
                        bartender_1 = _b.sent();
                        if (!!bartender_1) return [3 /*break*/, 4];
                        console.log("invalid bartender kry");
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid Bartender Key!' })];
                    case 4:
                        if (!(bartender_1.password != password)) return [3 /*break*/, 5];
                        console.log("invalid password");
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid Password for Bartender!' })];
                    case 5:
                        if (!retirado.retirado_at) return [3 /*break*/, 6];
                        return [2 /*return*/, res.status(403).json({ error: 'Item/s ja retirado/s' })];
                    case 6:
                        itemWalletRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemWalletRepo.find({ where: { retirado: retirado } })];
                    case 7:
                        itemsCompradosList = _b.sent();
                        foiReembolsado_1 = false;
                        itemsCompradosList.map(function (item) {
                            if (item.refund) {
                                foiReembolsado_1 = true;
                            }
                        });
                        isBarmanValid_1 = true;
                        return [4 /*yield*/, itemWalletRepo.find({ where: { retirado: { id: retiradoId } } })];
                    case 8:
                        items = _b.sent();
                        items.map(function (item, index) {
                            if (item.item.event.host.id != bartender_1.host.id) {
                                isBarmanValid_1 = false;
                            }
                        });
                        if (!foiReembolsado_1) return [3 /*break*/, 9];
                        return [2 /*return*/, res.status(405).json({ error: 'Item foi reembolsado!' })];
                    case 9:
                        retirado.bartender = bartender_1;
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        retirado.retirado_at = data;
                        if (!isBarmanValid_1) return [3 /*break*/, 11];
                        return [4 /*yield*/, retiradoRepo.save(retirado)];
                    case 10:
                        _b.sent();
                        return [2 /*return*/, res.json(retirado)];
                    case 11: return [2 /*return*/, res.status(403).json({ error: 'You are not the barman for this event' })];
                }
            });
        });
    };
    RetiradoController.prototype.listQrCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, key, password, retiradoId, bartRepo, bartender_2, retiradoRepo, retirado, itemCompradoRepo, itemAchados, returnResponse_1, foiReembolsado_2, isValidToRead_1, arrayzinho, current, cnt, i, arrayFinal_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, key = _a.key, password = _a.password, retiradoId = _a.retiradoId;
                        if (!(!key || !password || !retiradoId)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                    case 1:
                        if (!!retiradoId) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                    case 2:
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartRepo.findOne({ where: { key: key } })
                            // se nao existir retorna erro
                        ];
                    case 3:
                        bartender_2 = _b.sent();
                        if (!!bartender_2) return [3 /*break*/, 4];
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid Bartender Key!' })];
                    case 4:
                        if (!(bartender_2.password != password)) return [3 /*break*/, 5];
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid Password for Bartender!' })];
                    case 5:
                        retiradoRepo = typeorm_1.getRepository(Retirado_1.default);
                        return [4 /*yield*/, retiradoRepo.findOne({ where: { id: retiradoId } })];
                    case 6:
                        retirado = _b.sent();
                        if (!!retirado) return [3 /*break*/, 7];
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid RetiradoId!' })];
                    case 7:
                        if (!retirado.retirado_at) return [3 /*break*/, 8];
                        return [2 /*return*/, res.status(403).json({ error: 'RetiradoID ja foi retirado' })];
                    case 8:
                        itemCompradoRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemCompradoRepo.find({ where: { retirado: retirado } })];
                    case 9:
                        itemAchados = _b.sent();
                        returnResponse_1 = [];
                        foiReembolsado_2 = false;
                        itemAchados.map(function (item) {
                            if (item.refund) {
                                foiReembolsado_2 = true;
                            }
                        });
                        if (foiReembolsado_2) {
                            return [2 /*return*/, res.status(405).json({ error: 'Item/s reembolsado/s' })];
                        }
                        else {
                            isValidToRead_1 = true;
                            itemAchados.map(function (item) {
                                if (item.item.event.host.id != bartender_2.host.id) {
                                    isValidToRead_1 = false;
                                }
                                var dado = {
                                    name: item.item.name,
                                    photo: item.item.photo_url
                                };
                                returnResponse_1.push(JSON.stringify(dado));
                            });
                            returnResponse_1.sort();
                            arrayzinho = [];
                            current = null;
                            cnt = 0;
                            for (i = 0; i < returnResponse_1.length; i++) {
                                if (returnResponse_1[i] != current) {
                                    if (cnt > 0) {
                                        arrayzinho.push({ name: current, quantity: cnt });
                                    }
                                    current = returnResponse_1[i];
                                    cnt = 1;
                                }
                                else {
                                    cnt++;
                                }
                            }
                            if (cnt > 0) {
                                arrayzinho.push({ name: current, quantity: cnt });
                            }
                            arrayFinal_1 = [];
                            arrayzinho.map(function (item) {
                                arrayFinal_1.push({
                                    name: JSON.parse(item.name).name,
                                    photo: JSON.parse(item.name).photo,
                                    quantity: item.quantity
                                });
                            });
                            if (isValidToRead_1) {
                                return [2 /*return*/, res.json(arrayFinal_1)];
                            }
                            else {
                                return [2 /*return*/, res.status(403).json({ error: 'You are not the bartender for this events' })];
                            }
                        }
                        _b.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    RetiradoController.prototype.userListQrCode = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, retiradoId, retiradoRepo, retirado, itemCompradoRepo, itemAchados, returnResponse, arrayzinho, current, cnt, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        retiradoId = req.body.retiradoId;
                        if (!retiradoId) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing information!' })];
                        }
                        retiradoRepo = typeorm_1.getRepository(Retirado_1.default);
                        return [4 /*yield*/, retiradoRepo.findOne({ where: { id: retiradoId } })];
                    case 1:
                        retirado = _a.sent();
                        if ((retirado === null || retirado === void 0 ? void 0 : retirado.user.id) != id) {
                            return [2 /*return*/, res.status(403).json({ error: 'Not Your QrCode' })];
                        }
                        if (!retirado) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid RetiradoId!' })];
                        }
                        // ver se o item nao foi retirado!
                        if (retirado.retirado_at) {
                            return [2 /*return*/, res.status(403).json({ error: 'Retirado already retiradokkkkk' })];
                        }
                        itemCompradoRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemCompradoRepo.find({ where: { retirado: retirado } })];
                    case 2:
                        itemAchados = _a.sent();
                        returnResponse = [];
                        itemAchados.map(function (item) {
                            returnResponse.push("" + item.item.name);
                        });
                        returnResponse.sort();
                        arrayzinho = [];
                        current = null;
                        cnt = 0;
                        for (i = 0; i < returnResponse.length; i++) {
                            if (returnResponse[i] != current) {
                                if (cnt > 0) {
                                    arrayzinho.push({ name: current, quantity: cnt });
                                }
                                current = returnResponse[i];
                                cnt = 1;
                            }
                            else {
                                cnt++;
                            }
                        }
                        if (cnt > 0) {
                            arrayzinho.push({ name: current, quantity: cnt });
                        }
                        return [2 /*return*/, res.json(arrayzinho)];
                }
            });
        });
    };
    RetiradoController.prototype.excel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var eventId, itemsCompradosRepo, itemsComprados, itemsCompradosRetirados, usuariosQueGastaram, returnData, getData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        eventId = req.body.eventId;
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { event: { id: eventId }, retirado: typeorm_1.Not(typeorm_1.IsNull()), refund: typeorm_1.IsNull() } })];
                    case 1:
                        itemsComprados = _a.sent();
                        itemsCompradosRetirados = [];
                        itemsComprados.map(function (item) {
                            if (item.retirado.retirado_at) {
                                itemsCompradosRetirados.push(item.item.name + "," + item.price + "," + item.item.type + ",1," + new Date(item.retirado.retirado_at).getDate() + "/" + new Date(item.retirado.retirado_at).getMonth() + "/" + new Date(item.retirado.retirado_at).getFullYear() + " " + new Date(item.retirado.retirado_at).getHours() + "," + item.price);
                            }
                        });
                        usuariosQueGastaram = [];
                        itemsComprados.map(function (item) {
                            var existe = false;
                            usuariosQueGastaram.map(function (itemzinho) {
                                if (itemzinho.id == item.compra.user.id) {
                                    existe = true;
                                }
                            });
                            if (!existe) {
                                usuariosQueGastaram.push(item.compra.user);
                            }
                        });
                        returnData = [];
                        getData = function () {
                            var itemWalletRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                            return Promise.all(usuariosQueGastaram.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var itemsComprados, itemsCompradosPorId, consumoTotalDoUser, cont, total, i, itemMaisComprado;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, itemWalletRepo.find({ where: { user: { id: item.id } } })];
                                        case 1:
                                            itemsComprados = _a.sent();
                                            itemsCompradosPorId = [];
                                            consumoTotalDoUser = 0;
                                            itemsComprados.map(function (itemzinho) {
                                                consumoTotalDoUser += itemzinho.price;
                                                //console.log({
                                                //  price: itemzinho.price,
                                                //  itemName: itemzinho.item.name
                                                //})
                                                itemsCompradosPorId.push(itemzinho.item.name);
                                            });
                                            cont = [];
                                            total = 1;
                                            for (i = 0; i < itemsCompradosPorId.length; i++) {
                                                if (i < itemsCompradosPorId.length - 1 && itemsCompradosPorId[i] == itemsCompradosPorId[i + 1]) {
                                                    total++;
                                                }
                                                else {
                                                    cont.push({ item: itemsCompradosPorId[i], total: total });
                                                    total = 1;
                                                }
                                            }
                                            cont.sort(function (a, b) { return (a.total < b.total) ? 1 : ((b.total < a.total) ? -1 : 0); });
                                            itemMaisComprado = (cont[0].item);
                                            //console.log(consumoTotalDoUser, itemMaisComprado)
                                            console.log({
                                                nome: item.name,
                                                email: item.email,
                                                celular: item.phone,
                                                consumo: consumoTotalDoUser,
                                                itemMaisComprado: itemMaisComprado
                                            });
                                            returnData.push(item.name + "," + item.email + "," + item.phone + "," + consumoTotalDoUser + "," + itemMaisComprado);
                                            return [2 /*return*/];
                                    }
                                });
                            }); }));
                        };
                        //console.log(usuariosQueGastaram.length)
                        getData().then(function () {
                            //return res.send(returnData)
                        });
                        return [2 /*return*/, res.send(itemsCompradosRetirados)];
                }
            });
        });
    };
    return RetiradoController;
}());
exports.default = new RetiradoController();
