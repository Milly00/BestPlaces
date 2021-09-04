import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/data/bestplace.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  //----------------------------------VARIABLES---------------------------------------------------------
  nombre: string | null | undefined;
  email: string | null | undefined;
  img: string | null | undefined;
  cargando: boolean = false;
  autenticado: boolean = false;

  //--------------------------------CONSTRUCTOR---------------------------------------------------------
  constructor(public auth: AngularFireAuth) {
    if(this.auth.idToken){
      this.autenticado = true;
    }
   }

  //-----------------------------------ONINIT---------------------------------------------------------
  ngOnInit(): void {

    this.auth.authState.subscribe(date => {
      // console.log(date);
      this.nombre = date?.displayName;
      this.email = date?.email;
      this.img = date?.photoURL;
    })
    /**.subscribe(datos => {
      this.datos = datos;
      this.cargando = false;
      console.log(this.datos);
    }); */


  }

}
