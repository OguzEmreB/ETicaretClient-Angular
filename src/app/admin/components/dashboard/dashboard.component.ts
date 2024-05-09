import { Component, OnInit } from '@angular/core'; 
import { AlertifyOptions, AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent implements OnInit{

  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService){
super(spinner); // constructor da base  contructor'a parametre gönderme. c#daki base(spinner) gibi
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballAtom);
  }

  m(){
    this.alertify.message("Merhaba",{
      messageType: MessageType.Message,
      delay:3,
      position: Position.TopRight
    })
  }
  d(){
    this.alertify.dismiss();
  }
}