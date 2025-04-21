import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementComponent } from './form-element.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormFieldType } from '../../enums/form-field-type';

describe('FormElementComponent', () => {
  let component: FormElementComponent;
  let fixture: ComponentFixture<FormElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormElementComponent);
    component = fixture.componentInstance;
    component.element = {
      type: FormFieldType.Text,
      label: 'Nombre',
      placeholder: 'Escribe tu nombre',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event when edit is called', () => {
    spyOn(component.edit, 'emit');
    const updatedElement = { ...component.element, placeholder: 'Updated Placeholder' };
    component.edit.emit(updatedElement);
    expect(component.edit.emit).toHaveBeenCalledWith(updatedElement);
  });

  it('should emit remove event when remove is called', () => {
    spyOn(component.remove, 'emit');
    const indexToRemove = 1;
    component.remove.emit(indexToRemove);
    expect(component.remove.emit).toHaveBeenCalledWith(indexToRemove);
  });

  it('should set placeholder using translate service if not provided', () => {
    component.element = {
      type: FormFieldType.Text,
      label: 'Apellido',
      placeholder: '',
    };
    spyOn(component['translate'], 'instant').and.returnValue('Translated Placeholder');
    component.ngOnInit();
    expect(component.element.placeholder).toBe('Translated Placeholder');
  });

  it('should not override placeholder if already provided', () => {
    const initialPlaceholder = 'Custom Placeholder';
    component.element = {
      type: FormFieldType.Text,
      label: 'Apellido',
      placeholder: initialPlaceholder,
    };
    component.ngOnInit();
    expect(component.element.placeholder).toBe(initialPlaceholder);
  });
});
