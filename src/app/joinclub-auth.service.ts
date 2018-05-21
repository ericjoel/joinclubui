// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { User } from './shared/models/User';
import { ITokenResponse } from './shared/models/interfaces/ITokenResponse';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
  })
export class JoinclubAuthService {
  
    private baseUrl = environment.identityServer;
  
    constructor(private http: HttpClient,
        private _router: Router) { }

    /**
     * Login Service using the password
     *
     * @param {User} user User to login
     */
    loginPasswordService(user: User) {
        const formData: FormData = new FormData();
        formData.set('email', user.username);
        formData.set('password', user.password);

        return this.http.post(`${this.baseUrl}api/login`, formData);
    }

    registerService(user: User) {
        const formData: FormData = new FormData();
        formData.set('email', user.email);
        formData.set('password', user.password);
        formData.set('password_confirmation', user.password);
        formData.set('name', user.name);

        return this.http.post(`${this.baseUrl}api/register`, formData);
    }

    /**
     * Set Token in the browser localstorage
     *
     * @param {ITokenResponse} token
     */
    saveToken(token: ITokenResponse) {
        localStorage.setItem(environment.accessTokenApi, token.access_token);        
        localStorage.setItem(environment.typeTokenApi, 'Bearer');
    }

    /**
     * Return the access token
     *
     */
    getAccessToken() {
        if (localStorage.getItem(environment.typeTokenApi)) {
            return `${localStorage.getItem(environment.typeTokenApi)} ${localStorage.getItem(environment.accessTokenApi)}`;
        }
        return null;
    }

    /**
     * Redirect url after login
     *
     */
    redirectUrlAfterLogin() {
        const redirect = sessionStorage.getItem(environment.redirectUrl);
        const url = (!!redirect) ? redirect : `u/home`;
        this._router.navigate([url]);
    }
  
}