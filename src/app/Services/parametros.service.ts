import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Subscribable } from 'rxjs';

@Injectable()
export class ParametroService {
  private serviceUrl = 'http://localhost:3000/api/parametro';
  private smtpUrl = 'http://localhost:3000/api/parametro/smtp';
  private periodosUrl = 'http://localhost:3000/api/periodoverificacao';
  private checkAPIUrl = 'http://localhost:3000/api/online';

  headers: HttpHeaders;
  options: HttpParams;

  constructor(private http: HttpClient) {

  }

  getParametros(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrl);
  }

  getPeriodos(): Observable<any[]> {
    return this.http.get<any[]>(this.periodosUrl);
  }

  updateParametrosGerais(param: any): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'q=0.8;application/json;q=0.9');

    const body = JSON.stringify(param);
    return this.http.patch(this.serviceUrl, body, {headers});
  }

  updateParametrosSmtp(param: any): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                     .set('Accept', 'q=0.8;application/json;q=0.9');

    const body = JSON.stringify(param);
    return this.http.patch(this.smtpUrl, body, {headers});
  }

  checkAPIonline() {

    return this.http.get<any[]>(this.checkAPIUrl);

  }

}
