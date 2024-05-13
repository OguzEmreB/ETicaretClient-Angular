import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { List_Product } from '../../../../contracts/list_product';
import { ProductService } from '../../../../services/common/models/product.service';
import { BaseComponent, SpinnerType } from '../../../../base/base.component'; 
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';

declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements AfterViewInit {
  
  constructor(spinner:NgxSpinnerService ,private productService:ProductService,private alertifyService:AlertifyService) {
    super(spinner)
    
  }

  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate','edit','delete'];
  dataSource : MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  async getProducts() { 
    this.showSpinner(SpinnerType.ballAtom);
    const allProducts: {totalCount: number ; products:List_Product[] } = await this.productService.read
    (this.paginator ? this.paginator.pageIndex :  0 , this.paginator? this.paginator.pageSize : 5 ,()=>
      this.hideSpinner(SpinnerType.ballAtom),errorMessage=> this.alertifyService.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Error,
      position:Position.TopRight
    }))
    
    this.dataSource= new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;  
} 
async pageChanged(){
  await this.getProducts();
}

// delete( id,event){
// const img:HTMLImageElement = event.srcElement;
// $(img.parentElement.parentElement).fadeOut(2000);
// }
async ngAfterViewInit() // Will be called After Angular has completed initialization of a component's view. It is invoked only once when the view is instantiated.
{
   await this.getProducts(); 
}
// ngOnInit()  //  paginator çağırılmadan çalışıyor. paginator is undefined hatası veriyor.
//{
//   this.getProducts();   
// }

}
