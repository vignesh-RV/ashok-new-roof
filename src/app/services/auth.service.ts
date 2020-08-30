import { Injectable } from '@angular/core';

import { BaseAPIService } from './base-api-service';
import { Observable } from 'rxjs';
import { APIUrls } from '../constants/URL-end-points';
import { CommonService } from './common.service';

@Injectable({providedIn: "root"})
export class AuthService{
    constructor(private api: BaseAPIService,
        private common: CommonService){

    }

    refreshToken(): any{

    }
    
    register(userData): Observable<any>{
        return (this.api.post({
            url: APIUrls.REGISTER_NEW_USER,
            parameters: userData
        }));
    }

    login(userData): Observable<any>{
        return (this.api.post({
            url: APIUrls.LOGIN_USER,
            parameters: userData
        }));
    }

    logout(): any{
        localStorage.clear();
        this.common.deleteCookie("access_token");
        this.common.redirectTo("login");
    }

    setUserData(userData:any): any{
        this.common.setCookie("access_token", userData.access_token);
        localStorage.setItem("userData", JSON.stringify(userData));
    }

    getUserData(): any{
        let userData = localStorage.getItem("userData");
        if(userData){
            return JSON.parse(userData);
        }else return '';
    }

    isUserLoggedIn(): any{
        return !!this.getUserData();
    }
}