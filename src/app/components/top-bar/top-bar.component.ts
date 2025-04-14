import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

import { TranslateService } from '@ngx-translate/core';
import { FeedsService } from '../../services/externos/feeds.service';
import { FeedVue } from '../../modelos/FeedVue/feed-vue';
import { LANGUAGES } from 'src/app/enums/languages.enum';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public identity;
  private token;
  public activeLang = LANGUAGES.SPANISH;

  feed: FeedVue;
  items: any[];

  constructor(
    private _router: Router,
    private _userService: UserService,
    private translate: TranslateService,
    private feedsService: FeedsService
  ) {
    this.translate.setDefaultLang(this.activeLang);
    translate.use(this.activeLang);
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
/*
    this.feedsService.getNewsVUE().subscribe(resp => {
      this.feed = resp as FeedVue;
      this.items = this.feed.items;
    });*/
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
