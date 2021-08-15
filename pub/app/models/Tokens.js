"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Tokens = /** @class */ (function () {
    function Tokens() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Tokens.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Tokens.prototype, "token", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Tokens.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.default; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.default)
    ], Tokens.prototype, "user", void 0);
    Tokens = __decorate([
        typeorm_1.Entity('tokens')
    ], Tokens);
    return Tokens;
}());
exports.default = Tokens;
