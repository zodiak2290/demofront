import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactoComponent } from '../../components/contacto/contacto.component';

import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  declarations: [ContactoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    //NgxLoadingModule.forRoot({})
  ],
  exports:[CommonModule,ContactoComponent,FormsModule]
})
export class FormulariosModule { }
