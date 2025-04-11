import { NgModule } from '@angular/core';
import { SeccionHabilidadesComponent } from './components/seccion-habilidades/seccion-habilidades.component';

import { registerLocaleData } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [SeccionHabilidadesComponent],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
  ],
  exports:[SeccionHabilidadesComponent,TranslateModule]
})
export class GraficosModule { }
