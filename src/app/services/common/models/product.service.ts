import { Injectable, Output } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from '../../../contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { EventEmitter } from 'stream';
import { producerAccessed } from '@angular/core/primitives/signals';
import { Observable, firstValueFrom } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
 
  //#region Create Product

  create(product: Create_Product,successCallBack:()=>void,errorCallBack:(errorMessage:
    string)=>void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {

      successCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
let message="";
_error.forEach((v,index)=>{
  v.value.forEach((_v,_index)=>{
    message+=`${_v}<br>`;
  });
});
errorCallBack(message); 
    });
  }
  //#endregion
 
//#region List Product

async read(page:number=0,size:number=5,successCallBack:()=>void,errorCallBack:(errorMessage:
  string)=>void):Promise<{totalCount: number ; products:List_Product[] }>{
 const promiseData:Promise<{totalCount: number ; products:List_Product[] }> = this.httpClientService.get<
 {totalCount: number ; products:List_Product[] }>({
    controller:"products",
    queryString:`page=${page}&size=${size}`
  }).toPromise();

  promiseData.then(d=>successCallBack())
  .catch((errorResponse:HttpErrorResponse)=> errorCallBack(errorResponse.message))

  return await promiseData;
}

//#endregion


//#region Delete

async delete(id:string){
  const deleteObservable : Observable<any> =this.httpClientService.delete<any>({
    controller:"products"
  },id);
  await firstValueFrom(deleteObservable);
}

//#endregion


  async readImages(id:string,successCallBack:()=>void):Promise<List_Product_Image[]>
    {
  const getObservable:Observable<List_Product_Image[]> =this.httpClientService.get<List_Product_Image[]>({
    action:"getproductimages",
    controller:"products"
  },id);

  const images:List_Product_Image[]=await firstValueFrom(getObservable);
  successCallBack();
  return  images;
}

async deleteImage(id:string,imageId:string,successCallBack?:()=>void){
const deleteObservable = this.httpClientService.delete({
  action:"deleteProductImage",
  controller:"products",
  queryString:`imageId=${imageId}`
},id)
await firstValueFrom(deleteObservable);
successCallBack();
}
}
