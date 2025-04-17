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

  it('should initialize orderedFields correctly based on data', () => {
    component.data = {
      fieldOrder: ['nombre', 'email'],
      nombre: 'John Doe',
      email: 'john.doe@example.com'
    };
    component.showData();
    expect(component.orderedFields).toEqual([
      { key: 'nombre', label: 'Nombre', value: 'John Doe' },
      { key: 'email', label: 'Email', value: 'john.doe@example.com' }
    ]);
  });

  it('should handle missing fieldOrder gracefully', () => {
    component.data = {
      nombre: 'John Doe',
      email: 'john.doe@example.com'
    };
    component.showData();
    expect(component.orderedFields).toEqual([]);
  });

  it('should use default label if FIELD_LABELS does not contain the key', () => {
    component.data = {
      fieldOrder: ['unknownField'],
      unknownField: 'Some Value'
    };
    component.showData();
    expect(component.orderedFields).toEqual([
      { key: 'unknownField', label: 'unknownField', value: 'Some Value' }
    ]);
  });

  it('should handle empty data gracefully', () => {
    component.data = {};
    component.showData();
    expect(component.orderedFields).toEqual([]);
  });

  it('should handle null or undefined data gracefully', () => {
    component.data = null as any;
    component.showData();
    expect(component.orderedFields).toEqual([]);
  });

});
