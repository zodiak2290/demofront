import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [LoginComponent],
    imports: [
      RouterTestingModule,
      TranslateModule.forRoot(),
      FormsModule,
      ToastrModule.forRoot()
    ],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    expect(component.user).toBeTruthy();
    expect(component.user.email).toBe('');
    expect(component.user.pass).toBe('');
    expect(component.ingresando).toBeFalse();
  });

  it('should display an error message when login fails', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const toastrService = TestBed.inject(ToastrService);
    spyOn(component['_userService'], 'login').and.rejectWith(new Error('Invalid credentials'));
    spyOn(toastrService, 'error');

    component.user.email = 'test@example.com';
    component.user.pass = 'wrongpassword';
    await component.onSubmit();

    expect(component.ingresando).toBeFalse();
    expect(toastrService.error).toHaveBeenCalledWith('Error al iniciar sesión, verifique sus credenciales', 'Importante');
  });

  it('should navigate to /home on successful login', async () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    spyOn(component['_userService'], 'login').and.resolveTo({
      user: { uid: '12345' } as any
    } as any);
    spyOn(router, 'navigate');

    component.user.email = 'test@example.com';
    component.user.pass = 'correctpassword';
    await component.onSubmit();

    expect(component.ingresando).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
