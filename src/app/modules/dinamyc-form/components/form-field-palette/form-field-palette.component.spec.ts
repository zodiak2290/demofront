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

  it('should set isMobile to true if window width is less than 1300', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1200);

    component.setMobile();

    expect(component.isMobile).toBeTrue();
  });

  it('should set isMobile to false if window width is greater than or equal to 1300', () => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1300);

    component.setMobile();

    expect(component.isMobile).toBeFalse();
  });

  it('should update isMobile on window resize', () => {
    spyOn(component, 'setMobile');
    const resizeEvent = new Event('resize');

    window.dispatchEvent(resizeEvent);

    expect(component.setMobile).toHaveBeenCalled();
  });

  it('should log window size on resize', () => {
    spyOn(console, 'log');
    const mockEvent = { target: { innerWidth: 1024, innerHeight: 768 } } as unknown as Event;

    component.onResize(mockEvent);

    expect(console.log).toHaveBeenCalledWith('Window size: 1024x768');
  });
});
