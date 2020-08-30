import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  
  constructor(public router:Router) { }

  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("enter auth guard");
    if (localStorage.getItem('token')!==null)
    {
      console.log("hloo");
      return true;
    }
    console.log("false");
    this.router.navigate(['/login']);
    return false;
  }
}
