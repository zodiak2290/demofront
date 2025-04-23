import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycFormComponent } from './dinamyc-form.component';
import { FormField } from '../../interfaces/form.-field.interface';

describe('DinamycFormComponent', () => {
  let component: DinamycFormComponent;
  let fixture: ComponentFixture<DinamycFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamycFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinamycFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the correct responsive column class', () => {
    expect(component.getResponsiveColumnClass(1)).toBe('col-12');
    expect(component.getResponsiveColumnClass(2)).toBe('col-12 col-sm-6');
    expect(component.getResponsiveColumnClass(3)).toBe('col-12 col-sm-6 col-md-4');
    expect(component.getResponsiveColumnClass(4)).toBe('col-12 col-sm-6 col-md-3');
    expect(component.getResponsiveColumnClass(6)).toBe('col-6 col-md-2');
    expect(component.getResponsiveColumnClass(12)).toBe('col-6 col-md-1');
    expect(component.getResponsiveColumnClass(5)).toBe('col-12'); // fallback
  });

  it('should log the field on button click', () => {
    const consoleSpy = spyOn(console, 'log');
    const mockField = { id: 'field1', disabled: false };

    component.onButtonClick(mockField);

    expect(consoleSpy).toHaveBeenCalledWith(mockField);
  });
});
