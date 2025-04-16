import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DatosPersonalesComponent } from './datos-personales.component';

describe('DatosPersonalesComponent', () => {
  let component: DatosPersonalesComponent;
  let fixture: ComponentFixture<DatosPersonalesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosPersonalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format keys correctly', () => {
    const formattedKey = component.formatKey('test_key');
    expect(formattedKey).toBe('Test key');
  });

  it('should return true for primitive values', () => {
    expect(component.isPrimitive('string')).toBeTrue();
    expect(component.isPrimitive(123)).toBeTrue();
    expect(component.isPrimitive(true)).toBeTrue();
    expect(component.isPrimitive({})).toBeFalse();
    expect(component.isPrimitive([])).toBeFalse();
  });

  it('should determine field visibility correctly', () => {
    expect(component.isFieldVisible('socialLinks')).toBeFalse();
    expect(component.isFieldVisible('name')).toBeTrue();
  });

  it('should generate correct WhatsApp URL', () => {
    component.data = { whatsapp: '123 456 7890' };
    expect(component.whatsappUrl).toBe('https://wa.me/521234567890');
  });

  it('should return null for WhatsApp URL if no number is provided', () => {
    component.data = {};
    expect(component.whatsappUrl).toBeNull();
  });

  it('should escape email correctly', () => {
    component.data = { email: 'test@example.com' };
    expect(component.emailEscaped).toBe('test&#64;example.com');
  });

  it('should return empty string for escaped email if no email is provided', () => {
    component.data = {};
    expect(component.emailEscaped).toBe('');
  });
});
