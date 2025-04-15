import { ChangeDetectorRef, Component, effect, EffectRef, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TranslateService } from '@ngx-translate/core';
import { FeedVue } from '../../modelos/FeedVue/feed-vue';
import { LANGUAGES } from 'src/app/enums/languages.enum';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit  {

  public activeLang = LANGUAGES.SPANISH;
  feed: FeedVue;
  items: any[];
  private counterService = inject(UserService);
  userSignal = this.counterService.userSignal;
  private router = inject(Router);

  constructor(
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang(this.activeLang);
    this.translate.use(this.activeLang);
  }

  ngOnInit() {}

  async logout() {
    await this.counterService.logout();
    this.router.navigate(['/home']);
  }

  login() {
    this.router.navigate(['/login']);
  }

}


