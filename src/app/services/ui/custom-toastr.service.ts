import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, toastrOptions:ToastrOptions) {
    this.toastr[toastrOptions.messageType](message, title,{
      positionClass:toastrOptions.position   
    
    });
    setTimeout(() => {
      this.toastr.clear()
    }, 5000);
  }
}

export class ToastrOptions{
  messageType:ToasterMessageType;
  position:ToasterPosition;    
}
export enum ToasterMessageType {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}
export enum ToasterPosition {
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft= "toast-top-left",
  TopFulllWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter="toast-top-center",
  BottomCenter = "toast-bottom-center"
}
