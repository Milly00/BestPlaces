import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AppRoutingModule } from '../app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { NavComponent } from '../componentes/nav/nav.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ResetPassComponent, 
  ],
  imports: [
    CommonModule, AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, FormsModule, ComponentesModule
  ]
})
export class AccesoModule { }
