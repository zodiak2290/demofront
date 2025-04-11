import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeccionIdiomasComponent } from './seccion-idiomas.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

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
});
