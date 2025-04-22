import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/enums/languages.enum';
import { THEMES } from 'src/app/enums/themes.enum';
import { LanguageService } from 'src/app/services/language/language.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-user-preferences',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './user-preferences.component.html',
  styleUrl: './user-preferences.component.css',
})
export class UserPreferencesComponent {
  selectedLanguage = LANGUAGES.SPANISH;
  selectedTheme = THEMES.LIGHT;
  LANGUAGES = LANGUAGES;
  THEMES = THEMES;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) {
    this.selectedTheme = this.themeService.getCurrentTheme();
    this.selectedLanguage = this.languageService.getLang();
  }

  cambiarLenguaje(lang) {
    this.selectedLanguage = lang;
    this.languageService.setLang(lang);
  }

  cambiarTema(tema) {
    this.selectedTheme = tema;
    this.themeService.setTheme(tema);
  }
}
