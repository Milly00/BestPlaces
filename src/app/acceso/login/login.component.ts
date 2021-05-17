import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/bestplace.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService , private router: Router , private authf: AngularFireAuth) { 
    
    this.authf.authState.subscribe(user =>{
      if(!user){
        return;
      }
      console.log(user.displayName, user.email);
    })
  }

  ngOnInit(): void {
  }

  login(){

    this.auth.login();
    this.auth.agregarUsuario();
    
  }

}
