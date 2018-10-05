// ====== ./app/Scheduler/Parametros/parametros.component.ts ======
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
// Import component decorator
var core_1 = require("@angular/core");
var parametros_service_1 = require("../../Services/parametros.service");
var rxjs_1 = require("rxjs");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var $ = require("jquery");
var ParametrosComponent = (function () {
    function ParametrosComponent(parametroService) {
        this.parametroService = parametroService;
        this.gerarlogs = [{ descricao: 'Sim', valor: true }, { descricao: 'Nao', valor: false }];
        this.arr = [];
    }
    ParametrosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.gravadoSmtp = false;
        this.gravadoGerais = false;
        this.geraiseditable = false;
        this.smtpeditable = false;
        this.populaHoraInicio();
        this.carregaParametros();
        this.listaPeriodos();
        moment.locale('pt-br');
        rxjs_1.interval(2000).subscribe(function (x) {
            _this.carregaStatus();
            _this.parametroService.checkAPIonline().subscribe(function (response) { _this.apionline = true; }, function (err) { _this.apionline = false; });
        });
        this.formParametrosGerais = new forms_1.FormGroup({
            // tslint:disable-next-line:max-line-length
            'frequencia': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]+$')]),
            'periodo': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }, forms_1.Validators.required),
            'gerarlog': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }, forms_1.Validators.required),
            'horainicio': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }),
            'taxajuros': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }, forms_1.Validators.required),
            'taxamulta': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }, forms_1.Validators.required),
            'enviaemail': new forms_1.FormControl({ value: '', disabled: !this.geraiseditable }),
            'proximaexecucao': new forms_1.FormControl(),
            'ultimaexecucao': new forms_1.FormControl()
        });
        this.formParametrosSmtp = new forms_1.FormGroup({
            'requerauth': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }),
            'starttls': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }),
            'usuario': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }, forms_1.Validators.required),
            'senha': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }, forms_1.Validators.required),
            'host': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }, forms_1.Validators.required),
            'porta': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }, [forms_1.Validators.required, forms_1.Validators.pattern('^[0-9]+$')]),
            'from': new forms_1.FormControl({ value: '', disabled: !this.smtpeditable }, [forms_1.Validators.required,
                forms_1.Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
            'id': new forms_1.FormControl()
        });
        this.formParametrosSmtp.controls['requerauth'].valueChanges.subscribe(function (requerauth) {
            if (requerauth && _this.smtpeditable) {
                _this.formParametrosSmtp.controls['usuario'].enable();
                _this.formParametrosSmtp.controls['senha'].enable();
            }
            else {
                _this.formParametrosSmtp.controls['usuario'].disable();
                _this.formParametrosSmtp.controls['senha'].disable();
            }
        });
    };
    ParametrosComponent.prototype.habilitaParametrosGerais = function () {
        this.geraiseditable = true;
        this.formParametrosGerais.get('frequencia').enable();
        this.formParametrosGerais.get('periodo').enable();
        this.formParametrosGerais.get('gerarlog').enable();
        this.formParametrosGerais.get('horainicio').enable();
        this.formParametrosGerais.get('taxajuros').enable();
        this.formParametrosGerais.get('taxamulta').enable();
        this.formParametrosGerais.get('enviaemail').enable();
    };
    ParametrosComponent.prototype.desabilitaParametrosGerais = function () {
        this.geraiseditable = false;
        this.carregaParametros();
        this.formParametrosGerais.get('frequencia').disable();
        this.formParametrosGerais.get('periodo').disable();
        this.formParametrosGerais.get('gerarlog').disable();
        this.formParametrosGerais.get('horainicio').disable();
        this.formParametrosGerais.get('taxajuros').disable();
        this.formParametrosGerais.get('taxamulta').disable();
        this.formParametrosGerais.get('enviaemail').disable();
    };
    ParametrosComponent.prototype.atualizaParametrosGerais = function () {
        var _this = this;
        if (!this.formParametrosGerais.valid) {
            console.log('Formulario não é valido !!');
        }
        else {
            console.log(this.formParametrosGerais.value);
            this.parametroService.updateParametrosGerais(this.formParametrosGerais.value)
                .subscribe(function (valor) {
                _this.carregaParametros();
                _this.desabilitaParametrosGerais();
                _this.gravadoGerais = true;
                _this.geraiseditable = false;
                _this.fechaAlerta('#grvGerais');
            });
        }
    };
    ParametrosComponent.prototype.atualizaParametrosSmtp = function () {
        var _this = this;
        if (!this.formParametrosSmtp.valid) {
            console.log('Formulario não é valido !!');
        }
        else {
            console.log(this.formParametrosGerais.value);
            this.parametroService.updateParametrosSmtp(this.formParametrosSmtp.value)
                .subscribe(function (valor) {
                _this.carregaParametros();
                _this.desabilitaParametrosSmtp();
                _this.gravadoSmtp = true;
                _this.smtpeditable = false;
                _this.fechaAlerta('#grvSmtp');
            });
        }
    };
    ParametrosComponent.prototype.habilitaParametrosSmtp = function () {
        this.smtpeditable = true;
        this.formParametrosSmtp.controls['requerauth'].enable();
        if (this.formParametrosSmtp.controls['requerauth'].value) {
            this.formParametrosSmtp.controls['usuario'].enable();
            this.formParametrosSmtp.controls['senha'].enable();
        }
        this.formParametrosSmtp.controls['starttls'].enable();
        this.formParametrosSmtp.controls['host'].enable();
        this.formParametrosSmtp.controls['porta'].enable();
        this.formParametrosSmtp.controls['from'].enable();
        console.log(this.formParametrosSmtp.controls['from'].status);
    };
    ParametrosComponent.prototype.desabilitaParametrosSmtp = function () {
        this.smtpeditable = false;
        this.formParametrosSmtp.controls['requerauth'].disable();
        if (this.formParametrosSmtp.controls['requerauth'].value) {
            this.formParametrosSmtp.controls['usuario'].disable();
            this.formParametrosSmtp.controls['senha'].disable();
        }
        this.formParametrosSmtp.controls['starttls'].disable();
        this.formParametrosSmtp.controls['usuario'].disable();
        this.formParametrosSmtp.controls['senha'].disable();
        this.formParametrosSmtp.controls['host'].disable();
        this.formParametrosSmtp.controls['porta'].disable();
        this.formParametrosSmtp.controls['from'].disable();
    };
    ParametrosComponent.prototype.carregaStatus = function () {
        var _this = this;
        this.parametroService.getParametros()
            .subscribe(function (params) {
            // tslint:disable-next-line:max-line-length
            _this.formParametrosGerais.get('proximaexecucao').setValue(moment(params[0].proximaexecucao).format('LLLL'));
            // tslint:disable-next-line:max-line-length
            _this.formParametrosGerais.get('ultimaexecucao').setValue(moment(params[0].ultimaexecucao).format('LLLL'));
        });
    };
    ParametrosComponent.prototype.carregaParametros = function () {
        var _this = this;
        this.parametroService.getParametros()
            .subscribe(function (params) {
            console.log(params[0]);
            _this.formParametrosGerais.get('frequencia').setValue(params[0].frequenciaverificacao);
            _this.formParametrosGerais.controls['periodo'].setValue(params[0].codperiodoverificacao);
            _this.formParametrosGerais.get('gerarlog').setValue(params[0].gerarlog);
            _this.formParametrosGerais.get('horainicio').setValue(params[0].horainicio);
            _this.formParametrosGerais.controls['taxajuros'].setValue(params[0].taxajuros);
            _this.formParametrosGerais.controls['taxamulta'].setValue(params[0].taxamulta);
            _this.formParametrosGerais.controls['enviaemail'].setValue(params[0].enviaemail);
            // tslint:disable-next-line:max-line-length
            _this.formParametrosGerais.get('proximaexecucao').setValue(moment(params[0].proximaexecucao).format('LLLL'));
            // tslint:disable-next-line:max-line-length
            _this.formParametrosGerais.get('ultimaexecucao').setValue(moment(params[0].ultimaexecucao).format('LLLL'));
            _this.formParametrosSmtp.controls['requerauth'].setValue(params[0].authsmtp);
            _this.formParametrosSmtp.controls['starttls'].setValue(params[0].starttlsmtp);
            _this.formParametrosSmtp.controls['usuario'].setValue(params[0].usuariosmtp);
            _this.formParametrosSmtp.controls['senha'].setValue(params[0].senhasmtp);
            _this.formParametrosSmtp.controls['host'].setValue(params[0].hostsmtp);
            _this.formParametrosSmtp.controls['porta'].setValue(params[0].portasmtp);
            _this.formParametrosSmtp.controls['from'].setValue(params[0].remetente);
        });
    };
    ParametrosComponent.prototype.listaPeriodos = function () {
        var _this = this;
        this.parametroService.getPeriodos().subscribe(function (periodo) { return _this.periodos = periodo; });
    };
    ParametrosComponent.prototype.fechaAlerta = function (componente) {
        $(componente).fadeTo(10, 1, function () {
            $(this).show();
        });
        window.setTimeout(function () {
            $(componente).fadeTo(500, 0, function () {
                $(this).hide();
            });
        }, 2000);
    };
    ParametrosComponent.prototype.populaHoraInicio = function () {
        var i = 0;
        var teste, valor = {};
        for (i = 0; i < 24; i++) {
            teste = {};
            if (i.toString().length === 1) {
                teste.descricao = '0' + i.toString();
                teste.valor = '0' + i.toString();
            }
            else {
                teste.descricao = i.toString();
                teste.valor = i.toString();
            }
            valor.descricao = teste.descricao + ':00';
            valor.valor = teste.valor + ':00';
            this.arr.push(valor);
            valor = {};
            valor.descricao = teste.descricao + ':30';
            valor.valor = teste.valor + ':30';
            this.arr.push(valor);
            valor = {};
        }
        console.log(this.arr);
    };
    ParametrosComponent.prototype.onSubmitGerais = function () {
        if (this.formParametrosGerais.valid) {
            console.log('Form Submitted correctly !!');
        }
    };
    ParametrosComponent.prototype.converteResposta = function (req) {
        var teste = '';
        if (!req) {
            teste = 'Não';
        }
        else {
            teste = 'Sim';
        }
        return teste;
    };
    return ParametrosComponent;
}());
ParametrosComponent = __decorate([
    core_1.Component({
        templateUrl: './parametros.component.html'
    })
    // Component class
    ,
    __metadata("design:paramtypes", [parametros_service_1.ParametroService])
], ParametrosComponent);
exports.ParametrosComponent = ParametrosComponent;
//# sourceMappingURL=parametros.component.js.map