import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, TranslateModule.forRoot()],
      declarations: [SidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // renders the view
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a link to the profile (routerLink="profile")', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="profile"]'));
    expect(link).toBeTruthy();
  });

  it('should display a smiley icon in the branding', () => {
    const icon = fixture.debugElement.query(By.css('.sidebar-brand-icon i.far.fa-grin'));
    expect(icon).toBeTruthy();
  });

  it('should have two collapsible menus', () => {
    const collapsedMenus = fixture.debugElement.queryAll(By.css('.collapse-inner'));
    expect(collapsedMenus.length).toBe(1);
  });
});
