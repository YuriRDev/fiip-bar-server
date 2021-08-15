"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret_1 = __importDefault(require("../../secret"));
function AuthMiddleware(req, res, next) {
    var authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(403).json({ error: 'Missing authorization!' });
    }
    var token = authorization.replace('Bearer', '').trim();
    try {
        var data = jsonwebtoken_1.default.verify(token, secret_1.default);
        var id = data.id;
        req.userId = id;
        return next();
    }
    catch (_a) {
        return res.status(403).json({ error: 'Invalid Token!' });
    }
}
exports.default = AuthMiddleware;
