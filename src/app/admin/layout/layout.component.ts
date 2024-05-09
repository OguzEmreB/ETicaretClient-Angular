import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit{

constructor(){

}

ngOnInit():void{

// this.alertify.message("Merhaba",MessageType.Notify)
  // alertify.alert('Ready');
  // alertify.success('Sağ Altta Çıkar');
}
}
