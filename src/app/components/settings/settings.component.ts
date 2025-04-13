import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  selectedLanguage = 'es';
  selectedTheme = 'light';
  public activeLang = 'es';

  constructor(private translate: TranslateService) {

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
    this.translate.use(lang);
  }

  cambiarTema(tema) {
    const isDarkMode = tema === 'dark';
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
