import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CustomToastrService, ToasterMessageType, ToasterPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService: CustomToastrService, private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      switch (error.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Giriş Reddedildi.", "Yetkisiz İşlem", {
            messageType: ToasterMessageType.Error,
            position: ToasterPosition.BottomFullWidth
          });

          this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data=>{
            
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya Erişilemiyor.", "Sunucu Hatası", {
            messageType: ToasterMessageType.Error,
            position: ToasterPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz İstek Yapıldı", "Geçersiz İstek", {
            messageType: ToasterMessageType.Error,
            position: ToasterPosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa Bulunamadı.", "Sayfa Bulunamadı.", {
            messageType: ToasterMessageType.Error,
            position: ToasterPosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen Bir Hata Meydana Geldi", "Hata!", {
            messageType: ToasterMessageType.Error,
            position: ToasterPosition.BottomFullWidth
          });
          break;
      }
      return of(error);
    }));
  }
}
