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
var Bartender_1 = __importDefault(require("../models/Bartender"));
var BartenderController = /** @class */ (function () {
    function BartenderController() {
    }
    BartenderController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, bartenderName, hostRepo, host, randomKey, randomPass, bartHost, existeKey, bartender, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        bartenderName = req.body.bartenderName;
                        if (!bartenderName) {
                            return [2 /*return*/, res.status(403).json({ error: 'Missing bartenderName!' })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 2:
                        host = _a.sent();
                        if (!!host) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(404).json({ error: 'Invalid hostId!' })];
                    case 3:
                        randomKey = Math.random().toString(36).substring(2, 10).toUpperCase();
                        randomPass = Math.random().toString(36).substring(2, 10).toUpperCase();
                        bartHost = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartHost.findOne({ where: { key: randomKey } })];
                    case 4:
                        existeKey = _a.sent();
                        if (existeKey) {
                            randomKey = Math.random().toString(36).substring(2, 10).toUpperCase();
                        }
                        bartender = bartHost.create({
                            host: host,
                            key: randomKey,
                            name: bartenderName,
                            password: randomPass,
                            active: true,
                        });
                        return [4 /*yield*/, bartHost.save(bartender)];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, res.json({ bartender: bartender })];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid EventID!' })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BartenderController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, bartRepo, bartenders, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartRepo.find({ where: { host: id } })];
                    case 2:
                        bartenders = _a.sent();
                        return [2 /*return*/, res.json(bartenders)];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid EventID!' })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BartenderController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, bartenderId, bartRepo, bartender, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        bartenderId = req.body.bartenderId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartRepo.findOne({ where: { id: bartenderId } })];
                    case 2:
                        bartender = _b.sent();
                        if (!bartender) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid bartender Id!' })];
                        }
                        if (!(bartender.host.id == id)) return [3 /*break*/, 4];
                        bartender.active = false;
                        return [4 /*yield*/, bartRepo.save(bartender)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.json({ inactive: true })];
                    case 4: return [2 /*return*/, res.json({ error: true })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid Bartender Id!' })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    BartenderController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, bartenderId, name, password, bartRepo, bartender, bartenderNotSync, eventFromBartender, eventId, eventRepo, evento, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, bartenderId = _a.bartenderId, name = _a.name, password = _a.password;
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, bartRepo.findOne({ where: { id: bartenderId } })];
                    case 2:
                        bartender = _c.sent();
                        return [4 /*yield*/, bartRepo.findOne({ where: { id: bartenderId } })];
                    case 3:
                        bartenderNotSync = _c.sent();
                        if (!bartender) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid bartender Id!' })];
                        }
                        return [4 /*yield*/, (bartender === null || bartender === void 0 ? void 0 : bartender.event)];
                    case 4:
                        eventFromBartender = _c.sent();
                        eventId = eventFromBartender === null || eventFromBartender === void 0 ? void 0 : eventFromBartender.id;
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 5:
                        evento = _c.sent();
                        if ((evento === null || evento === void 0 ? void 0 : evento.host.id) != id) {
                            return [2 /*return*/, res.status(403).json({ error: "You are not the host for this event!" })];
                        }
                        // verificar se o hostId eh igual o id 
                        // Editar agora
                        if (!bartenderNotSync) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid BartenderNotSync Id!' })];
                        }
                        bartenderNotSync.name = name || (bartenderNotSync === null || bartenderNotSync === void 0 ? void 0 : bartenderNotSync.name);
                        bartenderNotSync.password = password || (bartenderNotSync === null || bartenderNotSync === void 0 ? void 0 : bartenderNotSync.password);
                        return [4 /*yield*/, bartRepo.save(bartenderNotSync)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, res.json(bartenderNotSync)];
                    case 7:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid Bartender Id!' })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    BartenderController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, key, password, bartenderRepo, bartender;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, key = _a.key, password = _a.password;
                        if (!key || !password) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing key or password!' })];
                        }
                        bartenderRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartenderRepo.findOne({ where: { key: key } })];
                    case 1:
                        bartender = _b.sent();
                        if (!bartender) {
                            return [2 /*return*/, res.status(403).json({ error: 'Invalid Key!' })];
                        }
                        if (bartender)
                            if (bartender.password != password) {
                                return [2 /*return*/, res.status(403).json({ error: 'Invalid Password!' })];
                            }
                        return [2 /*return*/, res.json(bartender)];
                }
            });
        });
    };
    BartenderController.prototype.renew = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, bartenderId, bartRepo, bartender, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        bartenderId = req.body.bartenderId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, , 7]);
                        bartRepo = typeorm_1.getRepository(Bartender_1.default);
                        return [4 /*yield*/, bartRepo.findOne({ where: { id: bartenderId } })];
                    case 2:
                        bartender = _b.sent();
                        if (!bartender) {
                            return [2 /*return*/, res.status(404).json({ error: 'Invalid bartender Id!' })];
                        }
                        if (!(bartender.host.id == id)) return [3 /*break*/, 4];
                        bartender.active = true;
                        return [4 /*yield*/, bartRepo.save(bartender)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.json({ active: true })];
                    case 4: return [2 /*return*/, res.json({ error: true })];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({ error: 'Catch > Invalid Bartender Id!' })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return BartenderController;
}());
exports.default = new BartenderController();
