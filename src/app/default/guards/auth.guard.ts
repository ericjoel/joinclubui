// Angular
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';

// Utils
import { environment } from './../../../environments/environment';
import { JoinclubAuthService } from '../../joinclub-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private joinclubAuthService: JoinclubAuthService) { }


  /**
   * Guard Authorizate routes
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {boolean}
   * @memberof AuthGuard
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  /**
   * Validate if have a token & redirect
   *
   * @param {string} url
   * @returns {boolean}
   * @memberof AuthGuard
   */
  checkLogin(url: string): boolean {
    const token = this.joinclubAuthService.getAccessToken();
    
    if (!!token) {
      this._router.navigate([`u/home`]);
    }
    return true;
  }

}
