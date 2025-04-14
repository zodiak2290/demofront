import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoComponent } from '../contacto/contacto.component'; // Asegúrate de que la ruta sea correcta
import { RedesSocialesComponent } from '../redes-sociales/redes-sociales.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';


describe('RedesSocialesComponent', () => {

  let component: RedesSocialesComponent;
  let fixture: ComponentFixture<RedesSocialesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ContactoComponent,
        RedesSocialesComponent
      ],
      imports: [
        ToastrModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedesSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should render 4 social media links', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    expect(links.length).toBe(4);
  });

  it('should have a LinkedIn link', () => {
    const link = fixture.debugElement.query(By.css('a[href*="linkedin.com"]'));
    expect(link).toBeTruthy();
  });

  it('should have a Twitter link', () => {
    const link = fixture.debugElement.query(By.css('a[href*="twitter.com"]'));
    expect(link).toBeTruthy();
  });

  it('should have a Facebook link', () => {
    const link = fixture.debugElement.query(By.css('a[href*="facebook.com"]'));
    expect(link).toBeTruthy();
  });

  it('should have a GitHub link', () => {
    const link = fixture.debugElement.query(By.css('a[href*="github.com"]'));
    expect(link).toBeTruthy();
  });
});
