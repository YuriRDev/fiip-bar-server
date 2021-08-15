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
var Events_1 = __importDefault(require("./Events"));
var Host = /** @class */ (function () {
    function Host() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Host.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "moipId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "accessToken", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "appId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Host.prototype, "password", void 0);
    __decorate([
        typeorm_1.OneToMany(function (Type) { return Events_1.default; }, function (Event) { return Event.host; }),
        __metadata("design:type", Array)
    ], Host.prototype, "event", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Bartender_1.default; }, function (Bartender) { return Bartender.host; }),
        __metadata("design:type", Promise)
    ], Host.prototype, "bartender", void 0);
    Host = __decorate([
        typeorm_1.Entity('hosts')
    ], Host);
    return Host;
}());
exports.default = Host;
