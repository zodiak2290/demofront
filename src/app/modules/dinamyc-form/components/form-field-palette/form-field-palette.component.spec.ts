import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPaletteComponent } from './form-field-palette.component';

describe('FormFieldPaletteComponent', () => {
  let component: FormFieldPaletteComponent;
  let fixture: ComponentFixture<FormFieldPaletteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldPaletteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldPaletteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
