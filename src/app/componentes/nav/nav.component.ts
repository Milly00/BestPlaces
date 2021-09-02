import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  @Input() autenticado: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {

  }


  logout() {
    this.auth.logout();
    localStorage.removeItem('token');
    localStorage.clear();
  }




}
