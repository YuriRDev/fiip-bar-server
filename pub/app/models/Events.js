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
var Host_1 = __importDefault(require("./Host"));
var Item_1 = __importDefault(require("./Item"));
var User_1 = __importDefault(require("./User"));
var Compra_1 = __importDefault(require("./Compra"));
var Items_Comprados_1 = __importDefault(require("./Items_Comprados"));
var Event = /** @class */ (function () {
    function Event() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Event.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Host_1.default; }, function (Host) { return Host.event; }, { eager: true }),
        __metadata("design:type", Host_1.default)
    ], Event.prototype, "host", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Compra_1.default; }, function (compra) { return compra.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "compra", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return User_1.default; }, function (User) { return User.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "banner_url", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Event.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Event.prototype, "start_at", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Event.prototype, "closes_at", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Item_1.default; }, function (Item) { return Item.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "item", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_Comprados_1.default; }, function (ItemsComprados) { return ItemsComprados.event; }),
        __metadata("design:type", Array)
    ], Event.prototype, "itemsComprados", void 0);
    Event = __decorate([
        typeorm_1.Entity('events')
    ], Event);
    return Event;
}());
exports.default = Event;
