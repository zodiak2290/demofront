import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './route/route-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//guards
import { RutaGuard }  from './validacion/ruta.guard';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    routing,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
  ],
  providers: [appRoutingProviders, RutaGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
