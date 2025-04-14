import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/enums/languages.enum';
import { THEMES } from 'src/app/enums/themes.enum';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  selectedLanguage = LANGUAGES.SPANISH;
  selectedTheme = THEMES.LIGHT;
  LANGUAGES = LANGUAGES;
  THEMES = THEMES;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) {
    this.selectedTheme = this.themeService.getCurrentTheme();
    this.selectedLanguage = this.languageService.getCurrentTheme();

  }
  saveSettings() {
    console.log('Guardando configuración:', {
      language: this.selectedLanguage,
      theme: this.selectedTheme
    });
    // tu lógica de guardado
  }

  cambiarLenguaje(lang) {
    this.selectedLanguage = lang;
    this.languageService.setLang(lang);
  }

  cambiarTema(tema) {
    this.themeService.setTheme(tema);
  }
}
