import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardPruebaService {

  constructor(private tokenService: TokenService,private router : Router) { }

  public canActiveWithAuth(): boolean {
    if(this.tokenService.getToken()){
      this.router.navigateByUrl("/portafolio")
      return false;
  }
  
  return true;
  }

  public canActiveWithoutAuth(): boolean {
    if(!this.tokenService.getToken()){
      alert("No tienes permisos");
      this.router.navigateByUrl("/autenticacion/inicio-sesion")
      return false;
  }
  return true;
  }
}
