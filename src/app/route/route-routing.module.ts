import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { RutaGuard }  from '../validacion/ruta.guard';
import { EmpresaResumenComponent } from '../components/empresa-resumen/empresa-resumen.component';
import { ProfileComponent } from '../components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'empresa/:id', component: EmpresaResumenComponent },
  { path: 'profile', component: ProfileComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
