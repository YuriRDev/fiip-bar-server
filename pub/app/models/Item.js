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
var Events_1 = __importDefault(require("./Events"));
var Items_Comprados_1 = __importDefault(require("./Items_Comprados"));
var Promocoes_1 = __importDefault(require("./Promocoes"));
var Item = /** @class */ (function () {
    function Item() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Item.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Events_1.default; }, function (Event) { return Event.item; }, { eager: true }),
        __metadata("design:type", Events_1.default)
    ], Item.prototype, "event", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Item.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Item.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Item.prototype, "photo_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Item.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Item.prototype, "app_price", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Item.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Item.prototype, "quantityOriginal", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Item.prototype, "active", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_Comprados_1.default; }, function (ItemsComprados) { return ItemsComprados.item; }),
        __metadata("design:type", Array)
    ], Item.prototype, "items_comprados", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Promocoes_1.default; }, { eager: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Promocoes_1.default)
    ], Item.prototype, "promocoes", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Item.prototype, "created_at", void 0);
    Item = __decorate([
        typeorm_1.Entity('items')
    ], Item);
    return Item;
}());
exports.default = Item;
