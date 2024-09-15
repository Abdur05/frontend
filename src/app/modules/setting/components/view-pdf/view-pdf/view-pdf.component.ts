import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPdfComponent {

  imgPath: any = 'http://localhost:4000/'

  constructor(
    public dialogRef: MatDialogRef<ViewPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    console.log(data)
    this.imgPath = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.imgPath}${this.data}`)

    console.log(this.imgPath, 'img')
  }
}
