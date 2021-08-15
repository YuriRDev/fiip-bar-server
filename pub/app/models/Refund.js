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
var Items_Comprados_1 = __importDefault(require("./Items_Comprados"));
var Refund = /** @class */ (function () {
    function Refund() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Refund.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Items_Comprados_1.default; }, function (ItemsComprados) { return ItemsComprados.refund; }),
        __metadata("design:type", Array)
    ], Refund.prototype, "items_comprados", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Refund.prototype, "created_at", void 0);
    Refund = __decorate([
        typeorm_1.Entity('refunds')
    ], Refund);
    return Refund;
}());
exports.default = Refund;
