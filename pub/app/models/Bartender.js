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
var Host_1 = __importDefault(require("./Host"));
var Retirado_1 = __importDefault(require("./Retirado"));
var Bartender = /** @class */ (function () {
    function Bartender() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Bartender.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Host_1.default; }, function (Host) { return Host.bartender; }, { eager: true }),
        __metadata("design:type", Events_1.default)
    ], Bartender.prototype, "host", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bartender.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bartender.prototype, "key", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Bartender.prototype, "password", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Retirado_1.default; }, function (Retirado) { return Retirado.bartender; }),
        __metadata("design:type", Array)
    ], Bartender.prototype, "retirado", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Bartender.prototype, "active", void 0);
    Bartender = __decorate([
        typeorm_1.Entity('bartenders')
    ], Bartender);
    return Bartender;
}());
exports.default = Bartender;
