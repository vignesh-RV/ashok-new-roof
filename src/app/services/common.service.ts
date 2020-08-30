import { Injectable } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: "root"})
export class CommonService{
    constructor(private spinner:NgxSpinnerService,
      private router: Router,
      private toaster: ToastrService){
    }

    getCurentRoute(): any{
        return this.router.url;
    }

    setCookie(name: string, value, days?) {
        let expires = '';
        if (days) {
          const date: Date = new Date;
          date.setTime(date.getTime() + (8 * 60 * 60 * 1000 * days));
          expires = date.toUTCString();
        }
        if (expires) {
          document.cookie = `${name}=${value};path=/;expires=${expires};`;
        } else {
          document.cookie = `${name}=${value};path=/;`;
        }
    }

    deleteCookie(name) {
        this.setCookie(name, '', -1);
    }
    
    redirectTo(path:string){
        this.router.navigate([path]);
    }

    loadingCount: number = 0;
    showLoader(): any {
      this.loadingCount++;
      if(this.loadingCount){
        this.spinner.show();
      }
    }

    hideLoader(): any {
      this.loadingCount--;
      if (!this.loadingCount){
        this.spinner.hide();
      }
    }

    //TOASTER FUNCTIONS
    showToaster(type, msg, title = ''){
      switch(type){
        case 'success' : {
          this.toaster.success(msg, title);
          break;
        }
        case 'error' : {
          this.toaster.error(msg, title);
          break;
        }
        case 'warning' : {
          this.toaster.warning(msg, title);
          break;
        }
      }
    }
}