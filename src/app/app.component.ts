import { Component, Inject, OnInit } from '@angular/core';     
declare var $:any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) 
export class AppComponent implements OnInit{
   
   title = 'ETicaretClient';
   constructor() {


     
  }
  ngOnInit(): void {
    // $.get("https://localhost:7151/api/products") // Cors policy backende eklendi hata vermez. veriler gelir.
    //                                              // localhost:4200  backend'e bildirilmediği için browser tabanlı saame origin policy den durdurulur istek gitmez
    //                                              // Çapraz köken isteği engellendi: Aynı Köken İlkesi, 
    //                                               //  https://localhost:7151/api/products üzerindeki uzak kaynağın okunmasına izin vermiyor. 
    //                                               //  (Sebep: CORS üst bilgisi ‘Access-Control-Allow-Origin’ eksik.) Durum kodu: 500.


  }

}
  
   

 