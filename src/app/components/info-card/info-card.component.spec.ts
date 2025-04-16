import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardComponent } from './info-card.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  beforeEach(async () => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['getFirstInfoUser', 'getIdentity', 'saveInfoUser']);
    toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error'])
    await TestBed.configureTestingModule({
      imports: [InfoCardComponent, ToastrModule.forRoot(), TranslateModule.forRoot(), BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: ToastrService, useValue: toastrSpy  }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceSpy.getFirstInfoUser.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.form.value).toEqual({
      nombre: '',
      rol: '',
      hobbies: '',
      nacimiento: '',
      email: '',
      telefono: '',
      whatsapp: '',
      socialLinks: []
    });
  });

  it('should add a social link when addSocialLink is called and isOwner is true', () => {
    component.isOwner = true;
    component.addSocialLink();
    expect(component.socialLinks.length).toBe(1);
  });

  it('should not add a social link when addSocialLink is called and isOwner is false', () => {
    component.isOwner = false;
    component.addSocialLink();
    expect(component.socialLinks.length).toBe(0);
  });

  it('should remove a social link when removeSocialLink is called and isOwner is true', () => {
    component.isOwner = true;
    component.addSocialLink();
    component.removeSocialLink(0);
    expect(component.socialLinks.length).toBe(0);
  });

  it('should not remove a social link when removeSocialLink is called and isOwner is false', () => {
    component.isOwner = false;
    const socialLinksArray = new FormArray([
      new FormGroup({
        url: new FormControl('https://facebook.com')
      })
    ]);
    component.form.setControl('socialLinks', socialLinksArray);
    component.removeSocialLink(0);
    expect(component.socialLinks.length).toBe(1);
  });

  it('should disable the form when save is called', async () => {
    component.isOwner = true;
    spyOn(component.form, 'disable');
    await component.save();
    expect(component.form.disable).toHaveBeenCalled();
  });

  it('should call toastr success on successful save', async () => {
    component.isOwner = true;
    userServiceSpy.saveInfoUser.and.resolveTo();
    await component.save();
    expect(toastrSpy.success).toHaveBeenCalledWith(
      'Información guardada correctamente',
      'Éxito',
      { timeOut: 3000 }
    );

  });

  it('should call toastr error on save failure', async () => {
    component.isOwner = true;

    userServiceSpy.saveInfoUser.and.returnValue(Promise.reject(new Error('Error')));

    await component.save();
    expect(toastrSpy.error).toHaveBeenCalledWith(
      'Error al guardar la información',
      'Error',
      { timeOut: 3000 }
    );
  });

  it('should load user info on loadInfoUser', async () => {
    const mockData = {
      nombre: 'John Doe',
      rol: 'Developer',
      hobbies: 'Coding',
      nacimiento: '01/01/1990',
      email: 'john.doe@example.com',
      telefono: '123456789',
      whatsapp: '987654321',
      socialLinks: [{ url: 'https://facebook.com/johndoe' }]
    };
    userServiceSpy.getFirstInfoUser.and.resolveTo(mockData);
    await component.loadInfoUser();
    expect(component.form.value).toEqual(mockData);
  });


  it('should not disable the form when save is called and isOwner is false', async () => {
    component.isOwner = false;
    spyOn(component.form, 'disable');
    await component.save();
    expect(component.form.disable).not.toHaveBeenCalled();
  });

  it('should initialize isOwner as false by default', () => {
    expect(component.isOwner).toBeFalse();
  });

  it('should disable the form if the user is not the owner', async () => {

    const mockIdentity = { uid: '123' };
    userServiceSpy.getIdentity.and.returnValue(mockIdentity);
    userServiceSpy.getFirstInfoUser.and.resolveTo({ id: '456' });

    spyOn(component.form, 'disable');
    await component.loadInfoUser();
    expect(component.form.disable).toHaveBeenCalled();
  });

  it('should enable the form after save is completed', async () => {
    component.isOwner = true;
    spyOn(component.form, 'enable');
    userServiceSpy.getFirstInfoUser.and.resolveTo();
    await component.save();
    expect(component.form.enable).toHaveBeenCalled();
  });

  it('should call loadSocialLinks with the correct data when loading user info', async () => {
    const mockData = {
      socialLinks: [{ url: 'https://facebook.com/johndoe' }]
    };
    userServiceSpy.getFirstInfoUser.and.resolveTo(mockData);
    spyOn(component, 'loadSocialLinks');
    await component.loadInfoUser();
    expect(component.loadSocialLinks).toHaveBeenCalledWith(mockData.socialLinks);
  });

  it('should handle empty socialLinks when loading user info', async () => {
    const mockData = {
      socialLinks: []
    };
    userServiceSpy.getFirstInfoUser.and.resolveTo(mockData);
    spyOn(component, 'loadSocialLinks');
    await component.loadInfoUser();
    expect(component.loadSocialLinks).toHaveBeenCalledWith([]);
  });

  it('should correctly map social links when loadSocialLinks is called', () => {
    const mockLinks = [{ url: 'https://facebook.com/johndoe' }, { url: 'https://twitter.com/johndoe' }];
    component.loadSocialLinks(mockLinks);
    expect(component.socialLinks.length).toBe(2);
    expect(component.socialLinks.at(0).value).toEqual({ url: 'https://facebook.com/johndoe' });
    expect(component.socialLinks.at(1).value).toEqual({ url: 'https://twitter.com/johndoe' });
  });

  it('should handle null or undefined socialLinks in loadSocialLinks', () => {
    component.loadSocialLinks(null);
    expect(component.socialLinks.length).toBe(0);

    component.loadSocialLinks(undefined);
    expect(component.socialLinks.length).toBe(0);
  });

  it('should patch form and set isOwner correctly if data is returned', async () => {
    const mockData = {
      id: 'user-123',
      nombre: 'Alberto',
      rol: 'Desarrollador',
      hobbies: 'Leer',
      nacimiento: '1990-02-22',
      email: 'test@example.com',
      telefono: '1234567890',
      whatsapp: '1234567890',
      socialLinks: [{ url: 'https://github.com/user' }]
    };

    const mockIdentity = { uid: 'user-123' };

    userServiceSpy.getFirstInfoUser.and.resolveTo(mockData);
    userServiceSpy.getIdentity.and.returnValue(mockIdentity);

    await component.loadInfoUser();

    expect(component.form.value.nombre).toBe('Alberto');
    expect(component.socialLinks.length).toBe(1);
    expect(component.isOwner).toBeTrue();
    expect(component.form.enabled).toBeTrue();
    expect(component.isLoading).toBeFalse();
  });

  it('should disable form if user is not owner', async () => {
    const mockData = { id: 'otro-usuario', nombre: 'Otro' };
    userServiceSpy.getFirstInfoUser.and.resolveTo(mockData);
    userServiceSpy.getIdentity.and.returnValue({ uid: 'yo-mismo' }); // ✅ así

    await component.loadInfoUser();

    expect(component.isOwner).toBeFalse();
    expect(component.form.disabled).toBeTrue();
  });

  it('should not patch form if no data returned', async () => {
    userServiceSpy.getFirstInfoUser.and.resolveTo(null);
    userServiceSpy.getIdentity.and.returnValue({ uid: 'user-123' });

    const patchSpy = spyOn(component.form, 'patchValue');

    await component.loadInfoUser();

    expect(patchSpy).not.toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

});
