import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { GeneralComponent } from './general/general.component';
import { RatingModule } from 'ng-starrating';
import { DetalleSitioComponent } from './detalle-sitio/detalle-sitio.component';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { SitiosService } from '../services/sitios.service';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GeneralComponent,
    DetalleSitioComponent
  ],
  imports: [
    CommonModule, AppRoutingModule , RatingModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, FormsModule

  ], providers:[AngularFirestore ]
})
export class PagesModule { }
