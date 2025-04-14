import { TestBed } from '@angular/core/testing';

import { ThemeService } from './theme.service';
import { THEMES } from 'src/app/enums/themes.enum';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the theme to light by default', () => {
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should toggle the theme from light to dark', () => {
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe(THEMES.DARK);
  });

  it('should toggle the theme from dark to light', () => {
    service.toggleTheme(); // Cambia a oscuro
    service.toggleTheme(); // Cambia de nuevo a claro
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should set the theme to dark', () => {
    service.setTheme(THEMES.DARK);
    expect(service.getCurrentTheme()).toBe(THEMES.DARK);
  });

  it('should set the theme to light', () => {
    service.setTheme(THEMES.LIGHT);
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should implement the theme', () => {
    const theme = THEMES.DARK;
    const spy = spyOn(service, 'implementTheme').and.callThrough();
    service.setTheme(theme);
    expect(spy).toHaveBeenCalledWith(theme);
  });

  it('should get the current theme', () => {
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should initialize the theme to light if no theme is set in localStorage', () => {
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should initialize the theme to dark if dark is set in localStorage', () => {
    localStorage.setItem('theme', THEMES.DARK);
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.DARK);
  });

  it('should initialize the theme to light if an invalid theme is set in localStorage', () => {
    localStorage.setItem('theme', 'invalid-theme' as THEMES);
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should save the theme to localStorage', () => {
    service.setTheme(THEMES.DARK);
    expect(localStorage.getItem('theme')).toBe(THEMES.DARK);
  });

  it('should retrieve the theme from localStorage', () => {
    localStorage.setItem('theme', THEMES.LIGHT);
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should apply the dark theme to the body', () => {
    service.setTheme(THEMES.DARK);
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('should remove the dark theme from the body when light is set', () => {
    service.setTheme(THEMES.LIGHT);
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });

  it('should not apply the dark theme if the theme is light', () => {
    service.setTheme(THEMES.LIGHT);
    expect(document.body.classList.contains('dark-theme')).toBeFalse();
  });

  it('should apply the dark theme if the theme is dark', () => {
    service.setTheme(THEMES.DARK);
    expect(document.body.classList.contains('dark-theme')).toBeTrue();
  });

  it('should set the theme to light if localStorage is empty', () => {
    localStorage.removeItem('theme');
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });

  it('should set the theme to light if localStorage has an invalid value', () => {
    localStorage.setItem('theme', 'invalid');
    service.init();
    expect(service.getCurrentTheme()).toBe(THEMES.LIGHT);
  });


});
