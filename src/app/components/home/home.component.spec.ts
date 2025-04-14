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

  it('should render app-seccion-habilidades component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-seccion-habilidades')).not.toBeNull();
  });

  it('should render app-seccion-idiomas component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-seccion-idiomas')).not.toBeNull();
  });

});
