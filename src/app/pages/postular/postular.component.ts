import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostulacionService } from 'src/app/services/postulacion.service';

@Component({
  selector: 'app-postular',
  templateUrl: './postular.component.html',
  styleUrls: ['./postular.component.css']
})
export class PostularComponent implements OnInit {

  constructor(private service: PostulacionService) { }

  ngOnInit(): void {
  }

  Enviar(forma: NgForm){
this.service.Enviar(forma.value.user, forma.value.nombres, forma.value.email);
console.log(forma.value.user, forma.value.nombres, forma.value.email);
  }

}
