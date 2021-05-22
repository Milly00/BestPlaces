import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

autenticaion: boolean;
  constructor(private auth: AuthService) {


   }

  ngOnInit(): void {
    setTimeout(()=>{ this.autenticaion =this.auth.sendAutenticacio();
    console.log(this.autenticaion)}, 5000)

  }

  logout(){
    this.auth.logout();
    this.autenticaion = false;
    console.log(this.autenticaion);
  }

}
