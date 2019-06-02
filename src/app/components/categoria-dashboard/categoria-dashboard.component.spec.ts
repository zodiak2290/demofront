import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaDashboardComponent } from './categoria-dashboard.component';

describe('CategoriaDashboardComponent', () => {
  let component: CategoriaDashboardComponent;
  let fixture: ComponentFixture<CategoriaDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
