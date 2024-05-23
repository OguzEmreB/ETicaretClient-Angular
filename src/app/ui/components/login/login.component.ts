import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service'; 
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import {  GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login'; 
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrl: './login.component.scss', 
  imports:[GoogleSigninButtonModule] // google button için
})
export class LoginComponent extends BaseComponent implements OnInit{
 
constructor(spinner:NgxSpinnerService,
  private authService:AuthService, private activatedRoute : ActivatedRoute,
  private router:Router, private socialAuthService:SocialAuthService,
  private userAuthService:UserAuthService
) {
  super(spinner);
  socialAuthService.authState.subscribe(async (user:SocialUser)=>{
    console.log(user);
    this.showSpinner(SpinnerType.ballAtom);
switch(user.provider){
  case "GOOGLE":
    await userAuthService.googleLogin(user, ()=> {
      this.authService.identityCheck();
      this.hideSpinner(SpinnerType.ballAtom);
    })
    break;
    case "FACEBOOK":
     // await userService.facebookLogin(user, ()=> {
      // this.authService.identityCheck();
      // this.hideSpinner(SpinnerType.ballAtom);
     // })
      //....
      break;
}
  });

}
  ngOnInit(): void { 
  }
   
   
async login(userNameOrEmail: string, password: string) {
  this.showSpinner(SpinnerType.ballAtom);
 await this.userAuthService.login(userNameOrEmail,password, ()=> {
  this.authService.identityCheck();
  this.activatedRoute.queryParams.subscribe(params=>{
    const returnUrl:string=params["returnUrl"];
  if(returnUrl) 
    this.router.navigate([returnUrl]);  
  });
  this.hideSpinner(SpinnerType.ballAtom)});
}

}
