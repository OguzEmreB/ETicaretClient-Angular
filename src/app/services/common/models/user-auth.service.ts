import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CustomToastrService, ToasterMessageType, ToasterPosition } from '../../ui/custom-toastr.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';
import { Observable, firstValueFrom } from 'rxjs';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrSerVice: CustomToastrService) { }


  async login(userNameOrEmail: string, password: string, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      controller: "auth",
      action: "login"
    }, { userNameOrEmail, password })
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrSerVice.message("Kullanıcı girişi başarıyla sağlanmıştır.", "Giriş Başarılı", {
        messageType: ToasterMessageType.Success,
        position: ToasterPosition.TopRight
      })
    }
    callBackFunction();
  }
  async refreshTokenLogin(refreshToken: string, callBackFunction?: () => void):Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post({
      action: "refreshTokenLogin",
      controller: "auth"
    }, { refreshToken: refreshToken });
    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }
  async googleLogin(user: SocialUser, callBackFunction?: () => void): Promise<any> {
    const observable: Observable<SocialUser | TokenResponse> = this.httpClientService.post({
      action: "google-login",
      controller: "auth"
    }, user);

    const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem("accessToken", tokenResponse.token.accessToken);
      localStorage.setItem("refreshToken", tokenResponse.token.refreshToken);
      this.toastrSerVice.message("Google girişi başarılı", "Giriş Başarılı", {
        messageType: ToasterMessageType.Success,
        position: ToasterPosition.TopRight
      });
    }
    callBackFunction();
  }

}
