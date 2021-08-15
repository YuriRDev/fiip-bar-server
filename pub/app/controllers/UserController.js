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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User_1 = __importDefault(require("../models/User"));
var Tokens_1 = __importDefault(require("../models/Tokens"));
var Events_1 = __importDefault(require("../models/Events"));
var secret_1 = __importDefault(require("../../secret"));
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, number, code, userRepo, user, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, number = _a.number, code = _a.code;
                        if (!(!number || !code)) return [3 /*break*/, 1];
                        return [2 /*return*/, res.status(403).json({ error: 'Missing number or code' })];
                    case 1:
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { phone: String(number) } })];
                    case 2:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(403).json({ error: "Number not found!" })];
                    case 3:
                        if (!(user.code != "")) return [3 /*break*/, 9];
                        if (!(user.tried >= 5)) return [3 /*break*/, 4];
                        return [2 /*return*/, res.status(403).json({ error: 'Tried too many times' })];
                    case 4:
                        if (!(code != user.code)) return [3 /*break*/, 6];
                        user.tried = user.tried + 1;
                        return [4 /*yield*/, userRepo.save(user)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.status(403).json({ error: "Wrong code!" })];
                    case 6:
                        user.code = '';
                        return [4 /*yield*/, userRepo.save(user)];
                    case 7:
                        _b.sent();
                        token = jsonwebtoken_1.default.sign({ id: user.id }, String(secret_1.default), { expiresIn: '365d' });
                        return [2 /*return*/, res.json({ number: user.phone, token: token })];
                    case 8: return [3 /*break*/, 10];
                    case 9: return [2 /*return*/, res.status(403).json({ error: 'Wrong code' })];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.join = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var number, userRepo, usuarioAchado, randomNumber, data, timezone, b, user, data, timezone, b;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        number = req.body.number;
                        if (!number) return [3 /*break*/, 7];
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { phone: String(number) } })
                            /// RANDOM NUMBER AQUI << DESABILITAR QUANDO FOR BETA TEST!!!!
                            //const randomNumber = String((Math.floor(100000 + Math.random() * 900000)));
                        ];
                    case 1:
                        usuarioAchado = _a.sent();
                        randomNumber = "000000";
                        if (!!usuarioAchado) return [3 /*break*/, 3];
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        user = userRepo.create({ phone: String(number), code: randomNumber, tried: 0, created_at: data, sended_at: data });
                        return [4 /*yield*/, userRepo.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({ sended: true })];
                    case 3:
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        if (!(usuarioAchado.sended_at.getMinutes() == data.getMinutes())) return [3 /*break*/, 4];
                        res.status(405).json({ error: 'Sending too many sms requests!' });
                        return [3 /*break*/, 6];
                    case 4:
                        usuarioAchado.sended_at = data;
                        usuarioAchado.tried = 0;
                        usuarioAchado.code = randomNumber;
                        return [4 /*yield*/, userRepo.save(usuarioAchado)];
                    case 5:
                        _a.sent();
                        res.json({ sended: true });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        res.status(500).json({ error: 'Invalid Number!' });
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.token = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, tokenRepo, tokenFounded, data, timezone, b, novoToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = req.body.token;
                        if (!token) {
                            return [2 /*return*/, res.status(500).json({ error: 'Empty token' })];
                        }
                        if (!token) return [3 /*break*/, 4];
                        tokenRepo = typeorm_1.getRepository(Tokens_1.default);
                        return [4 /*yield*/, tokenRepo.findOne({ where: { token: token } })];
                    case 1:
                        tokenFounded = _a.sent();
                        if (!tokenFounded) return [3 /*break*/, 2];
                        return [2 /*return*/, res.json({ founded: true })];
                    case 2:
                        data = new Date();
                        timezone = data.getTimezoneOffset();
                        // timezone brasil = 180 
                        if (timezone != 180) {
                            b = 180 - timezone;
                            data.setMinutes(data.getMinutes() - b);
                        }
                        novoToken = tokenRepo.create({
                            token: token,
                            created_at: data,
                        });
                        return [4 /*yield*/, tokenRepo.save(novoToken)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ founded: true })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.eventJoin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, eventId, expoPushToken, leaving, userRepo, eventRepo, user, user, evento, tokenRepo, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.userId;
                        _a = req.body, eventId = _a.eventId, expoPushToken = _a.expoPushToken, leaving = _a.leaving;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        eventRepo = typeorm_1.getRepository(Events_1.default);
                        console.log("here!");
                        if (!(leaving == true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _b.sent();
                        user.event = null;
                        console.log("leaving");
                        return [4 /*yield*/, userRepo.save(user)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.json({ ok: true })];
                    case 3: return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 4:
                        user = _b.sent();
                        console.log("user>>");
                        console.log(user);
                        return [4 /*yield*/, eventRepo.findOne({ where: { id: eventId } })];
                    case 5:
                        evento = _b.sent();
                        if (!(user && evento)) return [3 /*break*/, 10];
                        user.event = evento;
                        return [4 /*yield*/, userRepo.save(user)];
                    case 6:
                        _b.sent();
                        if (!expoPushToken) return [3 /*break*/, 9];
                        console.log('expo push!');
                        tokenRepo = typeorm_1.getRepository(Tokens_1.default);
                        return [4 /*yield*/, tokenRepo.findOne({ where: { token: expoPushToken } })];
                    case 7:
                        token = _b.sent();
                        if (!(token && !(token === null || token === void 0 ? void 0 : token.user))) return [3 /*break*/, 9];
                        token.user = user === null || user === void 0 ? void 0 : user.id;
                        return [4 /*yield*/, tokenRepo.save(token)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2 /*return*/, res.json({ user: user })];
                    case 10:
                        console.log("user or event not found!");
                        return [2 /*return*/, res.status(505).json({ error: 'User / event NOT FOUND' })];
                }
            });
        });
    };
    UserController.prototype.leaveEvent = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userRepo, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Quando clica em entrar no evento, vai 
                        // ser o gatilho para juntar o UserId com o Token de notificacao
                        console.log("leaving!");
                        id = req.userId;
                        userRepo = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, userRepo.findOne({ where: { id: id } })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        user.event = null;
                        return [4 /*yield*/, userRepo.save(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.json({ ok: true })];
                    case 3: return [2 /*return*/, res.json({ error: 'Invalid User' })];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
