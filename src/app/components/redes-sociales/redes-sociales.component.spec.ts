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

  it('should return correct social links', () => {
    component.data = {
      socialLinks: [
        { url: 'https://linkedin.com/in/example' },
        { url: 'https://twitter.com/example' },
        { url: 'https://github.com/example' }
      ]
    };
    const socialLinks = component.getSocialLinks();
    expect(socialLinks).toEqual([
      'https://linkedin.com/in/example',
      'https://twitter.com/example',
      'https://github.com/example'
    ]);
  });

  it('should return correct social name for a given URL', () => {
    expect(component.getSocialName('https://linkedin.com/in/example')).toBe('LinkedIn');
    expect(component.getSocialName('https://twitter.com/example')).toBe('Twitter');
    expect(component.getSocialName('https://facebook.com/example')).toBe('Facebook');
    expect(component.getSocialName('https://github.com/example')).toBe('GitHub');
    expect(component.getSocialName('https://example.com')).toBe('Link');
  });

  it('should call getIcon from SocialIconService with correct URL', () => {
    const fakeIcon = {} as any;
    const socialIconServiceSpy = spyOn(component['socialIconService'], 'getIcon').and.returnValue(fakeIcon);
    const icon = component.getIcon('https://linkedin.com/in/example');
    expect(socialIconServiceSpy).toHaveBeenCalledWith('https://linkedin.com/in/example');
    expect(icon).toBe(fakeIcon);
  });

});
