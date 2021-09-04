import { Component, OnInit } from '@angular/core';
import { SitiosService } from 'src/app/services/sitios.service';
import { Sitios } from 'src/app/data/sitios.interface';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  //-------------------------------------VARIABLES-------------------------------------------------------
  sitios: Sitios[] = [];
  cargando = false;
  id: string;
autenticado: boolean = false;
  //----------------------------------CONSTRUCTOR----------------------------------------------------------
  constructor(private serviceSitio: SitiosService, private route: ActivatedRoute, private auth: AuthService) { 
    if(this.auth.userToken){
      this.autenticado = true;
    }
  }


//----------------------------------------ONINIT---------------------------------------------------------
  ngOnInit(): void {

    this.cargando = true;
    this.id = this.route.snapshot.params.nombre;
    this.serviceSitio.getSitiosCategoria(this.id).subscribe(data => {

      this.sitios = data;
     // console.log(this.sitios);
      this.cargando = false;
    })
  }

}
