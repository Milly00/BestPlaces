import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccesoModule } from './acceso/acceso.module';
import { PagesModule } from './pages/pages.module';
import { BodyComponent } from './components/body/body.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentesModule } from './componentes/componentes.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BodyComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, AccesoModule, PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, FormsModule, BrowserAnimationsModule, ComponentesModule
  ],
  providers: [AngularFirestore],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
