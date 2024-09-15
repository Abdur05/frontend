import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
@Component({
  selector: 'app-view-pdf-file',
  templateUrl: './view-pdf-file.component.html',
  styleUrls: ['./view-pdf-file.component.css']
})
export class ViewPdfFileComponent {
  pdfSrc:any = ''

  constructor(
    public dialogRef: MatDialogRef<ViewPdfFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.pdfSrc = 'http://localhost:4000/file?path='+this.data;
    console.log(this.pdfSrc, 'llll')
  }


  close(){
    this.dialogRef.close()
  }
}
