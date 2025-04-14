// theme.service.ts
import { Injectable, signal } from '@angular/core';
import { THEMES } from 'src/app/enums/themes.enum';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  readonly theme = signal<THEMES>(THEMES.LIGHT);

  constructor() {
    // Al iniciar, revisa si en localStorage hay un tema guardado
    const savedTheme = localStorage.getItem('theme') as THEMES | null;

    // Si existe y es un valor válido (DARK o LIGHT), lo aplicas
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      this.setTheme(savedTheme as THEMES);
    } else {
      // O aplica el default (light)
      this.setTheme(THEMES.LIGHT);
    }
  }

  init(){
    this.setTheme(this.theme());
  }


  toggleTheme() {
    const actual = this.theme();
    this.theme.set(actual === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  }

  setTheme(newTheme: THEMES) {
    this.theme.set(newTheme);
    this.implementTheme(newTheme);

    localStorage.setItem('theme', newTheme);
  }

  implementTheme(theme){
    const isDarkMode = theme === THEMES.DARK;
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  getCurrentTheme(): THEMES {
    return this.theme();
  }
}
