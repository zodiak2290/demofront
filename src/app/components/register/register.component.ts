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
export class RegisterComponent {
  public user: UserModel;

  constructor(
    private _userService: UserService
  ) {
      this.user = new UserModel("", "", "", "", "", "", "");
   }

  async onSubmit(registerForm){
    try {
      const result = await this._userService.register(this.user.email, this.user.pass);
      registerForm.reset();
    } catch (error) {
      console.error(error);
    }

  }

}
