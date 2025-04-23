import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
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

  it('should build the form when sections are provided', () => {
    const mockSections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [
              [{ id: '1', label: 'Field 1' } as FormField],
              [{ id: '2', label: 'Field 2', disabled: true } as FormField],
            ],
          },
        ],
      },
    ];

    component.sections = mockSections;
    component.ngOnChanges();

    expect(component.form).toBeTruthy();
    expect(component.form.get('1')).toBeTruthy();
    expect(component.form.get('2')).toBeTruthy();
    expect(component.form.get('1')?.value).toBe('');
    expect(component.form.get('2')?.value).toBe('');
    expect(component.form.get('2')?.disabled).toBeTrue();
  });

  it('should return the correct value for a form control', () => {
    const mockSections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [[{ id: '1', label: 'Field 1', disabled: false } as FormField]],
          },
        ],
      },
    ];

    component.sections = mockSections;
    component.ngOnChanges();
    component.form.get('1')?.setValue('test value');

    expect(component.getValue('1')).toBe('test value');
  });

  it('should handle empty sections gracefully', () => {
    component.sections = [];
    component.form = new FormGroup({});
    component.ngOnChanges();

    expect(component.form).toBeTruthy(); // ya no undefined
  });

  it('should process multiple rows and columns correctly', () => {
    const mockSections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [
              [{ id: 'field1', disabled: false } as FormField],
              [{ id: 'field2', disabled: true } as FormField],
            ],
          },
          {
            id: 'row1',
            columnCount: 2,
            columns: [[{ id: 'field3', disabled: false } as FormField]],
          },
        ],
      },
    ];

    component.sections = mockSections;
    component.ngOnChanges();

    expect(component.form.get('field1')).toBeTruthy();
    expect(component.form.get('field2')).toBeTruthy();
    expect(component.form.get('field3')).toBeTruthy();
  });
});
