import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './services/auth.service';
import { CommonService } from './services/common.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { AgmCoreModule } from "@agm/core";
import { InterceptorService } from './http-interceptor/http.interceptor.service';
import { RouterGaurd } from './gaurds/route-gaurd';
import { ToastrModule } from "ngx-toastr";
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { APP_DATA } from './constants/app.properties';
import { AppMaterialModules } from './shared/modules/app.material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,

    FormsModule,
    ReactiveFormsModule,

    NgxSpinnerModule,
    
    HttpClientModule,
    PopoverModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: APP_DATA.GMAP_USER_KEY,
      libraries: ["places"]
    }),

    ToastrModule.forRoot(APP_DATA.TOASTER_DEFAULTS as any),
    AppMaterialModules
  ],
  providers: [
    CommonService,  AuthService,
    RouterGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
