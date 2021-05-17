import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './acceso/login/login.component';
import { RegistroComponent } from './acceso/registro/registro.component';
import { BodyComponent } from './components/body/body.component';

const routes: Routes = [
  {path:  'home', component: BodyComponent},
  {path:'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
