import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEditorComponent } from './field-editor.component';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
describe('FieldEditorComponent', () => {
  let component: FieldEditorComponent;
  let fixture: ComponentFixture<FieldEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FieldEditorComponent,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize editedField with translated label on ngOnInit', () => {
    const translateSpy = spyOn(component['translate'], 'instant').and.returnValue(
      'Translated Label',
    );
    component.editedField = { label: 'Original Label', options: [] } as any;
    component.ngOnInit();
    expect(translateSpy).toHaveBeenCalledWith('Original Label');
    expect(component.editedField.label).toBe('Translated Label');
  });

  it('should copy input field to editedField on ngOnChanges', () => {
    component.field = { label: 'Test Label', options: ['Option1', 'Option2'] } as any;
    component.ngOnChanges();
    expect(component.editedField).toEqual(component.field);
  });

  it('should emit saveChanges with editedField on onSave', () => {
    const saveChangesSpy = spyOn(component.saveChanges, 'emit');
    component.editedField = { label: 'Saved Label', options: ['Option1'] } as any;
    component.onSave();
    expect(saveChangesSpy).toHaveBeenCalledWith(component.editedField);
  });

  it('should emit cancelReq on onCancel', () => {
    const cancelReqSpy = spyOn(component.cancelReq, 'emit');
    component.onCancel();
    expect(cancelReqSpy).toHaveBeenCalled();
  });

  it('should update options in editedField on updateOptions', () => {
    const optionsString = 'Option1, Option2, Option3';
    component.updateOptions(optionsString);
    expect(component.editedField.options).toEqual(['Option1', 'Option2', 'Option3']);
  });
});
