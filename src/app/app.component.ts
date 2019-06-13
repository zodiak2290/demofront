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