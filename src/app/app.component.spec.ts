import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { TopBarComponent } from './components/top-bar/top-bar.component';
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SidebarComponent,
        TopBarComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Demo');
  });

  it('should initialize language service on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const languageServiceSpy = spyOn(app['languageService'], 'init');
    app.ngOnInit();
    expect(languageServiceSpy).toHaveBeenCalled();
  });

  it('should initialize theme service on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const themeServiceSpy = spyOn(app['themeService'], 'init');
    app.ngOnInit();
    expect(themeServiceSpy).toHaveBeenCalled();
  });

  it('should update identity and token on ngDoCheck', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const userServiceSpy = spyOn(app['_userService'], 'getIdentity').and.returnValue('testIdentity');
    const tokenSpy = spyOn(app['_userService'], 'getToken').and.returnValue('testToken');
    app.ngDoCheck();
    expect(userServiceSpy).toHaveBeenCalled();
    expect(tokenSpy).toHaveBeenCalled();
    expect(app.identity).toEqual('testIdentity');
    expect(app.token).toEqual('testToken');
  });

  it('should initialize toggle sidebar functionality', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const rendererSpy = spyOn(app['renderer'], 'listen');
    app.initToggleSidebar();
    expect(rendererSpy).toHaveBeenCalled();
  });
});
