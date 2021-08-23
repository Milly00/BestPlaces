import { Component, OnInit } from '@angular/core';
import { SitiosService } from 'src/app/services/sitios.service';
import { Sitios } from 'src/app/data/sitios.interface';


@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  sitios: Sitios[] = [];
  cargando = false;

  constructor(private serviceSitio: SitiosService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.serviceSitio.getSitiosOrder().subscribe(data => {

      this.sitios = data;
      console.log(this.sitios);
      this.cargando = false;
    })

  }

}
