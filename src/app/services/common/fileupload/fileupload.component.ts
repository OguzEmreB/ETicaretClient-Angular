import { Component, Input, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToasterMessageType, ToasterPosition, ToastrOptions } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrl: './fileupload.component.scss'
})
export class FileuploadComponent {

  constructor(private httpClientservice: HttpClientService,
    private alertifyService: AlertifyService,
    private customToastrService: CustomToastrService) { }
  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientservice.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blab" })
    }, fileData).subscribe(data => {

      const message: string = "Dosyalar başarıyla yüklenmiştir";

      if (this.options.isAdminPage) {
        this.alertifyService.message(message, {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight
        })
      } else {
        this.customToastrService.message(message,"Başarılı",{
        messageType:ToasterMessageType.Success,
        position:ToasterPosition.TopRight
        })
      }

    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Dosyalar yüklenirken beklenmeyen bir hata ile karşılaşıldı";

      if (this.options.isAdminPage) {
        this.alertifyService.message(message, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      } else {
        this.customToastrService.message(message,"Başarılı",{
        messageType:ToasterMessageType.Error,
        position:ToasterPosition.TopRight
        })
      }
    });
  }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}