import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamycFormViewComponent } from './dinamyc-form-view.component';

describe('DinamycFormViewComponent', () => {
  let component: DinamycFormViewComponent;
  let fixture: ComponentFixture<DinamycFormViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamycFormViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DinamycFormViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
