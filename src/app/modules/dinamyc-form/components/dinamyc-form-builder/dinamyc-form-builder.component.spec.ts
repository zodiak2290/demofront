import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycFormBuilderComponent } from './dinamyc-form-builder.component';
import { DEFAULT_FORM_FIELDS } from '../../constants/form-field-palette.data';
import { FormField } from '../../interfaces/form.-field.interface';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('DinamycFormBuilderComponent', () => {
  let component: DinamycFormBuilderComponent;
  let fixture: ComponentFixture<DinamycFormBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DinamycFormBuilderComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TranslateStore,
        TranslateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DinamycFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default form fields', () => {
    expect(component.elements).toEqual(jasmine.arrayContaining(DEFAULT_FORM_FIELDS));
  });

  it('should add a cloned element to formElements on drop from another container', () => {
    const event = {
      previousContainer: { data: DEFAULT_FORM_FIELDS },
      container: { data: component.formElements },
      previousIndex: 0,
      currentIndex: 0,
    } as any;

    component.drop(event);

    expect(component.formElements.length).toBe(1);
    expect(component.formElements[0].id).toBeDefined();
    expect(component.formElements[0]).toEqual(jasmine.objectContaining(DEFAULT_FORM_FIELDS[0]));
  });

  it('should reorder elements within the same container on drop', () => {
    component.formElements = [
      { id: '1', label: 'Field 1' } as FormField,
      { id: '2', label: 'Field 2' } as FormField,
    ];

    expect(component.formElements[0].id).toBe('1');
    expect(component.formElements[1].id).toBe('2');
    const container = { data: component.formElements };
    // Simula el evento drop
    component.drop({
      previousIndex: 0,
      currentIndex: 1,
      container,
      previousContainer: container,
      item: {} as any,
      isPointerOverContainer: true,
      distance: { x: 0, y: 0 },
    } as CdkDragDrop<FormField[]>);

    expect(component.formElements[0].id).toBe('2');
    expect(component.formElements[1].id).toBe('1');
  });

  it('should remove an element from a specific column', () => {
    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [
              [{ id: '1', label: 'Field 1' } as FormField],
              [{ id: '2', label: 'Field 2' } as FormField],
            ],
          },
        ],
      },
    ];

    component.removeElement(0, 0, 0, 0);

    const column = component.sections[0].rows[0].columns[0];
    expect(column.length).toBe(0);
    expect(component.sections[0].rows[0].columns[1][0].id).toBe('2');
  });

  it('should set selectedField and its location when editing a field', () => {
    const field = { id: '1', label: 'Field 1' } as FormField;

    component.editField(field, 0, 0, 1, 0); // sectionIndex, rowIndex, columnIndex, fieldIndex

    expect(component.selectedField).toBe(field);
    expect(component.selectedFieldLocation).toEqual({
      sectionIndex: 0,
      rowIndex: 0,
      columnIndex: 1,
      fieldIndex: 0,
    });
  });

  it('should save edited field in the correct location and clear selectedField', () => {
    const originalField = { id: '1', label: 'Field 1' } as FormField;
    const updatedField = { id: '1', label: 'Updated Field 1' } as FormField;

    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 1,
            columns: [[originalField]],
          },
        ],
      },
    ];

    component.selectedField = originalField;
    component.selectedFieldLocation = {
      sectionIndex: 0,
      rowIndex: 0,
      columnIndex: 0,
      fieldIndex: 0,
    };

    component.saveField(updatedField);

    expect(component.sections[0].rows[0].columns[0][0]).toEqual(updatedField);
    expect(component.selectedField).toBeNull();
    expect(component.selectedFieldLocation).toBeNull();
  });

  it('should clear selectedField on cancelEdit', () => {
    component.selectedField = { id: '1', label: 'Field 1' } as FormField;

    component.cancelEdit();

    expect(component.selectedField).toBeNull();
  });

  it('should clone an element when dropping from another container', () => {
    const mockElement = { id: 'x', label: 'Clonable Field' } as FormField;

    component.formElements = [];

    const event = {
      previousIndex: 0,
      currentIndex: 0,
      previousContainer: { data: [mockElement] },
      container: { data: component.formElements },
    } as CdkDragDrop<FormField[]>;

    component.drop(event);

    expect(component.formElements.length).toBe(1);
    expect(component.formElements[0].id).not.toBe('x');
  });

  it('should add a new row to a section with the specified column count', () => {
    component.sections = [{ id: 'section1', title: 'Sección 1', rows: [] }];

    component.addRow(0, 3);

    expect(component.sections[0].rows.length).toBe(1);
    expect(component.sections[0].rows[0].columnCount).toBe(3);
    expect(component.sections[0].rows[0].columns.length).toBe(3);
  });

  it('should add a new section with a unique ID and title', () => {
    component.sections = [];

    component.addSection();

    expect(component.sections.length).toBe(1);
    expect(component.sections[0].id).toBe('section1');
    expect(component.sections[0].title).toBe('Sección 0');
  });

  it('should change the column count of a row and redistribute fields', () => {
    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [
              [{ id: '1', label: 'Field 1' } as FormField],
              [{ id: '2', label: 'Field 2' } as FormField],
            ],
          },
        ],
      },
    ];

    component.changeColumnCount(0, 0, 3);

    const row = component.sections[0].rows[0];
    expect(row.columnCount).toBe(3);
    expect(row.columns.length).toBe(3);
    expect(row.columns[0].length).toBe(1);
    expect(row.columns[1].length).toBe(1);
    expect(row.columns[2].length).toBe(0);
  });

  it('should remove a row from a section and update drop list IDs', () => {
    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          { id: 'row1', columnCount: 2, columns: [[], []] },
          { id: 'row2', columnCount: 2, columns: [[], []] },
        ],
      },
    ];

    component.removeRow(0, 0);

    expect(component.sections[0].rows.length).toBe(1);
    expect(component.sections[0].rows[0].id).toBe('row2');
  });

  it('should handle dropping a field into a specific column', () => {
    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          {
            id: 'row1',
            columnCount: 2,
            columns: [[], []],
          },
        ],
      },
    ];

    const event = {
      previousIndex: 0,
      currentIndex: 0,
      previousContainer: { id: 'toolbox-list', data: [{ id: '1', label: 'Field 1' } as FormField] },
      container: { id: 'row1-col0', data: [] },
      item: { data: { id: '1', label: 'Field 1' } as FormField },
    } as CdkDragDrop<FormField[]>;

    component.onDropField(event, 0, 0, 0);

    expect(component.sections[0].rows[0].columns[0].length).toBe(1);
    expect(component.sections[0].rows[0].columns[0][0].id).toBe('field1');
  });

  it('should rebuild drop list IDs after modifying sections or rows', () => {
    component.sections = [
      {
        id: 'section1',
        title: 'Sección 1',
        rows: [
          { id: 'row1', columnCount: 2, columns: [[], []] },
          { id: 'row2', columnCount: 1, columns: [[]] },
        ],
      },
    ];

    const ids = component.connectedDropListIds;

    expect(ids).toEqual(['toolbox-list', 'row1-col0', 'row1-col1', 'row2-col0']);
  });
});
