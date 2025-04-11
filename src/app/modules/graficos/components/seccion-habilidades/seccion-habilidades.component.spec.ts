import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SeccionHabilidadesComponent } from './seccion-habilidades.component';

describe('SeccionHabilidadesComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SeccionHabilidadesComponent
      ],
      imports: [
        TranslateModule.forRoot() // <-- Se declara aquí
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SeccionHabilidadesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
