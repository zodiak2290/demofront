import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user/user.service';
import {  ActivatedRoute, NavigationEnd,Router } from '@angular/router';
import * as $ from 'jquery';

import { FacebookService, InitParams } from 'ngx-facebook';
import * as moment from 'moment';

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

  public year = 0;

  constructor(
    private _route: ActivatedRoute,
    private _userService:UserService,
    private _router: Router,
    private facebookService: FacebookService
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
    this.initFacebookService();
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (o) {
          $("body").toggleClass("sidebar-toggled"),
          $(".sidebar").toggleClass("toggled"),
          $(".sidebar").hasClass("toggled") //&& $(".sidebar .collapse").collapse("hide")
    }), $(window).resize(function () {
      $(window).width() < 768 //&& $(".sidebar .collapse").collapse("hide")
    }), $("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel", function (o) {
      if (768 < $(window).width()) {
        /*var e = o.originalEvent, l = e.wheelDelta || -e.detail; this.scrollTop += 30 * (l < 0 ? 1 : -1), o.preventDefault()*/
      }
    }),
      $(document).on("scroll", function () {
        100 < $(this).scrollTop() ? $(".scroll-to-top").fadeIn() : $(".scroll-to-top").fadeOut()
      }), $(document).on("click", "a.scroll-to-top", function (o) {
        var e = $(this);
        $("html, body").stop().animate({
          scrollTop: $(e.attr("href")).offset().top
        }, 1e3, "easeInOutExpo"), o.preventDefault()
      });

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.year = moment().year();
  }

  private initFacebookService(): void {
    const initParams: InitParams = { xfbml: true, version: 'v8.0', appId: "2946411025586049" };
    this.facebookService.init(initParams);
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
