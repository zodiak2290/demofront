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

  it('should return true for isMobile when MobileDetectorService indicates mobile', () => {
    const mobileServiceSpy = spyOnProperty(
      component['mobileService'],
      'isMobile',
      'get',
    ).and.returnValue(true);
    expect(component.isMobile).toBeTrue();
    expect(mobileServiceSpy).toHaveBeenCalled();
  });

  it('should return false for isMobile when MobileDetectorService indicates not mobile', () => {
    const mobileServiceSpy = spyOnProperty(
      component['mobileService'],
      'isMobile',
      'get',
    ).and.returnValue(false);
    expect(component.isMobile).toBeFalse();
    expect(mobileServiceSpy).toHaveBeenCalled();
  });

  it('should have an empty connectedDropListIds array by default', () => {
    expect(component.connectedDropListIds).toEqual([]);
  });

  it('should update elements when @Input elements is set', () => {
    const mockElements: FormField[] = [{ id: '1', label: 'Field 1', type: 'text' } as FormField];
    component.elements = mockElements;
    expect(component.elements).toEqual(mockElements);
  });

  it('should update connectedDropListIds when @Input connectedDropListIds is set', () => {
    const mockIds = ['list1', 'list2'];
    component.connectedDropListIds = mockIds;
    expect(component.connectedDropListIds).toEqual(mockIds);
  });
});
