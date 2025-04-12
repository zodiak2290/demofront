import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SeccionHabilidadesComponent } from 'src/app/modules/graficos/components/seccion-habilidades/seccion-habilidades.component';
import { TranslateModule } from '@ngx-translate/core';
import { SeccionIdiomasComponent } from '../seccion-idiomas/seccion-idiomas.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot()
      ],
      declarations: [
        HomeComponent,
        SeccionHabilidadesComponent,
        SeccionIdiomasComponent
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
