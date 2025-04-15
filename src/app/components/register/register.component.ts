import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserModel } from '../../modelos/user';
import { UserService } from '../../services/user/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public user: UserModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
      this.user = new UserModel("", "", "", "", "", "", "");
   }

  ngOnInit() {}

  async onSubmit(registerForm){
    try {
      const result = await this._userService.register(this.user.email, this.user.pass);
      registerForm.reset();
    } catch (error) {
      console.error(error);
    }

  }

}
