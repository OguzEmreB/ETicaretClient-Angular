import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner); // constructor da base  contructor'a parametre gönderme. c#daki base(spinner) gibi
  }


  ngOnInit(): void {

 
    this.httpClientService.get<Create_Product[]>({
      controller: "products"
    }).subscribe(data => console.log(data));


    
  }
  @ViewChild(ListComponent) listComponents : ListComponent;


  createdProduct(createdProduct: Create_Product) {
this.listComponents.getProducts();
  }
}
      
