import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../modelos/user';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private mensaje:string;
  public user: UserModel;
  ingresando: boolean = false;

  private toastr = inject(ToastrService);
  private _userService = inject(UserService);

  constructor(
    private _router: Router,
  ) {
      this.user = new UserModel("", "", "", "", "", "", "");
  }

  async onSubmit() {
    this.ingresando = true;
    try {
      const result = await this._userService.login(this.user.email, this.user.pass);
      this.ingresando = false;
      if(result.user && result.user.uid){
        this._router.navigate(['/home']);
      }
    } catch (error) {
      this.mensaje = "Error al iniciar sesión, verifique sus credenciales";
      this.ingresando = false;
      this.toastr.error(this.mensaje, "Importante");
    }

  }


}
