import { Component, Input, OnInit } from '@angular/core';
import { GeneralComponent } from 'src/app/pages/general/general.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

autenticaion: boolean ;
  constructor(private auth: AuthService) {


 

   }

  ngOnInit(): void {
 this.autenticaion = this.auth.autenticado;


  }

  logout(){
    this.auth.logout();
    this.autenticaion = false;
    console.log(this.autenticaion);
  }

}
