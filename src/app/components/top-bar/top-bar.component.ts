import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  public identity;
  private token;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
