import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionHabilidadesComponent } from './seccion-habilidades.component';

describe('SeccionHabilidadesComponent', () => {
  let component: SeccionHabilidadesComponent;
  let fixture: ComponentFixture<SeccionHabilidadesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeccionHabilidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionHabilidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
