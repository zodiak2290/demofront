import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycFormBuilderComponent } from './dinamyc-form-builder.component';

describe('DinamycFormBuilderComponent', () => {
  let component: DinamycFormBuilderComponent;
  let fixture: ComponentFixture<DinamycFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamycFormBuilderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinamycFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
