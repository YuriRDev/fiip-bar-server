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
var Categorias_1 = __importDefault(require("./Categorias"));
var Host_1 = __importDefault(require("./Host"));
var Items_1 = __importDefault(require("./Items"));
var Bars = /** @class */ (function () {
    function Bars() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Bars.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_1.default; }, function (Items) { return Items.bar; }),
        __metadata("design:type", Array)
    ], Bars.prototype, "items", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Categorias_1.default; }, function (Categorias) { return Categorias.bar; }),
        __metadata("design:type", Array)
    ], Bars.prototype, "categorias", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Host_1.default; }, function (Host) { return Host.bars; }, { eager: true }),
        __metadata("design:type", Host_1.default)
    ], Bars.prototype, "host", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "open", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "color", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bars.prototype, "photo_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Bars.prototype, "active", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Bars.prototype, "created_at", void 0);
    Bars = __decorate([
        typeorm_1.Entity('bares')
    ], Bars);
    return Bars;
}());
exports.default = Bars;
