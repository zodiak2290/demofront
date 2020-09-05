import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user/user.service';
import {  ActivatedRoute, NavigationEnd,Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public title:string;
  public identity;
  private token;
  constructor(
    private _route: ActivatedRoute,
    private _userService:UserService,
    private _router: Router
  ){
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
      this.title = 'Demo';
  }

  ngOnInit() {
    !function (t) { "use strict"; t("#sidebarToggle, #sidebarToggleTop").on("click", function (o) { t("body").toggleClass("sidebar-toggled"), t(".sidebar").toggleClass("toggled"), t(".sidebar").hasClass("toggled") && t(".sidebar .collapse").collapse("hide") }), t(window).resize(function () { t(window).width() < 768 && t(".sidebar .collapse").collapse("hide") }), t("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (o) { if (768 < t(window).width()) { var e = o.originalEvent, l = e.wheelDelta || -e.detail; this.scrollTop += 30 * (l < 0 ? 1 : -1), o.preventDefault() } }), t(document).on("scroll", function () { 100 < t(this).scrollTop() ? t(".scroll-to-top").fadeIn() : t(".scroll-to-top").fadeOut() }), t(document).on("click", "a.scroll-to-top", function (o) { var e = t(this); t("html, body").stop().animate({ scrollTop: t(e.attr("href")).offset().top }, 1e3, "easeInOutExpo"), o.preventDefault() }) }(jQuery);
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


  toggleSidebar(){
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

}
