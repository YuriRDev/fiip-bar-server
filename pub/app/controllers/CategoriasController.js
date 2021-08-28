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
var CategoriaController = /** @class */ (function () {
    function CategoriaController() {
    }
    CategoriaController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, barId, name, barRepo, bar, hostRepo, host, categoriasRepo, categorias, categoria, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, barId = _a.barId, name = _a.name;
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 10, , 11]);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 2:
                        bar = _c.sent();
                        if (!bar) return [3 /*break*/, 8];
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({
                                where: { id: id }
                            })];
                    case 3:
                        host = _c.sent();
                        if (!((host === null || host === void 0 ? void 0 : host.id) == (bar === null || bar === void 0 ? void 0 : bar.host.id))) return [3 /*break*/, 6];
                        categoriasRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoriasRepo.find({
                                where: { bar: bar }
                            })];
                    case 4:
                        categorias = _c.sent();
                        console.log(categorias.length);
                        categoria = new Categorias_1.default();
                        categoria.name = name;
                        categoria.bar = bar;
                        categoria.index = categorias.length;
                        return [4 /*yield*/, categoriasRepo.save(categoria)];
                    case 5:
                        _c.sent();
                        return [2 /*return*/, res.json({
                                id: categoria.id,
                                name: categoria.name,
                                index: categoria.index
                            })];
                    case 6: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this bar'
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8: return [2 /*return*/, res.status(404).json({
                            error: 'Bar not found'
                        })];
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(404).json({
                                error: 'Bar not found'
                            })];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaController.prototype.list = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, barId, barRepo, bar, categoriaRepo, categorias_1, categoriaTotal_1, getInfo, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        barId = req.body.barId;
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 2:
                        bar = _b.sent();
                        if (!bar) return [3 /*break*/, 6];
                        if (!(bar.host.id == id)) return [3 /*break*/, 4];
                        console.log("eh o host!");
                        categoriaRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoriaRepo.find({
                                where: { bar: bar }, select: ['id', 'name', 'index']
                            })
                            // listando a quantidade de items que tem na categoria
                        ];
                    case 3:
                        categorias_1 = _b.sent();
                        // listando a quantidade de items que tem na categoria
                        categorias_1.sort(function (a, b) { return (a.index > b.index) ? 1 : -1; });
                        categoriaTotal_1 = [];
                        getInfo = function () {
                            return (Promise.all(categorias_1.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var itemRepo, items;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            itemRepo = typeorm_1.getRepository(Items_1.default);
                                            return [4 /*yield*/, itemRepo.find({
                                                    where: { categoria: { id: item.id } }
                                                })];
                                        case 1:
                                            items = _a.sent();
                                            categoriaTotal_1.push({
                                                id: item.id,
                                                name: item.name,
                                                index: item.index,
                                                items: items.length,
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            }); })));
                        };
                        getInfo().then(function () {
                            categoriaTotal_1.sort(function (a, b) { return (a.index > b.index) ? 1 : -1; });
                            return res.json(categoriaTotal_1);
                        }).catch(function () {
                            return res.status(505).json({
                                error: "Error Inesperado listando categorias"
                            });
                        });
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this bar!'
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(404).json({
                            error: 'Invalid Bar Id!'
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({
                                error: 'Invalid Bar Id!'
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaController.prototype.changeIndex = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, barId, categoriasIndex, barRepo, bar, categoriaRepo, categorias, lengthTotal, todosSaoUuid_1, ehHostDeCadaItem_1, categoriaRepo_1, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, barId = _a.barId, categoriasIndex = _a.categoriasIndex;
                        barRepo = typeorm_1.getRepository(Bars_1.default);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, barRepo.findOne({
                                where: { id: barId }
                            })];
                    case 2:
                        bar = _c.sent();
                        if (!bar) return [3 /*break*/, 6];
                        if (!(bar.host.id == id)) return [3 /*break*/, 4];
                        console.log("eh o host!");
                        categoriaRepo = typeorm_1.getRepository(Categorias_1.default);
                        return [4 /*yield*/, categoriaRepo.find({
                                where: { bar: bar }, select: ['id', 'name', 'index']
                            })];
                    case 3:
                        categorias = _c.sent();
                        lengthTotal = categorias.length;
                        if (Array.isArray(categoriasIndex)) {
                            todosSaoUuid_1 = true;
                            categoriasIndex.map(function (item) {
                                if (!uuid_1.validate(item)) {
                                    todosSaoUuid_1 = false;
                                }
                            });
                            if (todosSaoUuid_1) {
                                if (categoriasIndex.length == lengthTotal) {
                                    ehHostDeCadaItem_1 = true;
                                    categoriaRepo_1 = typeorm_1.getRepository(Categorias_1.default);
                                    Promise.all(categoriasIndex.map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                        var categoriaAchada;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, categoriaRepo_1.findOne({
                                                        where: { id: item }
                                                    })];
                                                case 1:
                                                    categoriaAchada = _a.sent();
                                                    if ((categoriaAchada === null || categoriaAchada === void 0 ? void 0 : categoriaAchada.bar.host.id) != id) {
                                                        ehHostDeCadaItem_1 = false;
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })).then(function () { return __awaiter(_this, void 0, void 0, function () {
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            if (ehHostDeCadaItem_1) {
                                                // agora eh setar o novo array 
                                                Promise.all(categoriasIndex.map(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                                                    var categoriaAchada;
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0: return [4 /*yield*/, categoriaRepo_1.findOne({
                                                                    where: { id: item }
                                                                })];
                                                            case 1:
                                                                categoriaAchada = _a.sent();
                                                                if (!categoriaAchada) return [3 /*break*/, 3];
                                                                categoriaAchada.index = index;
                                                                return [4 /*yield*/, categoriaRepo_1.save(categoriaAchada)];
                                                            case 2:
                                                                _a.sent();
                                                                _a.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })).then(function () {
                                                    return res.json({
                                                        updated: true
                                                    });
                                                }).catch(function () {
                                                    return res.status(503).json({
                                                        error: 'Error desconhecido'
                                                    });
                                                });
                                            }
                                            else {
                                                return [2 /*return*/, res.status(403).json({
                                                        error: 'You are not the host for one/more categories'
                                                    })];
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); }).catch(function () {
                                        return res.status(503).json({
                                            error: 'Error desconhecido'
                                        });
                                    });
                                }
                                else {
                                    return [2 /*return*/, res.status(500).json({
                                            error: 'Length must be the same at categories length'
                                        })];
                                }
                            }
                            else {
                                res.status(500).json({
                                    error: 'CategoriasIndex must be array of UUID'
                                });
                            }
                        }
                        else {
                            return [2 /*return*/, res.status(503).json({
                                    error: "categoriasIndex must be array"
                                })];
                        }
                        return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this bar!'
                        })];
                    case 5: return [3 /*break*/, 7];
                    case 6: return [2 /*return*/, res.status(404).json({
                            error: 'Invalid Bar Id!'
                        })];
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(404).json({
                                error: 'Invalid Bar Id!'
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    CategoriaController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, categoryId, categoryRepo_1, categoria_1, itemsRepo_1, itemsAchados, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        categoryId = req.body.categoryId;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 13, , 14]);
                        categoryRepo_1 = typeorm_1.getRepository(Categorias_1.default);
                        if (!uuid_1.validate(categoryId)) return [3 /*break*/, 11];
                        return [4 /*yield*/, categoryRepo_1.findOne({
                                where: { id: categoryId }
                            })];
                    case 2:
                        categoria_1 = _b.sent();
                        if (!categoria_1) return [3 /*break*/, 9];
                        if (!(categoria_1.bar.host.id == id)) return [3 /*break*/, 7];
                        itemsRepo_1 = typeorm_1.getRepository(Items_1.default);
                        return [4 /*yield*/, itemsRepo_1.find({
                                where: { categoria: categoria_1 }
                            })];
                    case 3:
                        itemsAchados = _b.sent();
                        if (!(itemsAchados.length == 0)) return [3 /*break*/, 5];
                        console.log("ok, deletando...");
                        return [4 /*yield*/, categoryRepo_1.delete(categoria_1)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.json({
                                deleted: true
                            })];
                    case 5:
                        console.log("deletando todos os lenghts");
                        Promise.all(itemsAchados.map(function (item) {
                            itemsRepo_1.delete(item);
                        })).then(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, categoryRepo_1.delete(categoria_1)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/, res.json({
                                                deleted: true
                                            })];
                                }
                            });
                        }); }).catch(function () {
                            console.log("error desconhecido!");
                        });
                        _b.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, res.status(403).json({
                            error: 'You are not the host for this category'
                        })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(404).json({
                            error: 'Invalid Category'
                        })];
                    case 10: return [3 /*break*/, 12];
                    case 11: return [2 /*return*/, res.status(504).json({
                            error: 'CategoryId must be a UUID'
                        })];
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        _a = _b.sent();
                        return [2 /*return*/, res.status(404).json({
                                error: 'Invalid Bar Id!'
                            })];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    return CategoriaController;
}());
exports.default = new CategoriaController();
