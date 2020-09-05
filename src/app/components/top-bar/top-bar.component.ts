import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user/user.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public identity;
  private token;
  public activeLang = 'es';

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
    translate.use(this.activeLang);
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

  cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}
