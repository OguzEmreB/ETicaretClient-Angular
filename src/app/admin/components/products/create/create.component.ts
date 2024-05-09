import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { Create_Product } from '../../../../contracts/create_product';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent extends BaseComponent implements OnInit{
  

  constructor(spinner: NgxSpinnerService,private productService:ProductService, private alertify:AlertifyService) {
    super(spinner)
    
  }

  ngOnInit(): void {
   
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.ballAtom);
const create_product:Create_Product = new Create_Product();
create_product.name = name.value;
create_product.stock = parseInt(stock.value);
create_product.price = parseInt(price.value);


// if(!name.value){
//   this.alertify.message("Lütfen ürün adı girin",{
//     dismissOthers:true,
//     messageType:MessageType.Error,
//     position:Position.TopRight
//   })
//   return;
// }
// if(parseInt(stock.value)<0){
//   this.alertify.message("Lütfen stok bilgisini doğru giriniz",{
//     dismissOthers:true,
//     messageType:MessageType.Error,
//     position:Position.TopRight
//   })
//   return;
// }

this.productService.create(create_product, ()=>{
  this.hideSpinner(SpinnerType.ballAtom);
  this.alertify.message("Ürün Başarı ile Eklenmiştir.",{
    dismissOthers:true,
    messageType:MessageType.Success,
    position:Position.TopRight
  });
   this.createdProduct.emit(create_product);
},errorMessage=>{
this.alertify.message(errorMessage,{
  dismissOthers:true,
  messageType:MessageType.Error,
  position:Position.TopRight
});
});
  }

}
