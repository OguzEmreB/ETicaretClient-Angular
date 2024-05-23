import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service'; 
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import {  GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrl: './login.component.scss', 
  imports:[GoogleSigninButtonModule] // google button için
})
export class LoginComponent extends BaseComponent implements OnInit{
 
constructor(private userService:UserService, spinner:NgxSpinnerService,
  private authService:AuthService, private activatedRoute : ActivatedRoute,
  private router:Router, private socialAuthService:SocialAuthService
) {
  super(spinner);
  socialAuthService.authState.subscribe(async (user:SocialUser)=>{
    console.log(user);
    this.showSpinner(SpinnerType.ballAtom);
await userService.googleLogin(user, ()=> {
  this.authService.identityCheck();
  this.hideSpinner(SpinnerType.ballAtom);
})
  });
}
  ngOnInit(): void { 
  }
   
   
async login(userNameOrEmail: string, password: string) {
  debugger;
  this.showSpinner(SpinnerType.ballAtom);
 await this.userService.login(userNameOrEmail,password, ()=> {
  this.authService.identityCheck();
  this.activatedRoute.queryParams.subscribe(params=>{
    const returnUrl:string=params["returnUrl"];
  if(returnUrl) 
    this.router.navigate([returnUrl]);  
  });
  this.hideSpinner(SpinnerType.ballAtom)});
}

}
