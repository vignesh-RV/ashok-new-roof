import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { CommonService } from '../services/common.service';
import { AuthService } from '../services/auth.service';
import { AVAILABLE_ROUTES, DEFAULT_PAGES, ALL_ROLES, TOASTER_TYPES, APP_MSGS } from '../constants/app.properties';

@Injectable()
export class RouterGaurd implements CanActivate{
    constructor(private router: Router, private commonService: CommonService,
        private auth: AuthService){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let userData = this.auth.getUserData();
        
        //stoping user to see login page, since user already logged in
        if(state.url == '/login' && this.auth.isUserLoggedIn() ){
            this.redirectUserBasedOnRole(userData);
            return false;
        }
        //stoping user to see other pages, without logging in
        else if(!this.auth.isUserLoggedIn() && state.url != '/login'){
            this.router.navigate(["/login"]);
            return false;
        }

        //stoping user to see other pages, without having permission
        else if(userData){
            //checking whether user having permission or not
            let userRole = this.getHigherRole(userData),
            currentStateURL =  this.removeQueryParamsFromPath(route, state),
            availableRoutes = AVAILABLE_ROUTES[userRole.toUpperCase()] || [],
            isHavingPermission = availableRoutes.includes(currentStateURL);

            if(!isHavingPermission){
                this.commonService.showToaster(TOASTER_TYPES.ERROR, APP_MSGS.ERROR.UNAUTHORIZED_ENTRY);
                this.redirectUserBasedOnRole(userData);
            }
            return isHavingPermission;
        }
        
        return true;
    }

    removeQueryParamsFromPath(route, state): any{
        let allParams = Object.keys(route.params);
        if(allParams.length){
            let abstractPath = state.url;
            allParams.forEach((param)=>{
                abstractPath = abstractPath.replace(route.params[param], '')
            })
            return abstractPath;
        }else return state.url;
    }
    
    /**
     * redirecting user to respective page
     * @param userData 
     */
    redirectUserBasedOnRole(userData): any{
        if(!userData) return;
        
        let userRole = this.getHigherRole(userData);

        if( userRole == ALL_ROLES.ROLE_ADMIN ){
            this.router.navigate([ DEFAULT_PAGES.ADMIN ]);
        }else if( userRole == ALL_ROLES.ROLE_USER ){
            this.router.navigate([ DEFAULT_PAGES.USER ]);
        }
    }

    /**
     * Trying to get user's highest role
     * @param userData 
     */
    getHigherRole(userData): any{
        if( userData.role.includes( ALL_ROLES.ROLE_ADMIN ) ){
            return ALL_ROLES.ROLE_ADMIN;
        }else if( userData.role.includes( ALL_ROLES.ROLE_USER ) ){
            return ALL_ROLES.ROLE_USER;
        }
    }
}