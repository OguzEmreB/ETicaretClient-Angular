import { Component, Inject } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fileupload-dialog',
  templateUrl: './fileupload-dialog.component.html',
  styleUrl: './fileupload-dialog.component.scss'
})
export class FileuploadDialogComponent extends BaseDialog<FileuploadDialogComponent> {

constructor(dialogRef:MatDialogRef<FileuploadDialogComponent>,   
  @Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState) { 
  super(dialogRef);
  
}
}
export enum FileUploadDialogState{
  Yes,
  No
}


 