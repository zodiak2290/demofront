import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }
}
