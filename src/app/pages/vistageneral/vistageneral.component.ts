import { Component, OnInit } from '@angular/core';
import { Sitios } from 'src/app/data/sitios.interface';
import { SitiosService } from 'src/app/services/sitios.service';
import { map } from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vistageneral',
  templateUrl: './vistageneral.component.html',
  styleUrls: ['./vistageneral.component.css']
})
export class VistageneralComponent implements OnInit {
  estrella: number;
  sitios: Sitios[] = [];
  cargando: boolean = false;
  autenticado: boolean = false;

  constructor(private services: SitiosService, private auth: AuthService) {

    if (this.auth.userToken !== null && this.auth.userToken !== undefined) {
     // console.log(this.auth.leerToken)
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

  aviso() {
    if (this.autenticado === false) {
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Debes estar registrado para poder realizar esta acción',
        icon: 'warning',

        confirmButtonText: 'Ok',

      })
    }
  }

}
