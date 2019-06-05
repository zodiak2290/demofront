import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Planta2Component } from './planta2.component';

describe('Planta2Component', () => {
  let component: Planta2Component;
  let fixture: ComponentFixture<Planta2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Planta2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Planta2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
