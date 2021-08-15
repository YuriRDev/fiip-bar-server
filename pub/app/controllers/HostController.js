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
var Tokens_1 = __importDefault(require("../models/Tokens"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var expo_server_sdk_1 = require("expo-server-sdk");
var secret_1 = __importDefault(require("../../secret"));
var axios_1 = __importDefault(require("axios"));
var expo = new expo_server_sdk_1.Expo();
var HostController = /** @class */ (function () {
    function HostController() {
    }
    HostController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, _b, firstName, lastName, cpf, birthdate, phoneNumber, street, streetNumber, bairro, zipCode, city, estado, cnpj, companyName, businessName, appSecret, hostRepo, emailExists;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        _b = req.body, firstName = _b.firstName, lastName = _b.lastName, cpf = _b.cpf, birthdate = _b.birthdate, phoneNumber = _b.phoneNumber, street = _b.street, streetNumber = _b.streetNumber, bairro = _b.bairro, zipCode = _b.zipCode, city = _b.city, estado = _b.estado, cnpj = _b.cnpj, companyName = _b.companyName, businessName = _b.businessName, appSecret = _b.appSecret;
                        if (!firstName || !lastName || !cpf || !birthdate || !phoneNumber || !street || !streetNumber || !bairro || !zipCode || !city || !estado || !cnpj || !companyName || !businessName || !appSecret) {
                            return [2 /*return*/, res.status(409).json({ error: 'Missing credentials!' })];
                        }
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { email: email } })];
                    case 1:
                        emailExists = _c.sent();
                        if (emailExists) {
                            return [2 /*return*/, res.status(409).json({ error: "Email already registered!" })];
                        }
                        return [4 /*yield*/, axios_1.default.post('https://sandbox.moip.com.br/v2/accounts', {
                                "email": {
                                    "address": email
                                },
                                "company": {
                                    "name": companyName,
                                    "businessName": businessName,
                                    "taxDocument": {
                                        "type": "CNPJ",
                                        "number": cnpj
                                    },
                                    "phone": {
                                        "countryCode": String(phoneNumber).substr(0, 2),
                                        "areaCode": String(phoneNumber).substr(2, 2),
                                        "number": String(phoneNumber).substr(4),
                                    },
                                    "address": {
                                        "street": street,
                                        "streetNumber": streetNumber,
                                        "district": bairro,
                                        "zipCode": zipCode,
                                        "city": city,
                                        "state": estado,
                                        "country": "BRA"
                                    }
                                },
                                "person": {
                                    "name": firstName,
                                    "lastName": lastName,
                                    "taxDocument": {
                                        "type": "CPF",
                                        "number": cpf
                                    },
                                    "birthDate": birthdate,
                                    "phone": {
                                        "countryCode": String(phoneNumber).substr(0, 2),
                                        "areaCode": String(phoneNumber).substr(2, 2),
                                        "number": String(phoneNumber).substr(4),
                                    },
                                    "address": {
                                        "street": street,
                                        "streetNumber": streetNumber,
                                        "district": bairro,
                                        "zipCode": zipCode,
                                        "city": city,
                                        "state": estado,
                                        "country": "BRA"
                                    }
                                },
                                "type": "MERCHANT",
                            }, {
                                headers: {
                                    "Authorization": "OAuth " + appSecret,
                                    "Content-Type": "application/json"
                                }
                            }).then(function (data2) { return __awaiter(_this, void 0, void 0, function () {
                                var host;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            console.log(data2.data);
                                            host = hostRepo.create({
                                                name: name,
                                                email: email,
                                                password: password,
                                                moipId: data2.data.id,
                                                accessToken: data2.data.accessToken,
                                                appId: data2.data.channelId,
                                            });
                                            return [4 /*yield*/, hostRepo.save(host)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/, res.json(host)];
                                    }
                                });
                            }); }).catch(function (data) {
                                console.log("error???");
                                console.log(data.response.data);
                                return res.status(500).json({ error: true });
                            })];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HostController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, hostRepo, host, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!email || !password) {
                            return [2 /*return*/, res.status(403).json({ error: 'Missing Credentials!' })];
                        }
                        email = email.toLowerCase();
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { email: email } })];
                    case 1:
                        host = _b.sent();
                        if (!host) {
                            return [2 /*return*/, res.status(403).json({ error: "Email not found!" })];
                        }
                        if (password != host.password) {
                            return [2 /*return*/, res.status(403).json({ error: "Wrong Password!" })];
                        }
                        token = jsonwebtoken_1.default.sign({ id: host.id }, secret_1.default, { expiresIn: '1000d' });
                        return [2 /*return*/, res.json({ host: host, token: token })];
                }
            });
        });
    };
    HostController.prototype.isHost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, host;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _a.sent();
                        if (!host) {
                            return [2 /*return*/, res.status(403).json({ error: "Token not found!" })];
                        }
                        return [2 /*return*/, res.json(host)];
                }
            });
        });
    };
    HostController.prototype.sendNotification = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, hostRepo, _a, title, body, host, messages, somePushTokens_2, tokenRepo, response, _i, somePushTokens_1, pushToken, chunks_1, tickets_2, receiptIds, _b, tickets_1, ticket, receiptIdChunks_1;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        id = req.userId;
                        hostRepo = typeorm_1.getRepository(Host_1.default);
                        _a = req.body, title = _a.title, body = _a.body;
                        return [4 /*yield*/, hostRepo.findOne({ where: { id: id } })];
                    case 1:
                        host = _c.sent();
                        if (!host) return [3 /*break*/, 3];
                        messages = [];
                        somePushTokens_2 = [];
                        tokenRepo = typeorm_1.getRepository(Tokens_1.default);
                        return [4 /*yield*/, tokenRepo.find({ select: ['token'] })];
                    case 2:
                        response = _c.sent();
                        response.map(function (item) {
                            console.log(item.token);
                            somePushTokens_2.push(item.token);
                        });
                        for (_i = 0, somePushTokens_1 = somePushTokens_2; _i < somePushTokens_1.length; _i++) {
                            pushToken = somePushTokens_1[_i];
                            if (!expo_server_sdk_1.Expo.isExpoPushToken(pushToken)) {
                                console.error("Push token " + pushToken + " is not a valid Expo push token");
                                continue;
                            }
                            messages.push({
                                to: pushToken,
                                title: title,
                                sound: 'default',
                                body: body,
                                data: { withSome: 'data' },
                            });
                        }
                        chunks_1 = expo.chunkPushNotifications(messages);
                        tickets_2 = [];
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _i, chunks_2, chunk, ticketChunk, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _i = 0, chunks_2 = chunks_1;
                                        _a.label = 1;
                                    case 1:
                                        if (!(_i < chunks_2.length)) return [3 /*break*/, 6];
                                        chunk = chunks_2[_i];
                                        _a.label = 2;
                                    case 2:
                                        _a.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, expo.sendPushNotificationsAsync(chunk)];
                                    case 3:
                                        ticketChunk = _a.sent();
                                        console.log(ticketChunk);
                                        tickets_2.push.apply(tickets_2, ticketChunk);
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_1 = _a.sent();
                                        console.error(error_1);
                                        return [3 /*break*/, 5];
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })();
                        receiptIds = [];
                        for (_b = 0, tickets_1 = tickets_2; _b < tickets_1.length; _b++) {
                            ticket = tickets_1[_b];
                            if (ticket.id) {
                                receiptIds.push(ticket.id);
                            }
                        }
                        receiptIdChunks_1 = expo.chunkPushNotificationReceiptIds(receiptIds);
                        (function () { return __awaiter(_this, void 0, void 0, function () {
                            var _i, receiptIdChunks_2, chunk, receipts, receiptId, _a, status_1, message, details, error_2;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _i = 0, receiptIdChunks_2 = receiptIdChunks_1;
                                        _b.label = 1;
                                    case 1:
                                        if (!(_i < receiptIdChunks_2.length)) return [3 /*break*/, 6];
                                        chunk = receiptIdChunks_2[_i];
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, 4, , 5]);
                                        return [4 /*yield*/, expo.getPushNotificationReceiptsAsync(chunk)];
                                    case 3:
                                        receipts = _b.sent();
                                        console.log(receipts);
                                        // notification and information about an error, if one occurred.
                                        for (receiptId in receipts) {
                                            _a = receipts[receiptId], status_1 = _a.status, message = _a.message, details = _a.details;
                                            if (status_1 === 'ok') {
                                                continue;
                                            }
                                            else if (status_1 === 'error') {
                                                console.error("There was an error sending a notification: " + message);
                                                if (details && details.error) {
                                                    // The error codes are listed in the Expo documentation:
                                                    // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                                                    // You must handle the errors appropriately.
                                                    console.error("The error code is " + details.error);
                                                }
                                            }
                                        }
                                        return [3 /*break*/, 5];
                                    case 4:
                                        error_2 = _b.sent();
                                        console.error(error_2);
                                        return [3 /*break*/, 5];
                                    case 5:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })();
                        return [2 /*return*/, res.json({ status: 'Logged in!' })];
                    case 3: return [2 /*return*/, res.status(403).json({ error: 'Token not found!' })];
                }
            });
        });
    };
    return HostController;
}());
exports.default = new HostController();
