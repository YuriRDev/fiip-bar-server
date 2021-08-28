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
var Bars_1 = __importDefault(require("./Bars"));
var Items_1 = __importDefault(require("./Items"));
var Categorias = /** @class */ (function () {
    function Categorias() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Categorias.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Categorias.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Categorias.prototype, "index", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Bars_1.default; }, function (Bars) { return Bars.categorias; }, { eager: true }),
        __metadata("design:type", Bars_1.default)
    ], Categorias.prototype, "bar", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_1.default; }, function (Items) { return Items.categoria; }),
        __metadata("design:type", Array)
    ], Categorias.prototype, "items", void 0);
    Categorias = __decorate([
        typeorm_1.Entity('categorias')
    ], Categorias);
    return Categorias;
}());
exports.default = Categorias;
