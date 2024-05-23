import { Component, Inject, OnInit } from '@angular/core';     
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToasterMessageType, ToasterPosition } from './services/ui/custom-toastr.service';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) 
export class AppComponent implements OnInit{

   
  
   constructor(public authService:AuthService, private toastrService:CustomToastrService,
    private router:Router
   ) {
authService.identityCheck();

     
  }
  ngOnInit(): void {
    // $.get("https://localhost:7151/api/products") // Cors policy backende eklendi hata vermez. veriler gelir.
    //                                              // localhost:4200  backend'e bildirilmediği için browser tabanlı same origin policy den durdurulur istek gitmez
    //                                              // Çapraz köken isteği engellendi: Aynı Köken İlkesi, 
    //                                               //  https://localhost:7151/api/products üzerindeki uzak kaynağın okunmasına izin vermiyor. 
    //                                               //  (Sebep: CORS üst bilgisi ‘Access-Control-Allow-Origin’ eksik.) Durum kodu: 500.


  }


  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Oturum Kapatıldı.","Çıkış Yapıldı",{
      messageType: ToasterMessageType.Warning,
      position:ToasterPosition.TopRight
    })
    }


}
  
   

 