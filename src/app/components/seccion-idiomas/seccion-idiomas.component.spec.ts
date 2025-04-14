import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionIdiomasComponent } from './seccion-idiomas.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';

describe('SeccionIdiomasComponent', () => {
  let component: SeccionIdiomasComponent;
  let fixture: ComponentFixture<SeccionIdiomasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionIdiomasComponent ],
      imports: [
        TranslateModule.forRoot() ,
        RouterTestingModule  // <-- Aquí se importa
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionIdiomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar dos tarjetas de idioma', () => {
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(2);
  });

  it('debería contener texto de idioma en inglés', () => {
    const cardText = fixture.debugElement.nativeElement.textContent;
    expect(cardText).toContain('lenguajes.en');
    expect(cardText).toContain('Intermedio');
  });

  it('debería contener texto de idioma en español', () => {
    const cardText = fixture.debugElement.nativeElement.textContent;
    expect(cardText).toContain('lenguajes.es');
    expect(cardText).toContain('Nativo');
  });

  it('debería tener tarjeta con fondo info y otra con fondo success', () => {
    const infoCard = fixture.debugElement.query(By.css('.bg-info'));
    const successCard = fixture.debugElement.query(By.css('.bg-success'));
    expect(infoCard).toBeTruthy();
    expect(successCard).toBeTruthy();
  });
});
