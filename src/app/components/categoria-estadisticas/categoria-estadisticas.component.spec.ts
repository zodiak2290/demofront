import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaEstadisticasComponent } from './categoria-estadisticas.component';

describe('CategoriaEstadisticasComponent', () => {
  let component: CategoriaEstadisticasComponent;
  let fixture: ComponentFixture<CategoriaEstadisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaEstadisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaEstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
