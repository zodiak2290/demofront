import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RutaGuard  {
  constructor( public router: Router) {}
  canActivate(): boolean {
    let identity = localStorage.getItem('identity');
    if(identity){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
