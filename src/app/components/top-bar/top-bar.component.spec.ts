import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TopBarComponent } from './top-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user/user.service';
import { BehaviorSubject } from 'rxjs';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [TopBarComponent],
    imports: [RouterTestingModule,
        TranslateModule.forRoot()],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default language set to Spanish', () => {
    expect(component.activeLang).toBe('es'); // Assuming LANGUAGES.SPANISH is 'es'
  });

  it('should call logout and navigate to /home', async () => {
    const userServiceSpy = spyOn(component['userService'], 'logout').and.resolveTo();
    const routerSpy = spyOn(component['router'], 'navigate');
    await component.logout();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to /login on login', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.login();
    expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should update name when userService data changes', () => {
    const userServiceSpy = TestBed.inject(UserService);
    const mockUserData = { nombre: 'Jane Doe' };
    spyOn(userServiceSpy, 'infoUser').and.returnValue(mockUserData);
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.name).toBe('Jane Doe');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.user-name')?.textContent).toContain('Jane Doe');
  });


});
