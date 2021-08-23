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



  public autenticacion: boolean = false;
  token: string | null;

  constructor(private auth: AuthService, private router: Router, private authf: AngularFireAuth) {

    this.authf.authState.subscribe(user => {
      if (!user) {
        return;
      }

    })
  }

  ngOnInit(): void {
  }

  login() {

    this.auth.login();

  }

  loginEmail(forma: NgForm) {
    this.auth.loginEmail(forma.value.user, forma.value.pass);
    //console.log(forma.value.user, forma.value.pass);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/home');
  }

}
