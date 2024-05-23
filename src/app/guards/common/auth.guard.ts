import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { CustomToastrService, ToasterMessageType, ToasterPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { AuthService, _isAuthenticated } from '../../services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router
    , private toastrService: CustomToastrService, private spinner: NgxSpinnerService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    this.spinner.show(SpinnerType.ballAtom);

    // const token: string = localStorage.getItem("accessToken");
    // // const decodeToken = this.jwtHelper.decodeToken(token);
    // // const expirationDate: Date = this.jwtHelper.getTokenExpirationDate(token);
    // let expired: boolean;
    // try {
    //   expired = this.jwtHelper.isTokenExpired(token);
    // } catch {
    //   expired = true;
    // }
    if (!_isAuthenticated) {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim!", {
        messageType: ToasterMessageType.Warning,
        position: ToasterPosition.TopRight
      })
    }
    this.spinner.hide(SpinnerType.ballAtom);
    return true;
  }


}
