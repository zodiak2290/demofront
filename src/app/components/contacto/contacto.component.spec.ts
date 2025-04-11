import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoComponent } from './contacto.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactoComponent],
      imports: [
        // Módulos de formularios (lo necesitas para los FormBuilders, etc.)
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        // Toastr: Para que funcione sin error "No provider for ToastConfig!"
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Agrega otros tests como quieras
});
