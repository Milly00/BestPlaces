import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgForm } from '@angular/forms';
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


//----------------------------------------VARIABLES -----------------------------------------------------
  public autenticacion: boolean = false;
  token: string | null;
//--------------------------------------CONSTRUCTOR------------------------------------------------------
  constructor(private auth: AuthService, private router: Router, private authf: AngularFireAuth) {

    this.authf.authState.subscribe(user => {
      if (!user) {
        return;
      }
    })
  }
//--------------------------------------ONINIT----------------------------------------------------------
  ngOnInit(): void {
    this.authf.authState.subscribe(user => {
      if (user?.getIdToken) {
        this.autenticacion = true;
      }
    })
  }
//-------------------------------------LOGIN GOOGLE------------------------------------------------------
  login() {
    this.auth.login();
  }
//--------------------------------LOGIN EMAIL Y PASSWORD-----------------------------------------------
  loginEmail(forma: NgForm) {
    this.auth.loginEmail(forma.value.user, forma.value.pass);
    this.router.navigateByUrl('/general');
    //console.log(forma.value.user, forma.value.pass);
  }
//-------------------------------LOGOUT ----------------------------------------------------------------
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');

  }

}
