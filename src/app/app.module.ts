import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AppRoutingModule } from './route/route-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//guards
import { RutaGuard }  from './validacion/ruta.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';
import { SeccionHabilidadesComponent } from './components/seccion-habilidades/seccion-habilidades.component';
import { SeccionIdiomasComponent } from './components/seccion-idiomas/seccion-idiomas.component';
import { EmpresaResumenComponent } from './components/empresa-resumen/empresa-resumen.component';
import { RedesSocialesComponent } from './components/redes-sociales/redes-sociales.component';
import { ProfileComponent } from './components/profile/profile.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TimelineComponent } from './components/timeline/timeline.component';
import { LocalizeDatePipe } from './pipes/localize-date.pipe';

import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';

import localeEn from '@angular/common/locales/en';
import localeEs from '@angular/common/locales/es';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { FacebookModule } from 'ngx-facebook';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.arrows
};

registerLocaleData(localeEn, 'en');
registerLocaleData(localeEs, 'es');

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    TopBarComponent,
    DatosPersonalesComponent,
    SeccionHabilidadesComponent,
    SeccionIdiomasComponent,
    EmpresaResumenComponent,
    RedesSocialesComponent,
    ProfileComponent,
    TimelineComponent,
    LocalizeDatePipe
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    NgWizardModule.forRoot(ngWizardConfig),
    //FacebookModule.forRoot()
  ],
  providers: [RutaGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
