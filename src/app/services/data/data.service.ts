import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import 'rxjs/add/observable/forkJoin'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public url:string;
  private headers: HttpHeaders;
  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
    this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.getToken());
  }
  
  getToken() {
    let token = localStorage.getItem('token');
    let response = null;
    if(token != 'undefined'){
      response = token;
    }
    return response;
  }

  getData(params: any): Observable<any>{
    return this._http.get(this.url + 'data', {headers: this.headers, params: params});
  }

  public requestDataFromMultipleSources( categorias: any[]) {
    let peticiones = [];
    let self = this;
    categorias.forEach(function (categoria) {
      let params = { size: 0, idcategoria: categoria._id };
      peticiones.push( self.getData(params) );
    }); 
    return Observable.forkJoin(peticiones);
  }
}
