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
var Bartender_1 = __importDefault(require("./Bartender"));
var Items_Comprados_1 = __importDefault(require("./Items_Comprados"));
var User_1 = __importDefault(require("./User"));
var Retirado = /** @class */ (function () {
    function Retirado() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Retirado.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Bartender_1.default; }, function (Bartender) { return Bartender.retirado; }, { eager: true }),
        __metadata("design:type", Bartender_1.default)
    ], Retirado.prototype, "bartender", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Retirado.prototype, "retirado_at", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (User) { return User.retirado; }, { eager: true }),
        __metadata("design:type", User_1.default)
    ], Retirado.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_Comprados_1.default; }, function (ItemsComprados) { return ItemsComprados.retirado; }),
        __metadata("design:type", Array)
    ], Retirado.prototype, "items_comprados", void 0);
    Retirado = __decorate([
        typeorm_1.Entity('retirados')
    ], Retirado);
    return Retirado;
}());
exports.default = Retirado;
