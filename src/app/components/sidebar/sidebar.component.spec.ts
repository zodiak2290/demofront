import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent
      ],
      imports: [
        TranslateModule.forRoot()
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
