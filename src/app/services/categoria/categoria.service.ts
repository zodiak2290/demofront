import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global/global.service';
import { Categoria } from '../../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

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

  getCategorias(params: any): Observable<any>{
    return this._http.get(this.url + 'categoria', {headers: this.headers, params: params});
  }
}
