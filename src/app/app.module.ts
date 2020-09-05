import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
    ProfileComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
  ],
  providers: [ RutaGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
