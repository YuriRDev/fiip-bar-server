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
var Categorias_1 = __importDefault(require("./Categorias"));
var Items = /** @class */ (function () {
    function Items() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Items.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Bars_1.default; }, function (Bars) { return Bars.items; }),
        __metadata("design:type", Bars_1.default)
    ], Items.prototype, "bar", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Items.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Items.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Items.prototype, "index", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Items.prototype, "price", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Categorias_1.default; }, function (Categorias) { return Categorias.items; }, { eager: true }),
        __metadata("design:type", Categorias_1.default)
    ], Items.prototype, "categoria", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Items.prototype, "photo_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Items.prototype, "active", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Items.prototype, "created_at", void 0);
    Items = __decorate([
        typeorm_1.Entity('items')
    ], Items);
    return Items;
}());
exports.default = Items;
