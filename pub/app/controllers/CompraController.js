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
var axios_1 = __importDefault(require("axios"));
var User_1 = __importDefault(require("../models/User"));
var Events_1 = __importDefault(require("../models/Events"));
var Item_1 = __importDefault(require("../models/Item"));
var Compra_1 = __importDefault(require("../models/Compra"));
var Items_Comprados_1 = __importDefault(require("../models/Items_Comprados"));
var Refund_1 = __importDefault(require("../models/Refund"));
var _a = require('uuid'), uuidv1 = _a.v1, uuidv4 = _a.v4;
var CompraController = /** @class */ (function () {
    function CompraController() {
    }
    CompraController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, costumerName, costumerBirthdate, costumerCPF, holderNumber, itemId, eventId, expirationMonth, email, expirationYear, cardNumber, cvc, fullName, cpf, birthdate, costumer, eventRepo, evento_1, userRepo, user_1, itemRepo_1, sair_1, valorTotal_1, itemsId_1, itemsList_1, getData, moidId_1, err_1, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, costumerName = _a.costumerName, costumerBirthdate = _a.costumerBirthdate, costumerCPF = _a.costumerCPF, holderNumber = _a.holderNumber, itemId = _a.itemId, eventId = _a.eventId, expirationMonth = _a.expirationMonth, email = _a.email, expirationYear = _a.expirationYear, cardNumber = _a.cardNumber, cvc = _a.cvc, fullName = _a.fullName, cpf = _a.cpf, birthdate = _a.birthdate, costumer = _a.costumer;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 2:
                        evento_1 = _c.sent();
                        if (!evento_1) {
                            return [2 /*return*/, res.status(409).json({ error: 'Could not find EventId!' })];
                        }
                        if (!(!expirationMonth || !expirationYear || !email || !cardNumber || !cvc || !fullName || !cpf || !birthdate)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(500).json({ error: "Missing card credential" })];
                    case 3:
                        _c.trys.push([3, 5, , 6]);
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 4:
                        user_1 = _c.sent();
                        if (!user_1) {
                            return [2 /*return*/, res.status(403).json({ error: 'Invalid User or You are a Host!' })];
                        }
                        itemRepo_1 = typeorm_1.getRepository(Item_1.default);
                        sair_1 = false;
                        itemId.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var itemAchado;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, itemRepo_1.findOne({ where: { id: item } })];
                                    case 1:
                                        itemAchado = _a.sent();
                                        if ((itemAchado === null || itemAchado === void 0 ? void 0 : itemAchado.event.id) != evento_1.id) {
                                            sair_1 = true;
                                            return [2 /*return*/, res.status(404).json({ error: 'One of itemId is not related to the same event' })];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (!sair_1) {
                            valorTotal_1 = 0;
                            itemsId_1 = [];
                            itemsList_1 = [];
                            getData = function () {
                                return Promise.all(itemId.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    var achado, data, timezone, b;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, itemRepo_1.findOne({ where: { id: item } }).catch(function () { })];
                                            case 1:
                                                achado = _a.sent();
                                                if (achado) {
                                                    if (achado.promocoes) {
                                                        if (achado.promocoes.valid) {
                                                            data = new Date();
                                                            timezone = data.getTimezoneOffset();
                                                            // timezone brasil = 180 
                                                            if (timezone != 180) {
                                                                b = 180 - timezone;
                                                                data.setMinutes(data.getMinutes() - b);
                                                            }
                                                            if (achado.promocoes.valid_until) {
                                                                if (item.promocoes.valid_until > data) {
                                                                    itemsList_1.push({
                                                                        product: achado.name,
                                                                        quantity: 1,
                                                                        detail: achado.description,
                                                                        price: Number(achado.app_price.toFixed(2).split('.').join(""))
                                                                    });
                                                                    valorTotal_1 += Number(achado.promocoes.price);
                                                                }
                                                                else {
                                                                    console.log("com promo");
                                                                    itemsList_1.push({
                                                                        product: achado.name,
                                                                        quantity: 1,
                                                                        detail: achado.description,
                                                                        price: Number(achado.promocoes.price.toFixed(2).split('.').join(""))
                                                                    });
                                                                    valorTotal_1 += Number(achado.promocoes.price);
                                                                }
                                                            }
                                                            else {
                                                                console.log("com promo");
                                                                itemsList_1.push({
                                                                    product: achado.name,
                                                                    quantity: 1,
                                                                    detail: achado.description,
                                                                    price: Number(achado.promocoes.price.toFixed(2).split('.').join(""))
                                                                });
                                                                valorTotal_1 += Number(achado.promocoes.price);
                                                            }
                                                        }
                                                        else {
                                                            itemsList_1.push({
                                                                product: achado.name,
                                                                quantity: 1,
                                                                detail: achado.description,
                                                                price: Number(achado.app_price.toFixed(2).split('.').join(""))
                                                            });
                                                            valorTotal_1 += achado.app_price;
                                                        }
                                                    }
                                                    else {
                                                        itemsList_1.push({
                                                            product: achado.name,
                                                            quantity: 1,
                                                            detail: achado.description,
                                                            price: Number(achado.app_price.toFixed(2).split('.').join(""))
                                                        });
                                                        valorTotal_1 += achado.app_price;
                                                    }
                                                    itemsId_1.push(item);
                                                }
                                                else {
                                                    sair_1 = true;
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }));
                            };
                            moidId_1 = "";
                            getData().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                var cpfCostumer, costumerBirth, costumerNameFinal, holderNumberFinal_1, idDaCompra_1;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(sair_1 == false)) return [3 /*break*/, 2];
                                            console.log('valor>> ', valorTotal_1);
                                            cpfCostumer = "";
                                            costumerBirth = "";
                                            costumerNameFinal = "";
                                            holderNumberFinal_1 = "";
                                            if (costumerCPF != null && costumerCPF != 'null') {
                                                console.log("tem holder cpf");
                                                cpfCostumer = String(costumerCPF).split('.').join("").split('-').join("");
                                            }
                                            else {
                                                console.log("nao tem holder cpf");
                                                cpfCostumer = String(cpf).split('.').join("").split('-').join("");
                                            }
                                            if (holderNumber != null && holderNumber != 'null') {
                                                console.log("tem holder number");
                                                holderNumberFinal_1 = holderNumber;
                                            }
                                            else {
                                                console.log("nao tem holer number");
                                                holderNumberFinal_1 = user_1.phone;
                                            }
                                            if (costumerBirthdate != null && costumerBirthdate != 'null') {
                                                console.log("tem costumer birthday");
                                                costumerBirth = costumerBirthdate;
                                            }
                                            else {
                                                console.log("nao tem costumer birthday");
                                                costumerBirth = birthdate;
                                            }
                                            if (costumerName != null && costumerName != 'null') {
                                                console.log("tem costumer name");
                                                costumerNameFinal = costumerName;
                                            }
                                            else {
                                                console.log("nao tem costumer name");
                                                costumerNameFinal = fullName;
                                            }
                                            idDaCompra_1 = uuidv4();
                                            console.log('>>>>> >> ', evento_1.host.moipId);
                                            return [4 /*yield*/, axios_1.default.post('https://sandbox.moip.com.br/v2/orders', {
                                                    "ownId": idDaCompra_1,
                                                    "items": itemsList_1,
                                                    "customer": {
                                                        "ownId": user_1.id,
                                                        "fullname": costumerNameFinal,
                                                        "email": email,
                                                        "taxDocument": {
                                                            "type": "CPF",
                                                            "number": cpfCostumer
                                                        },
                                                        "birthdate": costumerBirth,
                                                        "phone": {
                                                            "countryCode": user_1.phone.substring(0, 2),
                                                            "areaCode": user_1.phone.substring(2, 4),
                                                            "number": user_1.phone.substring(4)
                                                        }
                                                    },
                                                    "receivers": [
                                                        {
                                                            "type": "PRIMARY",
                                                            "feePayor": true,
                                                            "moipAccount": {
                                                                "id": evento_1.host.moipId
                                                            },
                                                            "amount": {
                                                                "percentual": 100
                                                            }
                                                        }
                                                    ]
                                                }, {
                                                    headers: {
                                                        "Authorization": "OAuth " + evento_1.host.accessToken,
                                                        "Content-Type": "application/json"
                                                    }
                                                }).then(function (data) {
                                                    console.log(data.data.id);
                                                    moidId_1 = data.data.id;
                                                    axios_1.default.post("https://sandbox.moip.com.br/v2/orders/" + data.data.id + "/payments", {
                                                        "installmentCount": 2,
                                                        "statementDescriptor": "" + String(evento_1.title).substr(0, 13),
                                                        "fundingInstrument": {
                                                            "method": "CREDIT_CARD",
                                                            "creditCard": {
                                                                "expirationMonth": expirationMonth,
                                                                "expirationYear": expirationYear,
                                                                "number": cardNumber,
                                                                "cvc": cvc,
                                                                "holder": {
                                                                    "fullname": fullName,
                                                                    "birthdate": birthdate,
                                                                    "taxDocument": {
                                                                        "type": "CPF",
                                                                        "number": String(cpf).split('.').join("").split('-').join("")
                                                                    },
                                                                    "phone": {
                                                                        "countryCode": holderNumberFinal_1.substring(0, 2),
                                                                        "areaCode": holderNumberFinal_1.substring(2, 4),
                                                                        "number": holderNumberFinal_1.substring(4)
                                                                    },
                                                                    "addresses": {
                                                                        "street": "Maj. Lopes",
                                                                        "streetNumber": "729",
                                                                        "city": "Belo Horizonte",
                                                                        "district": "São Pedro",
                                                                        "zipCode": "30330050",
                                                                        "state": "MG",
                                                                        "type": "SHIPPING",
                                                                        "country": "BRA"
                                                                    },
                                                                }
                                                            }
                                                        }
                                                    }, {
                                                        headers: {
                                                            "Authorization": "OAuth " + evento_1.host.accessToken,
                                                            "Content-Type": "application/json"
                                                        }
                                                    }).then(function (datinha) { return __awaiter(_this, void 0, void 0, function () {
                                                        var functionFinal;
                                                        var _this = this;
                                                        return __generator(this, function (_a) {
                                                            functionFinal = function () {
                                                                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                                    var _this = this;
                                                                    return __generator(this, function (_a) {
                                                                        axios_1.default.get("https://sandbox.moip.com.br/v2/orders/" + moidId_1, {
                                                                            headers: {
                                                                                "Authorization": "OAuth " + evento_1.host.accessToken,
                                                                                "Content-Type": "application/json"
                                                                            }
                                                                        }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                                            var compraRepo, compra_1, data_1, timezone, b;
                                                                            var _this = this;
                                                                            return __generator(this, function (_a) {
                                                                                switch (_a.label) {
                                                                                    case 0:
                                                                                        console.log(data.data.status);
                                                                                        if (!(data.data.status == "PAID")) return [3 /*break*/, 2];
                                                                                        console.log("ENTROU AQUI SIM!!!!");
                                                                                        compraRepo = typeorm_1.getRepository(Compra_1.default);
                                                                                        compra_1 = new Compra_1.default();
                                                                                        data_1 = new Date();
                                                                                        timezone = data_1.getTimezoneOffset();
                                                                                        // timezone brasil = 180 
                                                                                        if (timezone != 180) {
                                                                                            b = 180 - timezone;
                                                                                            data_1.setMinutes(data_1.getMinutes() - b);
                                                                                        }
                                                                                        compra_1.user = user_1,
                                                                                            compra_1.id = idDaCompra_1,
                                                                                            compra_1.event = evento_1,
                                                                                            compra_1.purchased_at = data_1,
                                                                                            compra_1.price = valorTotal_1,
                                                                                            compra_1.status = 'Aguardando',
                                                                                            compra_1.moipId = moidId_1;
                                                                                        return [4 /*yield*/, compraRepo.save(compra_1).catch(function (err) { return console.log('== Tentatvia', err); })
                                                                                            //console.log(compra.id) // PRONTO, CONSEGUI PEGAR O ID DA CMPRA GERADA
                                                                                        ];
                                                                                    case 1:
                                                                                        _a.sent();
                                                                                        //console.log(compra.id) // PRONTO, CONSEGUI PEGAR O ID DA CMPRA GERADA
                                                                                        itemId.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                                                            var achado, itemsGuardados, informacoes, current, cnt, i, quantosDevemSerRemovidos_1, itemWalletRepo, precoDoItem, data_2, timezone_1, b, itemWallet;
                                                                                            return __generator(this, function (_a) {
                                                                                                switch (_a.label) {
                                                                                                    case 0: return [4 /*yield*/, itemRepo_1.findOne({ where: { id: item } })
                                                                                                        // Aqui vai ver se tem quantidade para ser retirada!
                                                                                                    ];
                                                                                                    case 1:
                                                                                                        achado = _a.sent();
                                                                                                        if (!(achado === null || achado === void 0 ? void 0 : achado.quantity)) return [3 /*break*/, 3];
                                                                                                        itemsGuardados = itemId;
                                                                                                        informacoes = [];
                                                                                                        itemsGuardados.sort();
                                                                                                        current = null;
                                                                                                        cnt = 0;
                                                                                                        for (i = 0; i < itemsGuardados.length; i++) {
                                                                                                            if (itemsGuardados[i] != current) {
                                                                                                                if (cnt > 0) {
                                                                                                                    informacoes.push({ id: current, quantity: cnt });
                                                                                                                }
                                                                                                                current = itemsGuardados[i];
                                                                                                                cnt = 1;
                                                                                                            }
                                                                                                            else {
                                                                                                                cnt++;
                                                                                                            }
                                                                                                        }
                                                                                                        if (cnt > 0) {
                                                                                                            informacoes.push({ id: current, quantity: cnt });
                                                                                                        }
                                                                                                        quantosDevemSerRemovidos_1 = 0;
                                                                                                        // comparar o id (item) com a quantidade de vezes que ele eh repetido dentro do item ID
                                                                                                        informacoes.map(function (info) {
                                                                                                            if (info.id == item) {
                                                                                                                quantosDevemSerRemovidos_1 = info.quantity;
                                                                                                            }
                                                                                                        });
                                                                                                        // fazer achado.quantity -= quantidade de vezes que ele aparece!
                                                                                                        // console.log("removendo> ", quantosDevemSerRemovidos)
                                                                                                        achado.quantity = achado.quantity - quantosDevemSerRemovidos_1;
                                                                                                        return [4 /*yield*/, itemRepo_1.save(achado)];
                                                                                                    case 2:
                                                                                                        _a.sent();
                                                                                                        return [3 /*break*/, 3];
                                                                                                    case 3:
                                                                                                        itemWalletRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                                                                                                        precoDoItem = 0;
                                                                                                        if (achado === null || achado === void 0 ? void 0 : achado.promocoes) {
                                                                                                            if (achado.promocoes.valid) {
                                                                                                                if (achado.promocoes.valid_until) {
                                                                                                                    data_2 = new Date();
                                                                                                                    timezone_1 = data_2.getTimezoneOffset();
                                                                                                                    // timezone brasil = 180 
                                                                                                                    if (timezone_1 != 180) {
                                                                                                                        b = 180 - timezone_1;
                                                                                                                        data_2.setMinutes(data_2.getMinutes() - b);
                                                                                                                    }
                                                                                                                    if (achado.promocoes.valid_until > data_2) {
                                                                                                                        precoDoItem = Number(achado === null || achado === void 0 ? void 0 : achado.promocoes.price);
                                                                                                                    }
                                                                                                                    else {
                                                                                                                        precoDoItem = Number(achado === null || achado === void 0 ? void 0 : achado.app_price);
                                                                                                                    }
                                                                                                                }
                                                                                                                else {
                                                                                                                    precoDoItem = Number(achado === null || achado === void 0 ? void 0 : achado.promocoes.price);
                                                                                                                }
                                                                                                            }
                                                                                                            else {
                                                                                                                precoDoItem = Number(achado === null || achado === void 0 ? void 0 : achado.app_price);
                                                                                                            }
                                                                                                        }
                                                                                                        else {
                                                                                                            precoDoItem = Number(achado === null || achado === void 0 ? void 0 : achado.app_price);
                                                                                                        }
                                                                                                        itemWallet = itemWalletRepo.create({
                                                                                                            compra: compra_1,
                                                                                                            item: achado,
                                                                                                            user: user_1,
                                                                                                            price: precoDoItem,
                                                                                                            event: evento_1,
                                                                                                        });
                                                                                                        return [4 /*yield*/, itemWalletRepo.save(itemWallet).catch(function (err) { return console.log('= Tentativa falha de salvar items'); })];
                                                                                                    case 4:
                                                                                                        _a.sent();
                                                                                                        return [2 /*return*/];
                                                                                                }
                                                                                            });
                                                                                        }); });
                                                                                        return [2 /*return*/, res.json({ compra: compra_1 })];
                                                                                    case 2:
                                                                                        if (data.data.status == "NOT_PAID") {
                                                                                            return [2 /*return*/, res.status(500).json({ error: 'Not paid? ' })];
                                                                                        }
                                                                                        if (data.data.status == "WAITING") {
                                                                                            console.log('waiting... trying again');
                                                                                            functionFinal();
                                                                                        }
                                                                                        return [2 /*return*/];
                                                                                }
                                                                            });
                                                                        }); }).catch(function (err) {
                                                                            console.log('oi?');
                                                                        });
                                                                        return [2 /*return*/];
                                                                    });
                                                                }); }, 300);
                                                            };
                                                            functionFinal();
                                                            return [2 /*return*/];
                                                        });
                                                    }); }).catch(function (data) {
                                                        console.log(data.response.data);
                                                        console.log("error?");
                                                        return res.status(500).json({ error: 'Error? > catch' });
                                                    });
                                                }).catch(function (err) {
                                                    console.log(err.response.data.errors);
                                                    return res.status(500).json({ error: 'Error? > catch' });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [3 /*break*/, 3];
                                        case 2: return [2 /*return*/, res.status(500).json({ error: 'Error, leave catch' })];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (err) { return console.log('== Tentativa falha de salvar items!'); });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _c.sent();
                        console.log(err_1);
                        return [2 /*return*/, res.status(403).json({ error: 'Catch > Invalid UserId!' })];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        _b = _c.sent();
                        console.log('Invalid EventId! > not a uuid?');
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    CompraController.prototype.listItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            function getItems() {
                var _this = this;
                ArrayItems.map(function (itemId) { return __awaiter(_this, void 0, void 0, function () {
                    var item;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, itemRepo.findOne({ where: { id: itemId } })];
                            case 1:
                                item = _a.sent();
                                items.push(item);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            var id, userRepo, user, compraRepo, compras, ArrayItems, itemRepo, items;
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
                        compraRepo = typeorm_1.getRepository(Compra_1.default);
                        return [4 /*yield*/, compraRepo.find({ where: { user: user } })
                            ///////// GETTING EVERY ITEMS ID! 
                            // TODA VEZ Q PEGAR O ITEM ID, TEM Q CRIAR UMA NOVA ItemWallet, com esse ID, com o Id od usuairo
                            // TAMBEM COM O ID DESSA COMPRA!!!
                        ];
                    case 2:
                        compras = _a.sent();
                        ArrayItems = [];
                        compras.map(function (compra) {
                            console.log(compra);
                            var Items = [""];
                            Items.map(function (item) {
                                ArrayItems.push(item);
                            });
                        });
                        itemRepo = typeorm_1.getRepository(Item_1.default);
                        items = [];
                        getItems();
                        console.log(items);
                        return [2 /*return*/, res.json({ items: items })];
                }
            });
        });
    };
    CompraController.prototype.refound = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, refounds, userRepo, user, itemsCompradosRepo, itemsComprados, eventHost_1, itemsRetiraveisArray_1, itemsParaReembolso_1, comprasMoipIdCheio_1, comprasMoipId, comprasComValor_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        refounds = req.body.refounds;
                        if (!refounds) return [3 /*break*/, 5];
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        itemsCompradosRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                        return [4 /*yield*/, itemsCompradosRepo.find({ where: { user: user } })];
                    case 2:
                        itemsComprados = _a.sent();
                        eventHost_1 = {};
                        itemsRetiraveisArray_1 = [];
                        console.log("chegou aqui");
                        itemsComprados.map(function (itemzinho) {
                            eventHost_1 = (itemzinho.item.event.host);
                            //  console.log(itemzinho)
                            if (itemzinho.retirado) {
                                if (itemzinho.retirado.retirado_at) {
                                }
                                else {
                                    if (itemzinho.refund) {
                                    }
                                    else {
                                        itemsRetiraveisArray_1.push({
                                            id: itemzinho.id,
                                            itemId: itemzinho.item.id,
                                            itemPrice: itemzinho.price,
                                            compraId: itemzinho.compra.id,
                                            compraMoipId: itemzinho.compra.moipId,
                                            purchased_at: itemzinho.compra.purchased_at
                                        });
                                    }
                                }
                            }
                            else {
                                if (itemzinho.refund) {
                                }
                                else {
                                    eventHost_1 = (itemzinho.item.event.host);
                                    itemsRetiraveisArray_1.push({
                                        id: itemzinho.id,
                                        itemId: itemzinho.item.id,
                                        itemPrice: itemzinho.price,
                                        compraId: itemzinho.compra.id,
                                        compraMoipId: itemzinho.compra.moipId,
                                        purchased_at: itemzinho.compra.purchased_at
                                    });
                                }
                            }
                        });
                        itemsRetiraveisArray_1.sort(function (a, b) { return (a.purchased_at < b.purchased_at) ? -1 : ((a.time > b.time) ? 1 : 0); });
                        itemsParaReembolso_1 = [];
                        refounds.map(function (item) {
                            // console.log(item)
                            var j = 0;
                            while (j < itemsRetiraveisArray_1.length) {
                                if (itemsRetiraveisArray_1[j].itemId == item) {
                                    itemsParaReembolso_1.push(itemsRetiraveisArray_1[j]);
                                    itemsRetiraveisArray_1.splice(j, 1);
                                    break;
                                }
                                j += 1;
                            }
                        });
                        // console.log(itemsParaReembolso)
                        if (itemsParaReembolso_1.length == 0) {
                            return [2 /*return*/, res.status(500).json({ error: 'You dont have this item to refound!' })];
                        }
                        else {
                            comprasMoipIdCheio_1 = [];
                            itemsParaReembolso_1.map(function (item) {
                                comprasMoipIdCheio_1.push(item.compraMoipId);
                            });
                            comprasMoipId = comprasMoipIdCheio_1.filter(function (este, i) { return comprasMoipIdCheio_1.indexOf(este) === i; });
                            comprasComValor_1 = [];
                            comprasMoipId.map(function (item, index) {
                                var valorTotal = 0;
                                var arrayComId = [];
                                itemsParaReembolso_1.map(function (itemzinho) {
                                    if (item == itemzinho.compraMoipId) {
                                        // console.log(itemzinho)
                                        valorTotal += itemzinho.itemPrice;
                                        arrayComId.push(itemzinho.id);
                                    }
                                });
                                comprasComValor_1.push({
                                    moipId: item,
                                    reembolsoTotal: valorTotal,
                                    arrayComId: arrayComId
                                });
                            });
                            comprasComValor_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(item.moipId);
                                            return [4 /*yield*/, axios_1.default.post("https://sandbox.moip.com.br/v2/payments/" + item.moipId + "/refunds", {
                                                    "amount": Number(item.reembolsoTotal.toFixed(2).split('.').join(""))
                                                }, {
                                                    headers: {
                                                        "Authorization": "OAuth " + eventHost_1.accessToken,
                                                        "Content-Type": "application/json"
                                                    }
                                                }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
                                                    var itemWalletRepo, refundRepo, refundCreate, dataRefund, timezone, b;
                                                    var _this = this;
                                                    return __generator(this, function (_a) {
                                                        itemWalletRepo = typeorm_1.getRepository(Items_Comprados_1.default);
                                                        console.log("deu then na moip");
                                                        refundRepo = typeorm_1.getRepository(Refund_1.default);
                                                        refundCreate = new Refund_1.default();
                                                        dataRefund = new Date();
                                                        timezone = dataRefund.getTimezoneOffset();
                                                        // timezone brasil = 180 
                                                        if (timezone != 180) {
                                                            b = 180 - timezone;
                                                            data.setMinutes(data.getMinutes() - b);
                                                        }
                                                        refundCreate.created_at = dataRefund;
                                                        refundRepo.save(refundCreate);
                                                        item.arrayComId.map(function (itemzinho) { return __awaiter(_this, void 0, void 0, function () {
                                                            var itemWallet;
                                                            return __generator(this, function (_a) {
                                                                switch (_a.label) {
                                                                    case 0: return [4 /*yield*/, itemWalletRepo.findOne({ where: { id: itemzinho } })];
                                                                    case 1:
                                                                        itemWallet = _a.sent();
                                                                        if (itemWallet) {
                                                                            itemWallet.refund = refundCreate;
                                                                            itemWalletRepo.save(itemWallet);
                                                                            console.log('foi');
                                                                        }
                                                                        return [2 /*return*/];
                                                                }
                                                            });
                                                        }); });
                                                        return [2 /*return*/, res.json({ ok: true })];
                                                    });
                                                }); }).catch(function (err) {
                                                    console.log("Deu erro no refound moip!");
                                                    console.log(err);
                                                    console.log(err.response.data.errors);
                                                    return res.status(500).json({ error: true });
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            console.log(comprasComValor_1);
                        }
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, res.status(403).json({ error: 'You are a host!' })];
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, res.status(500).json({ error: 'Did not mention refound body' })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CompraController;
}());
exports.default = new CompraController();
