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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ParametroService = (function () {
    function ParametroService(http) {
        this.http = http;
        this.serviceUrl = 'http://localhost:3000/api/parametro';
        this.smtpUrl = 'http://localhost:3000/api/parametro/smtp';
        this.periodosUrl = 'http://localhost:3000/api/periodoverificacao';
        this.checkAPIUrl = 'http://localhost:3000/api/online';
    }
    ParametroService.prototype.getParametros = function () {
        return this.http.get(this.serviceUrl);
    };
    ParametroService.prototype.getPeriodos = function () {
        return this.http.get(this.periodosUrl);
    };
    ParametroService.prototype.updateParametrosGerais = function (param) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'q=0.8;application/json;q=0.9');
        var body = JSON.stringify(param);
        return this.http.patch(this.serviceUrl, body, { headers: headers });
    };
    ParametroService.prototype.updateParametrosSmtp = function (param) {
        var headers = new http_1.HttpHeaders().set('Content-Type', 'application/json')
            .set('Accept', 'q=0.8;application/json;q=0.9');
        var body = JSON.stringify(param);
        return this.http.patch(this.smtpUrl, body, { headers: headers });
    };
    ParametroService.prototype.checkAPIonline = function () {
        return this.http.get(this.checkAPIUrl);
    };
    return ParametroService;
}());
ParametroService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], ParametroService);
exports.ParametroService = ParametroService;
//# sourceMappingURL=parametros.service.js.map