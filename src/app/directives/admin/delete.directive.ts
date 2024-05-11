import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { ProductService } from '../../services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialog/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';

declare var $: any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() name: string;
  @Input() controller: string;
  @Output() callBack: EventEmitter<any> = new EventEmitter();
  @HostListener("click")

  async onClick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.ballAtom);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => {
        $(td.parentElement).animate({
          opacity: 0, left: "+=50",
          height: "toggle"
        },
          700, () => {
            this.callBack.emit();
            this.alertifyService.message("Ürün Başarıyla Silindi", {
              dismissOthers: true,
              messageType: MessageType.Success,
              position: Position.TopRight
            })
          });
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.ballAtom);
        this.alertifyService.message("Ürün Silinirken Beklenmeyen Bir Hatayla Karşılaşıldı",{
          dismissOthers:true,
          messageType:MessageType.Error,
          position:Position.TopRight
        })
      });
    });
  }


  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: {
        name: this.name,
        state: DeleteState.Yes
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
