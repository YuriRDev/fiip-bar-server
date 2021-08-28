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
var BarsController = /** @class */ (function () {
    function BarsController() {
    }
    BarsController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, title, description, address, open, color, photo_url, type, hostRepo, host, foto, barRepo, posts, barRepo_1, bar, dataAgora, timezone, b;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, title = _a.title, description = _a.description, address = _a.address, open = _a.open, color = _a.color, photo_url = _a.photo_url, type = _a.type;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        host = _b.sent();
                        if (!host) return [3 /*break*/, 5];
                        if (!(!title || !description || !address || !open || !color || !type)) return [3 /*break*/, 2];
                        return [2 /*return*/, res.status(505).json({
                                error: 'Missing params'
                            })];
                    case 2:
                        foto = "";
                        if (photo_url) {
                            foto = photo_url;
                        }
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        return [4 /*yield*/, barRepo.createQueryBuilder("bares")
                                .where("LOWER(bares.title) = LOWER(:title)", { title: title })
                                .getMany()];
                    case 3:
                        posts = _b.sent();
                        if (posts.length > 0) {
                            return [2 /*return*/, res.status(505).json({
                                    error: 'Bar Title already in use'
                                })];
                        }
                        else {
                            // vendo se o open tem 7 de length
                            if (open.length == 7) {
                                // vendo se o color eh uma cor verdadeira
                                if (String(color)[0] == "#") {
                                    // verificando o length do title >= 5
                                    if (title.length >= 5) {
                                        barRepo_1 = typeorm_1.getRepository(Bars_1.default);
                                        bar = new Bars_1.default();
                                        dataAgora = new Date();
                                        timezone = dataAgora.getTimezoneOffset();
                                        // timezone brasil = 180 
                                        if (timezone != 180) {
                                            b = 180 - timezone;
                                            dataAgora.setMinutes(dataAgora.getMinutes() - b);
                                        }
                                        bar.title = title;
                                        bar.description = description;
                                        bar.address = address;
                                        bar.open = JSON.stringify(open);
                                        bar.color = color;
                                        bar.photo_url = foto;
                                        bar.active = true;
                                        bar.created_at = dataAgora;
                                        bar.host = host;
                                        bar.type = type;
                                        barRepo_1.save(bar);
                                        return [2 /*return*/, res.json({
                                                created: true,
                                                id: bar.id,
                                                title: bar.title,
                                                address: bar.address,
                                                color: bar.color,
                                                created_at: bar.created_at,
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(505).json({
                                                error: 'Title lenght must be >= 5'
                                            })];
                                    }
                                }
                                else {
                                    return [2 /*return*/, res.status(505).json({
                                            error: 'Invalid Color format, must contain #'
                                        })];
                                }
                            }
                            else {
                                return [2 /*return*/, res.status(505).json({
                                        error: 'Invalid Open format'
                                    })];
                            }
                        }
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, res.status(403).json({
                            error: 'Invalid HostID!'
                        })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BarsController.prototype.getByName = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var name, barRepo, bar, dataAgora_1, timezone, b, diaAgora_1, diasAberto, barAberto_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = req.body.name;
                        if (!name) return [3 /*break*/, 2];
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        return [4 /*yield*/, barRepo.createQueryBuilder("bares")
                                .where("LOWER(bares.title) = LOWER(:title)", { title: name })
                                .getOne()];
                    case 1:
                        bar = _a.sent();
                        if (bar) {
                            dataAgora_1 = new Date();
                            timezone = dataAgora_1.getTimezoneOffset();
                            // timezone brasil = 180 
                            if (timezone != 180) {
                                b = 180 - timezone;
                                dataAgora_1.setMinutes(dataAgora_1.getMinutes() - b);
                            }
                            diaAgora_1 = dataAgora_1.getDay();
                            diasAberto = JSON.parse(bar.open);
                            barAberto_1 = false;
                            diasAberto.map(function (item) {
                                if (item.dia == diaAgora_1) {
                                    item.aberto.map(function (dia) {
                                        var setarHoraInicio = Number(dia.split(' - ')[0].split(':')[0]);
                                        var setarMinutoInicio = Number(dia.split(' - ')[0].split(':')[1]);
                                        var setarHoraFinal = Number(dia.split(' - ')[1].split(':')[0]);
                                        var setarMinutoFinal = Number(dia.split(' - ')[1].split(':')[1]);
                                        if ((dataAgora_1.getHours() >= setarHoraInicio) && (dataAgora_1.getHours() <= setarHoraFinal)) {
                                            if (dataAgora_1.getHours() == setarHoraInicio) {
                                                if (dataAgora_1.getMinutes() >= setarMinutoInicio) {
                                                    barAberto_1 = true;
                                                }
                                                else {
                                                    barAberto_1 = false;
                                                }
                                            }
                                            if (dataAgora_1.getHours() == setarHoraFinal) {
                                                if (dataAgora_1.getMinutes() <= setarMinutoFinal) {
                                                    barAberto_1 = true;
                                                }
                                                else {
                                                    barAberto_1 = false;
                                                }
                                            }
                                            barAberto_1 = true;
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/, res.json({
                                    id: bar.id,
                                    title: bar.title,
                                    description: bar.title,
                                    address: bar.address,
                                    open: barAberto_1,
                                    color: bar.color,
                                    photo_url: bar.photo_url,
                                    type: bar.type,
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({
                                    error: 'Bar not found'
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(404).json({
                            error: 'Missing params'
                        })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BarsController.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, barRepo, bar, dataAgora_2, timezone, b, diaAgora_2, diasAberto, barAberto_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        if (!id) return [3 /*break*/, 2];
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: id }
                            })];
                    case 1:
                        bar = _a.sent();
                        if (bar) {
                            dataAgora_2 = new Date();
                            timezone = dataAgora_2.getTimezoneOffset();
                            // timezone brasil = 180 
                            if (timezone != 180) {
                                b = 180 - timezone;
                                dataAgora_2.setMinutes(dataAgora_2.getMinutes() - b);
                            }
                            diaAgora_2 = dataAgora_2.getDay();
                            diasAberto = JSON.parse(bar.open);
                            barAberto_2 = false;
                            diasAberto.map(function (item) {
                                if (item.dia == diaAgora_2) {
                                    item.aberto.map(function (dia) {
                                        var setarHoraInicio = Number(dia.split(' - ')[0].split(':')[0]);
                                        var setarMinutoInicio = Number(dia.split(' - ')[0].split(':')[1]);
                                        var setarHoraFinal = Number(dia.split(' - ')[1].split(':')[0]);
                                        var setarMinutoFinal = Number(dia.split(' - ')[1].split(':')[1]);
                                        if ((dataAgora_2.getHours() >= setarHoraInicio) && (dataAgora_2.getHours() <= setarHoraFinal)) {
                                            if (dataAgora_2.getHours() == setarHoraInicio) {
                                                if (dataAgora_2.getMinutes() >= setarMinutoInicio) {
                                                    barAberto_2 = true;
                                                }
                                                else {
                                                    barAberto_2 = false;
                                                }
                                            }
                                            if (dataAgora_2.getHours() == setarHoraFinal) {
                                                if (dataAgora_2.getMinutes() <= setarMinutoFinal) {
                                                    barAberto_2 = true;
                                                }
                                                else {
                                                    barAberto_2 = false;
                                                }
                                            }
                                            barAberto_2 = true;
                                        }
                                    });
                                }
                            });
                            return [2 /*return*/, res.json({
                                    id: bar.id,
                                    title: bar.title,
                                    description: bar.title,
                                    address: bar.address,
                                    open: barAberto_2,
                                    color: bar.color,
                                    photo_url: bar.photo_url,
                                    type: bar.type,
                                })];
                        }
                        else {
                            return [2 /*return*/, res.status(404).json({
                                    error: 'Bar not found'
                                })];
                        }
                        return [3 /*break*/, 3];
                    case 2: return [2 /*return*/, res.status(404).json({
                            error: 'Missing params'
                        })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BarsController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host, barRepo, bares;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({
                                where: { id: id }
                            })];
                    case 1:
                        host = _a.sent();
                        if (!host) return [3 /*break*/, 3];
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        return [4 /*yield*/, barRepo.find({
                                where: { host: host }, select: ['id', 'title', 'photo_url', 'active']
                            })];
                    case 2:
                        bares = _a.sent();
                        return [2 /*return*/, res.json(bares)];
                    case 3: return [2 /*return*/, res.status(403).json({
                            error: 'you are not a host'
                        })];
                }
            });
        });
    };
    return BarsController;
}());
exports.default = new BarsController();
