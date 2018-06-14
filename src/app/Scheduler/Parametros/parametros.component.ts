// ====== ./app/Scheduler/Parametros/parametros.component.ts ======

// Import component decorator
import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card';
import {DataSource} from '@angular/cdk/collections';
import { ParametroService } from '../../Services/parametros.service';
import {Observable, interval} from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as $ from 'jquery';

@Component({
  templateUrl: './parametros.component.html'
})

// Component class
export class ParametrosComponent implements OnInit {

  apionline: boolean;
  teste: Observable<any>;
  gravadoGerais: boolean;
  gravadoSmtp: boolean;
  geraiseditable: boolean;
  smtpeditable: boolean;
  periodos: any[];
  gerarlogs: any[] = [{ descricao: 'Sim', valor: true }, { descricao: 'Nao', valor: false}];
  arr: any = [];

  formParametrosGerais: FormGroup;
  formParametrosSmtp: FormGroup;
  formStatusSistema: FormGroup;

  constructor(private parametroService: ParametroService) {  }

  ngOnInit() {

      this.gravadoSmtp = false;
      this.gravadoGerais = false;
      this.geraiseditable = false;
      this.smtpeditable = false;
      this.populaHoraInicio();
      this.carregaParametros();
      this.listaPeriodos();
      moment.locale('pt-br');

      interval(2000).subscribe(x => {
        this.carregaStatus();
        this.parametroService.checkAPIonline().subscribe((response) => { this.apionline = true; }, (err) => { this.apionline = false; });
      });

      this.formParametrosGerais = new FormGroup({
            // tslint:disable-next-line:max-line-length
            'frequencia': new FormControl({ value: '', disabled: !this.geraiseditable }, [Validators.required, Validators.pattern('^[0-9]+$')]),
            'periodo': new FormControl({ value: '', disabled: !this.geraiseditable }, Validators.required),
            'gerarlog': new FormControl({ value: '', disabled: !this.geraiseditable }, Validators.required),
            'horainicio': new FormControl({ value: '', disabled: !this.geraiseditable }),
            'taxajuros': new FormControl({ value: '', disabled: !this.geraiseditable }, Validators.required),
            'taxamulta': new FormControl({ value: '', disabled: !this.geraiseditable }, Validators.required),
            'proximaexecucao': new FormControl(),
            'ultimaexecucao': new FormControl()
      });

      this.formParametrosSmtp = new FormGroup({
            'requerauth': new FormControl({ value: '', disabled: !this.smtpeditable }),
            'starttls': new FormControl({ value: '', disabled: !this.smtpeditable }),
            'usuario': new FormControl({ value: '', disabled: !this.smtpeditable }, Validators.required),
            'senha': new FormControl({ value: '', disabled: !this.smtpeditable }, Validators.required),
            'host': new FormControl({ value: '', disabled: !this.smtpeditable }, Validators.required),
            'porta': new FormControl({ value: '', disabled: !this.smtpeditable }, [Validators.required, Validators.pattern('^[0-9]+$')]),
            'from': new FormControl({ value: '', disabled: !this.smtpeditable },
                                      [Validators.required,
                                       Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]),
            'id': new FormControl()
      });


      this.formParametrosSmtp.controls['requerauth'].valueChanges.subscribe(
          (requerauth: boolean) => {
            if (requerauth && this.smtpeditable) {
              this.formParametrosSmtp.controls['usuario'].enable();
              this.formParametrosSmtp.controls['senha'].enable();
            } else {
              this.formParametrosSmtp.controls['usuario'].disable();
              this.formParametrosSmtp.controls['senha'].disable();
            }
          }
      );

  }


  habilitaParametrosGerais() {
        this.geraiseditable = true;
        this.formParametrosGerais.get('frequencia').enable();
        this.formParametrosGerais.get('periodo').enable();
        this.formParametrosGerais.get('gerarlog').enable();
        this.formParametrosGerais.get('horainicio').enable();
        this.formParametrosGerais.get('taxajuros').enable();
        this.formParametrosGerais.get('taxamulta').enable();
  }

  desabilitaParametrosGerais() {
        this.geraiseditable = false;
        this.carregaParametros();
        this.formParametrosGerais.get('frequencia').disable();
        this.formParametrosGerais.get('periodo').disable();
        this.formParametrosGerais.get('gerarlog').disable();
        this.formParametrosGerais.get('horainicio').disable();
        this.formParametrosGerais.get('taxajuros').disable();
        this.formParametrosGerais.get('taxamulta').disable();
  }

