import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycFormViewComponent } from './dinamyc-form-view.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from '@ngx-translate/core';

describe('DinamycFormViewComponent', () => {
  let component: DinamycFormViewComponent;
  let fixture: ComponentFixture<DinamycFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
        DinamycFormViewComponent,
      ],
      providers: [TranslateService],
    }).compileComponents();

    fixture = TestBed.createComponent(DinamycFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should render the template correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled).toBeTruthy();
  });

  it('should include the DinamycFormBuilderComponent', () => {
    const dinamycFormBuilderElement = fixture.nativeElement.querySelector(
      'app-dinamyc-form-builder',
    );
    expect(dinamycFormBuilderElement).toBeTruthy();
  });

  it('should use TranslateService', () => {
    const translateService = TestBed.inject(TranslateService);
    expect(translateService).toBeTruthy();
  });
});
