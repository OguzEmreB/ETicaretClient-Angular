import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { FileuploadComponent } from './fileupload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileuploadDialogComponent } from '../../../dialog/fileupload-dialog/fileupload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogModule } from '../../../dialog/dialog.module';





@NgModule({
  declarations: [
    FileuploadComponent,
    FileuploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatDialogModule, MatButtonModule
  ],
  exports: [
    FileuploadComponent
  ]
})
export class FileuploadModule { }