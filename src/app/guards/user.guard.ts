import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private user: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

      const token = this.user.leerToken();
console.log('guard;')
      if(token == null){
this.router.navigateByUrl('/login');
console.log('cond false');
return false;
      }else{
        console.log('cond true');

        return true;
      }
    
  }
  
}
