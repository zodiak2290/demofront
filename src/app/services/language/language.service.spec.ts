import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/enums/languages.enum';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [
        // Módulo de testing HTTP
        HttpClientTestingModule,
        // Módulo de ngx-translate con forRoot
        TranslateModule.forRoot()
      ],
      providers: [
        LanguageService
      ]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the language to Spanish by default', () => {
    expect(service.getLang()).toBe(LANGUAGES.SPANISH);
  });

  it('should toggle the language from Spanish to English', () => {
    service.toggleLanguage();
    expect(service.getLang()).toBe(LANGUAGES.ENGLISH);
  });

  it('should toggle the language from English to Spanish', () => {
    service.toggleLanguage(); // Cambia a inglés
    service.toggleLanguage(); // Cambia de nuevo a español
    expect(service.getLang()).toBe(LANGUAGES.SPANISH);
  });

  it('should set the language to English', () => {
    service.setLang(LANGUAGES.ENGLISH);
    expect(service.getLang()).toBe(LANGUAGES.ENGLISH);
  });

  it('should set the language to Spanish', () => {
    service.setLang(LANGUAGES.SPANISH);
    expect(service.getLang()).toBe(LANGUAGES.SPANISH);
  });

  it('should implement the language', () => {
    const lang = LANGUAGES.ENGLISH;
    const spy = spyOn(service, 'implementLang').and.callThrough();
    service.setLang(lang);
    expect(spy).toHaveBeenCalledWith(lang);
  });

  it('should get the current theme', () => {
    const lang = LANGUAGES.ENGLISH;
    service.setLang(lang);
    expect(service.getLang()).toBe(lang);
  });

  it('should save the language to localStorage', () => {
    const lang = LANGUAGES.SPANISH;
    service.setLang(lang);
    expect(localStorage.getItem('language')).toBe(lang);
  });

  it('should retrieve the language from localStorage', () => {
    const lang = LANGUAGES.ENGLISH;
    localStorage.setItem('language', lang);
    service.init();
    expect(service.getLang()).toBe(lang);
  });

  it('should set the language to Spanish if localStorage is empty', () => {
    localStorage.removeItem('language');
    service.init();
    expect(service.getLang()).toBe(LANGUAGES.SPANISH);
  });

  it('should set the language to Spanish if localStorage has an invalid value', () => {
    localStorage.setItem('language', 'invalid');
    service.init();
    expect(service.getLang()).toBe(LANGUAGES.SPANISH);
  });

});
