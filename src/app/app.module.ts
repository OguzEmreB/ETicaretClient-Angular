import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { UiModule } from './ui/ui.module'; 
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations'; 
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { FacebookLoginProvider, GoogleLoginProvider,   GoogleSigninButtonModule,   SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login'; 


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=> localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7151"]
      }
    }),
    SocialLoginModule,  GoogleSigninButtonModule
  ],
  providers: [
  {provide:"baseUrl",useValue:"https://localhost:7151/api",multi:true},
    provideAnimations(),
    {
      provide: "SocialAuthServiceConfig",
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("951868154971-l572msahn2qv63vqvuibge60lq3hr94c.apps.googleusercontent.com")
        },
        {
          id:FacebookLoginProvider.PROVIDER_ID,
          provider:new FacebookLoginProvider("")
        }
      ],
      onError: err => console.log(err)
    } as SocialAuthServiceConfig
  
 }
],
  bootstrap: [AppComponent]
})

export class AppModule { }
