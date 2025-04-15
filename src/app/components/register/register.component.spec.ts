import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserCredential } from 'firebase/auth';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [RegisterComponent],
    imports: [RouterTestingModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the form after successful registration', async () => {
    const registerForm = {
      reset: jasmine.createSpy('reset')
    };

    spyOn(component['_userService'], 'register').and.returnValue(Promise.resolve({ user: { uid: '123' } } as UserCredential));


    await component.onSubmit(registerForm);

    expect(component['_userService'].register).toHaveBeenCalledWith(component.user.email, component.user.pass);
    expect(registerForm.reset).toHaveBeenCalled();
  });

  it('should reset the form after successful registration with Firebase', async () => {
    const registerForm = {
      reset: jasmine.createSpy('reset')
    };

    component.user.email = 'john@example.com';
    component.user.pass = 'password123';

    const mockUserService = component['_userService'];
    spyOn(mockUserService, 'register').and.returnValue(Promise.resolve({ user: { uid: '123' } } as UserCredential));

    await component.onSubmit(registerForm);

    expect(mockUserService.register).toHaveBeenCalledWith('john@example.com', 'password123');
    expect(registerForm.reset).toHaveBeenCalled();
  });
  it('should handle errors during registration', async () => {
    const registerForm = {
      reset: jasmine.createSpy('reset')
    };

    spyOn(component['_userService'], 'register').and.returnValue(Promise.reject('Registration error'));
    spyOn(console, 'error');

    await component.onSubmit(registerForm);

    expect(component['_userService'].register).toHaveBeenCalledWith(component.user.email, component.user.pass);
    expect(console.error).toHaveBeenCalledWith('Registration error');
    expect(registerForm.reset).not.toHaveBeenCalled();
  });
});
