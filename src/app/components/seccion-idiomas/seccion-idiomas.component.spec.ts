import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionIdiomasComponent } from './seccion-idiomas.component';

describe('SeccionIdiomasComponent', () => {
  let component: SeccionIdiomasComponent;
  let fixture: ComponentFixture<SeccionIdiomasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionIdiomasComponent ]
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
});
