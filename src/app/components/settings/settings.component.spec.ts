import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { TranslateModule } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/enums/languages.enum';
import { THEMES } from 'src/app/enums/themes.enum';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default selectedLanguage as SPANISH', () => {
    expect(component.selectedLanguage).toBe(LANGUAGES.SPANISH);
  });

  it('should have default selectedTheme as LIGHT', () => {
    expect(component.selectedTheme).toBe(THEMES.LIGHT);
  });

  it('should change language when cambiarLenguaje is called', () => {
    component.cambiarLenguaje(LANGUAGES.ENGLISH);
    expect(component.selectedLanguage).toBe(LANGUAGES.ENGLISH);
  });

  it('should change theme when cambiarTema is called', () => {
    component.cambiarTema(THEMES.DARK);
    expect(component.selectedTheme).toBe(THEMES.DARK);
  });

  it('should call setLang of LanguageService when cambiarLenguaje is called', () => {
    const languageService = TestBed.inject(LanguageService);
    spyOn(languageService, 'setLang');
    component.cambiarLenguaje(LANGUAGES.ENGLISH);
    expect(languageService.setLang).toHaveBeenCalledWith(LANGUAGES.ENGLISH);
  });

  it('should call setTheme of ThemeService when cambiarTema is called', () => {
    const themeService = TestBed.inject(ThemeService);
    spyOn(themeService, 'setTheme');
    component.cambiarTema(THEMES.DARK);
    expect(themeService.setTheme).toHaveBeenCalledWith(THEMES.DARK);
  });


});
