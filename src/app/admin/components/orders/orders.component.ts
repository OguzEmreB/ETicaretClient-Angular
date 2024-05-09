import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent extends BaseComponent implements OnInit {
 
  constructor(spinner:NgxSpinnerService){
    super(spinner); // constructor da base  contructor'a parametre gönderme. c#daki base(spinner) gibi
      }

      
      ngOnInit(): void {
        this.showSpinner(SpinnerType.ballAtom);
      }


}
