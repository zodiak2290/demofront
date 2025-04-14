import { Component, OnInit, DoCheck, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { UserService } from './services/user/user.service';
import {  ActivatedRoute, NavigationEnd,Router } from '@angular/router';
import * as $ from 'jquery';

//import { FacebookService, InitParams } from 'ngx-facebook';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { LanguageService } from './services/language/language.service';
import { ThemeService } from './services/theme/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService],
  animations: [
    trigger('toggleSidebar', [
      state('open', style({
        width: '250px',
        opacity: 1
      })),
      state('closed', style({
        width: '0px',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;
  private token;

  public year = 0;

  constructor(
    private _route: ActivatedRoute,
    private _userService:UserService,
    private _router: Router,
    private languageService: LanguageService,
    private themeService: ThemeService,
    private renderer: Renderer2, private el: ElementRef
  ){
    if( environment.production ){
      this._router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          window.gtag('config', 'G-3EQPKRCKB0', {
            page_path: event.urlAfterRedirects
          });
        }
      });
    }
      this.title = 'Demo';
  }

  initLanguage(){
    this.languageService.init();
  }

  initTheme(){
    this.themeService.init();
  }

  initToggleSidebar(){
    const sidebarToggles = this.el.nativeElement.querySelectorAll('#sidebarToggle, #sidebarToggleTop');
    const sidebar = this.el.nativeElement.querySelector('.sidebar');

    sidebarToggles.forEach((btn: HTMLElement) => {
      this.renderer.listen(btn, 'click', () => {
        if (document.body.classList.contains('sidebar-toggled')) {
          this.renderer.removeClass(document.body, 'sidebar-toggled');
        } else {
          this.renderer.addClass(document.body, 'sidebar-toggled');
        }

        // toggle 'toggled' en sidebar
        if (sidebar.classList.contains('toggled')) {
          this.renderer.removeClass(sidebar, 'toggled');
        } else {
          this.renderer.addClass(sidebar, 'toggled');
        }
      });
    });

   }



  ngOnInit() {
    this.initLanguage();
    this.initTheme();
    this.initToggleSidebar();


    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.year = moment().year();
  }


  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }



}
