import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { TimelineComponent } from '../components/timeline/timeline.component';
import { EmpresaResumenComponent } from '../components/empresa-resumen/empresa-resumen.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { ContactoComponent } from '../components/contacto/contacto.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'empresa/:id', component: EmpresaResumenComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'experience', component: TimelineComponent},
  { path: 'contacto', component: ContactoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
