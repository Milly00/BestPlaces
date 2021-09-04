import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanLoad {

  constructor(private user: AuthService, private router: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

if(this.user.leerToken()=== true){
   

  return true;
}
 this.router.navigateByUrl('/general');
return false;
     
      }

      canLoad():boolean{
if(this.user.leerToken()=== true){
  
  return true;
}
this.router.navigateByUrl('/general');
return false;
      }


    
  }
  

/**
 const token = this.user.leerToken();
console.log('guard;')
      if(token == null){
this.router.navigateByUrl('/login');
console.log('cond false');
return false;
      }else{
        console.log('cond true');

        return true; */