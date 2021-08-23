import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  reset(forma: NgForm) {
    this.auth.reestablecerPass(forma.value.user);

    Swal.fire({
      title: 'El proceso se ha completado con éxito',
      text: 'Se ha solicitado el reestablecimiento de tu contraseña, por favor revisa tu email',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'OK',

    });
  }

}
