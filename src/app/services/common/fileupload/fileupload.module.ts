import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialog/dialog.module';
import { FileuploadDialogComponent } from '../../../dialog/fileupload-dialog/fileupload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    FileuploadComponent,
    FileuploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule
  ],
  exports: [
    FileuploadComponent
  ]
})
export class FileuploadModule { }