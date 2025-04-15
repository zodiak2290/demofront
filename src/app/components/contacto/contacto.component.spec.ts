import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { ContactoComponent } from './contacto.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import * as firebaseDatabase from 'firebase/database';
import { ContactoService } from 'src/app/services/contacto/contacto.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
describe('ContactoComponent', () => {
  let component: ContactoComponent;
  let fixture: ComponentFixture<ContactoComponent>;
  const toastrMock = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
  };
  const contactoServiceMock = jasmine.createSpyObj('ContactoService', ['enviarFormulario']);
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
        ToastrModule.forRoot()],
    providers: [
        { provide: ToastrService, useValue: toastrMock },
        { provide: ContactoService, useValue: contactoServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
}).compileComponents();
  });



  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoComponent);
    component = fixture.componentInstance;

    // Limpia el formulario
    component.form.reset();
    component.submitted = false;
    component.enviando = false;

    // Reinicia los espías
    contactoServiceMock.enviarFormulario.calls.reset();
    toastrMock.success.calls?.reset?.();
    toastrMock.error.calls?.reset?.();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should have a form with 4 controls', () => {
    expect(component.form.contains('name')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('subject')).toBeTruthy();
    expect(component.form.contains('message')).toBeTruthy();
  });

  it('should make the name control required', () => {
    const control = component.form.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control required', () => {
    const control = component.form.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the subject control required', () => {
    const control = component.form.get('subject');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the message control required', () => {
    const control = component.form.get('message');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should call enviarFormulario and set submitted to true when form is valid', fakeAsync(() => {

    contactoServiceMock.enviarFormulario.and.returnValue(Promise.resolve());
    component.form.setValue({
      name: 'Nombre',
      email: 'email@test.com',
      subject: 'Un Asunto',
      message: 'Mensaje para todos',
    });
    component.onSubmit();
    expect(contactoServiceMock.enviarFormulario).toHaveBeenCalled();
    tick();
    expect(toastrMock.success).toHaveBeenCalledWith('Mensaje enviado correctamente', 'Aviso');
    flush()
  }));


  it('should not call enviarFormulario if form is invalid', () => {
    component.form.setValue({
      name: '',
      email: 'correo@invalido',
      subject: '',
      message: ''
    });

    expect(component.form.valid).toBeFalse();
    component.onSubmit();

    expect(contactoServiceMock.enviarFormulario).not.toHaveBeenCalled();
    expect(toastrMock.error).toHaveBeenCalledWith('Formulario invalido', 'Error');
  });

  it('should reset the form when onReset is called', () => {
    component.onReset();
    expect(component.form.value).toEqual({
      name: null,
      email: null,
      subject: null,
      message: null
    });
  });

  it('should set enviando to false after form submission', () => {
    component.onSubmit();
    expect(component.enviando).toBe(false);
  });

  it('should set submitted to false after form reset', () => {
    component.onReset();
    expect(component.submitted).toBe(false);
  });

  it('should set form to pristine after reset', () => {
    component.onReset();
    expect(component.form.pristine).toBe(true);
  });

  it('should set form to pristine after reset', () => {
    component.onReset();
    expect(component.form.pristine).toBe(true);
  });

  it('should show error message if enviarFormulario fails', fakeAsync(() => {
    contactoServiceMock.enviarFormulario.and.returnValue(Promise.reject());

    component.form.setValue({
      name: 'Nombre',
      email: 'email@test.com',
      subject: 'Asunto',
      message: 'Mensaje válido'
    });

    component.onSubmit();
    tick();

    expect(toastrMock.error).toHaveBeenCalledWith('No fue posible enviar su mensaje', 'Importante');
    expect(component.enviando).toBeFalse();
    flush();
  }));

  it('should reset form and submitted flag when onReset is called', () => {
    component.form.setValue({
      name: 'Nombre',
      email: 'email@test.com',
      subject: 'Asunto',
      message: 'Mensaje válido'
    });

    component.submitted = true;
    component.onReset();

    expect(component.form.value).toEqual({
      name: null,
      email: null,
      subject: null,
      message: null
    });
    expect(component.submitted).toBeFalse();
  });

  it('should set enviando to true during submission and false after', fakeAsync(() => {
    contactoServiceMock.enviarFormulario.and.returnValue(Promise.resolve());

    component.form.setValue({
      name: 'Nombre',
      email: 'email@test.com',
      subject: 'Asunto',
      message: 'Mensaje válido'
    });

    component.onSubmit();
    expect(component.enviando).toBeTrue();

    tick();
    expect(component.enviando).toBeFalse();
    flush();
  }));



});
