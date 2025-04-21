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

  it('should remove an element from formElements', () => {
    component.formElements = [
      { id: '1', label: 'Field 1' } as FormField,
      { id: '2', label: 'Field 2' } as FormField,
    ];

    component.removeElement(0);

    expect(component.formElements.length).toBe(1);
    expect(component.formElements[0].id).toBe('2');
  });

  it('should set selectedField when editing a field', () => {
    const field = { id: '1', label: 'Field 1' } as FormField;

    component.editField(field);

    expect(component.selectedField).toBe(field);
  });

  it('should save edited field and clear selectedField', () => {
    const field = { id: '1', label: 'Field 1' } as FormField;
    component.formElements = [field];

    const updatedField = { id: '1', label: 'Updated Field 1' } as FormField;
    component.saveField(updatedField);

    expect(component.formElements[0]).toEqual(updatedField);
    expect(component.selectedField).toBeNull();
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
});
