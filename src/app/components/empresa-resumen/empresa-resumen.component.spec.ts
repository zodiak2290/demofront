import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaResumenComponent } from './empresa-resumen.component';

describe('EmpresaResumenComponent', () => {
  let component: EmpresaResumenComponent;
  let fixture: ComponentFixture<EmpresaResumenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaResumenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
