import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  registrarGoogle(){
    this.auth.login();
this.auth.agregarUsuario();
  }

  guardarDatos(forma:NgForm){
console.log(forma);
console.log(forma.value);
this.auth.registroEmail(forma.value.user, forma.value.pass);

  }

}
