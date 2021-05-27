import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/data/bestplace.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public datos: User[] = [];
  cargando:boolean = false;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {

    this.auth.cargarUsuario().subscribe(datos=>{
      this.datos = datos;
      this.cargando = false;
    });
    console.log(this.datos);

  }

}