  atualizaParametrosGerais() {

        if (!this.formParametrosGerais.valid) {
          console.log('Formulario não é valido !!');
        } else {

          console.log(this.formParametrosGerais.value);
          this.parametroService.updateParametrosGerais(this.formParametrosGerais.value)
                               .subscribe((valor) => { this.carregaParametros();
                                                     this.desabilitaParametrosGerais();
                                                     this.gravadoGerais = true;
                                                     this.geraiseditable = false;
                                                     this.fechaAlerta('#grvGerais');
                                                    });


      }
  }

  atualizaParametrosSmtp() {

          if (!this.formParametrosSmtp.valid) {
            console.log('Formulario não é valido !!');
          } else {
            console.log(this.formParametrosGerais.value);
            this.parametroService.updateParametrosSmtp(this.formParametrosSmtp.value)
                                 .subscribe((valor) => { this.carregaParametros();
                                                         this.desabilitaParametrosSmtp();
                                                         this.gravadoSmtp = true;
                                                         this.smtpeditable = false;
                                                         this.fechaAlerta('#grvSmtp');
                                                      });
          }

}

  habilitaParametrosSmtp() {
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
  }

desabilitaParametrosSmtp() {
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
}

  carregaStatus() {

      this.parametroService.getParametros()
                           .subscribe(params => {
                                                  // tslint:disable-next-line:max-line-length
                                                  this.formParametrosGerais.get('proximaexecucao').setValue(moment(params[0].proximaexecucao).format('LLLL'));
                                                  // tslint:disable-next-line:max-line-length
                                                  this.formParametrosGerais.get('ultimaexecucao').setValue(moment(params[0].ultimaexecucao).format('LLLL'));
                                                });

  }


  carregaParametros() {

      this.parametroService.getParametros()
                           .subscribe(params => { console.log(params[0]);
                                                  this.formParametrosGerais.get('frequencia').setValue(params[0].frequenciaverificacao);
                                                  this.formParametrosGerais.controls['periodo'].setValue(params[0].codperiodoverificacao);
                                                  this.formParametrosGerais.get('gerarlog').setValue(params[0].gerarlog);
                                                  this.formParametrosGerais.get('horainicio').setValue(params[0].horainicio);
                                                  this.formParametrosGerais.controls['taxajuros'].setValue(params[0].taxajuros);
                                                  this.formParametrosGerais.controls['taxamulta'].setValue(params[0].taxamulta);

                                                  // tslint:disable-next-line:max-line-length
                                                  this.formParametrosGerais.get('proximaexecucao').setValue(moment(params[0].proximaexecucao).format('LLLL'));
                                                  // tslint:disable-next-line:max-line-length
                                                  this.formParametrosGerais.get('ultimaexecucao').setValue(moment(params[0].ultimaexecucao).format('LLLL'));

                                                  this.formParametrosSmtp.controls['requerauth'].setValue(params[0].authsmtp);
                                                  this.formParametrosSmtp.controls['starttls'].setValue(params[0].starttlsmtp);
                                                  this.formParametrosSmtp.controls['usuario'].setValue(params[0].usuariosmtp);
                                                  this.formParametrosSmtp.controls['senha'].setValue(params[0].senhasmtp);
                                                  this.formParametrosSmtp.controls['host'].setValue(params[0].hostsmtp);
                                                  this.formParametrosSmtp.controls['porta'].setValue(params[0].portasmtp);
                                                  this.formParametrosSmtp.controls['from'].setValue(params[0].remetente);
                                                });

  }

  listaPeriodos() {

      this.parametroService.getPeriodos().subscribe(periodo => this.periodos = periodo );

  }

  fechaAlerta(componente) {

    $(componente).fadeTo(10, 1, function () {
      $(this).show();
     });

     window.setTimeout(function () {
         $(componente).fadeTo(500, 0, function () {
            $(this).hide();
         });
     }, 2000);


  }

  populaHoraInicio() {

    let i = 0;
    let teste: any, valor: any = {};

    for (i = 0; i < 24; i++) {

        teste = {};

        if (i.toString().length === 1) {
          teste.descricao = '0' + i.toString();
          teste.valor = '0' + i.toString();
        } else {
          teste.descricao =  i.toString();
          teste.valor =  i.toString();
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
  }

  onSubmitGerais() {

      if (this.formParametrosGerais.valid) {
          console.log('Form Submitted correctly !!');
      }

  }

  converteResposta(req) {

     let teste = '';

     if (!req) {
        teste = 'Não';
     } else {
        teste = 'Sim';
     }

    return teste;

  }

}


