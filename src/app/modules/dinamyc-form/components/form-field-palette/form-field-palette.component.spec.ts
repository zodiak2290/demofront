import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPaletteComponent } from './form-field-palette.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormField } from '../../interfaces/form.-field.interface';

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

  it('should have an empty elements array by default', () => {
    expect(component.elements).toEqual([]);
  });

  it('should emit the dropped event when an item is dropped', () => {
    const mockEvent = {} as CdkDragDrop<FormField[]>;
    spyOn(component.dropped, 'emit');

    component.dropped.emit(mockEvent);

    expect(component.dropped.emit).toHaveBeenCalledWith(mockEvent);
  });
});
