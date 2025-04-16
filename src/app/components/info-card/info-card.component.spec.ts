import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardComponent } from './info-card.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

describe('InfoCardComponent', () => {
  let component: InfoCardComponent;
  let fixture: ComponentFixture<InfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCardComponent, ToastrModule.forRoot(), TranslateModule.forRoot(), BrowserAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoCardComponent);
    component = fixture.componentInstance;
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
    spyOn(component['toastr'], 'success');
    spyOn(component['userService'], 'saveInfoUser').and.resolveTo();
    await component.save();
    expect(component['toastr'].success).toHaveBeenCalledWith(
      'Información guardada correctamente',
      'Éxito',
      { timeOut: 3000 }
    );
  });

  it('should call toastr error on save failure', async () => {
    component.isOwner = true;
    spyOn(component['toastr'], 'error');
    spyOn(component['userService'], 'saveInfoUser').and.rejectWith(new Error('Error'));
    await component.save();
    expect(component['toastr'].error).toHaveBeenCalledWith(
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
    spyOn(component['userService'], 'getFirstInfoUser').and.resolveTo(mockData);
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
    spyOn(component['userService'], 'getIdentity').and.returnValue(mockIdentity);
    component.uid = '456';
    spyOn(component.form, 'disable');
    await component.loadInfoUser();
    expect(component.form.disable).toHaveBeenCalled();
  });

  it('should enable the form after save is completed', async () => {
    component.isOwner = true;
    spyOn(component.form, 'enable');
    spyOn(component['userService'], 'saveInfoUser').and.resolveTo();
    await component.save();
    expect(component.form.enable).toHaveBeenCalled();
  });

  it('should call loadSocialLinks with the correct data when loading user info', async () => {
    const mockData = {
      socialLinks: [{ url: 'https://facebook.com/johndoe' }]
    };
    spyOn(component['userService'], 'getFirstInfoUser').and.resolveTo(mockData);
    spyOn(component, 'loadSocialLinks');
    await component.loadInfoUser();
    expect(component.loadSocialLinks).toHaveBeenCalledWith(mockData.socialLinks);
  });

  it('should handle empty socialLinks when loading user info', async () => {
    const mockData = {
      socialLinks: []
    };
    spyOn(component['userService'], 'getFirstInfoUser').and.resolveTo(mockData);
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
});
