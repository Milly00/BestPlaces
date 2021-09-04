import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //----------------------------------INPUT --------------------------------------------------------------------
  //ENVIA PARA EL CAMBIO DE ESTADO EN AL NAV DE LOGIN A LOGOUT
  @Input() autenticado: boolean = false;

  //---------------------------------CONSTRUCTOR-------------------------------------------------------------
  constructor(private auth: AuthService) { }
  //-----------------------------------------ONINIT----------------------------------------------------
  ngOnInit(): void {
   // console.log(this.auth.userToken);
    if (this.auth.userToken) {
      this.autenticado = true;
    }

  }

  //------------------------------------------LOGOUT---------------------------------------------------
  logout() {

    this.auth.logout();
    //console.log('estoy en logout');
    localStorage.removeItem('token');
    localStorage.clear();
  }




}
