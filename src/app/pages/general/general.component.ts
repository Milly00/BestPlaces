import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitios } from 'src/app/data/sitios.interface';
import { SitiosService } from 'src/app/services/sitios.service';
import { map } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {


  estrella: number;
  sitios: Sitios[] = [];
  cargando: boolean = false;
  autenticado: boolean = false;

  constructor(private services: SitiosService, private auth: AuthService) {

    if(this.auth.userToken){
      this.autenticado = true;
    }
  }

  ngOnInit(): void {
    this.cargando = true;
    this.services.getSit().subscribe(data => {
      this.sitios = data;
      this.cargando = false;
    }
    );

  }


}

/**En este evento le asigno el valor de la calificacion
  onRate($event:{newValue:number} ){
    this.estrella = $event.newValue ;

    //Si se guarda el cambio
   this.services.agregarStrella(this.estrella);
    console.log(this.estrella);
     }

     //Necesito el dato de quien voto y obtener el valor de la estrella tambien un contador que me cuente cuant
     //cuantos han votado por ese restaurante */


/**
 *  Leer1Star(){
    this.estrella = 1;
    console.log(this.estrella);

  }
  Leer2Star(){
    this.estrella = 2;
    console.log(this.estrella);

  }

  Leer3Star(){
    this.estrella = 3;
    console.log(this.estrella);

  }
  Leer4Star(){
    this.estrella = 4;
    console.log(this.estrella);

  }
  Leer5Star(){
    this.estrella = 5;
    console.log(this.estrella);

  }
 */
