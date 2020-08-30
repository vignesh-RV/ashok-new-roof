import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { APP_DATA, TOASTER_TYPES, APP_MSGS } from 'src/app/constants/app.properties';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  
  //to indicate current page is whether login/register page
  get isRegisterPage():boolean{
    return this.common.getCurentRoute() == "/register";
  }

  constructor(private fb:FormBuilder,
              private common:CommonService,
              private auth: AuthService) {
    
    this.createForm();
  }

  ngOnInit(): void {
  }

  private createForm() {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {validator: this.validateConfirmPassword});

    //Adding confirmpassword field only for register page
    if(this.isRegisterPage){
      this.loginForm.addControl('confirmPassword', new FormControl('', [Validators.required, Validators.minLength(6)]));
    }
  }

  /**
   * Custom validator for confirm password field
   * @param absControl
   */
  validateConfirmPassword(absControl: AbstractControl): void {
    let password = absControl.get('password');
    let confirmPassword = absControl.get('confirmPassword');
    if ( password && confirmPassword &&
        absControl.get('password').value !== absControl.get('confirmPassword').value) {
        confirmPassword.setErrors({ mismatch: true });
    }else if(confirmPassword) confirmPassword.setErrors(null);
  }

  /**
   * Handling sign in and register REST Calls
   */
  submitForm() {
    if(this.loginForm.invalid) return;

    let formData = this.loginForm.getRawValue();
    let reqData:any = {
      email: formData.username,
      password: formData.password
    }
    if(this.isRegisterPage){
      // register
      reqData.roleId = APP_DATA.ROLE_USER_ID;
      this.auth.register(reqData).subscribe((res)=>{
        this.common.showToaster( TOASTER_TYPES.SUCCESS , (res.message || APP_MSGS.SUCCESS.REGISTRATION_DONE) );
        this.common.redirectTo("login");
      }, (err)=>{
        this.common.showToaster( TOASTER_TYPES.ERROR , (err.error.message || APP_MSGS.ERROR.SOMETHING_WENT_WRONG) );
      });
    } else { //login
      this.auth.login(reqData).subscribe((res)=>{
        this.auth.setUserData(res);
        location.reload(true);
      }, (err)=>{
        this.common.showToaster( TOASTER_TYPES.ERROR, (err.error.error || APP_MSGS.ERROR.SOMETHING_WENT_WRONG))
      });
    }
  }

  /**
   * get exact formControl from form group
   * @param controlName 
   */
  getControl(controlName:string): any{
    return this.loginForm.get(controlName);
  }
}
