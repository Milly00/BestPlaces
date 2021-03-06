import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostulacionService } from 'src/app/services/postulacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postular',
  templateUrl: './postular.component.html',
  styleUrls: ['./postular.component.css']
})
export class PostularComponent implements OnInit {

  autenticado: boolean = false;


  constructor(private service: PostulacionService, private auth: AuthService) {
    if(this.auth.userToken){
      this.autenticado = true;
    }
   }

  ngOnInit(): void {
  }

  Enviar(forma: NgForm) {
    this.service.Enviar(forma.value.user, forma.value.nombres, forma.value.email).subscribe(res=>
      console.log(res));
      forma.resetForm();
this.alert();
    //console.log(forma.value.user, forma.value.nombres, forma.value.email);
  }

  alert(){
    Swal.fire(
      '¡Sitio Postulado!',
      'El sitio ha sido postulado con exito',
    )
  }

}
