import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RutaGuard  {
  constructor( public router: Router) {}
  canActivate(): boolean {
    let token = localStorage.getItem('token');
    if(token){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
