import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-assessment-alert-message',
  templateUrl: './preview-assessment-alert-message.component.html',
  styleUrls: ['./preview-assessment-alert-message.component.css']
})
export class PreviewAssessmentAlertMessageComponent {

  constructor(
    public dialogRef: MatDialogRef<PreviewAssessmentAlertMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){

  }


  handleOk(){
    this.dialogRef.close()
  }
}
