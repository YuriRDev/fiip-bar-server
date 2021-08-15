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
var Compra_1 = __importDefault(require("./Compra"));
var Item_1 = __importDefault(require("./Item"));
var Retirado_1 = __importDefault(require("./Retirado"));
var User_1 = __importDefault(require("./User"));
var Events_1 = __importDefault(require("./Events"));
var Refund_1 = __importDefault(require("./Refund"));
var ItemsComprados = /** @class */ (function () {
    function ItemsComprados() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], ItemsComprados.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (User) { return User.item_wallet; }),
        __metadata("design:type", User_1.default)
    ], ItemsComprados.prototype, "user", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Compra_1.default; }, function (Compra) { return Compra.items_comprados; }, { eager: true }),
        __metadata("design:type", Compra_1.default)
    ], ItemsComprados.prototype, "compra", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Item_1.default; }, function (Item) { return Item.items_comprados; }, { eager: true }),
        __metadata("design:type", Item_1.default)
    ], ItemsComprados.prototype, "item", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Retirado_1.default; }, function (Retirado) { return Retirado.items_comprados; }, { eager: true }),
        __metadata("design:type", Retirado_1.default)
    ], ItemsComprados.prototype, "retirado", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ItemsComprados.prototype, "price", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Events_1.default; }, function (Events) { return Events.itemsComprados; }),
        __metadata("design:type", Events_1.default)
    ], ItemsComprados.prototype, "event", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Refund_1.default; }, function (Refund) { return Refund.items_comprados; }, { eager: true }),
        __metadata("design:type", Refund_1.default)
    ], ItemsComprados.prototype, "refund", void 0);
    ItemsComprados = __decorate([
        typeorm_1.Entity('items_comprados')
    ], ItemsComprados);
    return ItemsComprados;
}());
exports.default = ItemsComprados;
