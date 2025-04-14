import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from 'src/app/enums/languages.enum';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  readonly lang = signal<LANGUAGES>(LANGUAGES.SPANISH);

  constructor(private translate: TranslateService) {
    const save = localStorage.getItem('language') as LANGUAGES | null;

    if (save && Object.values(LANGUAGES).includes(save)) {
      this.setLang(save as LANGUAGES);
    } else {
      this.setLang(LANGUAGES.SPANISH);
    }
  }

  init(){
    this.setLang(this.lang());
  }

  toggleLanguage() {
    const actual = this.lang();
    this.lang.set(actual === LANGUAGES.ENGLISH ? LANGUAGES.SPANISH: LANGUAGES.ENGLISH);
  }

  setLang(newLang: LANGUAGES) {
    this.lang.set(newLang);
    this.implementLang(newLang);

    localStorage.setItem('language', newLang);
  }

  implementLang(lang){
    this.translate.use(lang);
  }

  getCurrentTheme(): LANGUAGES {
    return this.lang();
  }
}
