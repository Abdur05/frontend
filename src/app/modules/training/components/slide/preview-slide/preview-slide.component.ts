import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-slide',
  templateUrl: './preview-slide.component.html',
  styleUrls: ['./preview-slide.component.css']
})
export class PreviewSlideComponent {
  previewSlide: any = '';
  safeUrl!: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<PreviewSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.previewSlider(this.data)
  }


  
 

  previewSlider(data: any) {
    this.previewSlide = data;
    if (this.previewSlide.content[0].type === 'PDF / Image') {
      const url = 'http://localhost:4000/file?path=' + this.previewSlide.content[0].value;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    } else if (this.previewSlide.content[0].type === 'Text') {
      this.previewSlide.content[0].value = this.previewSlide.content[0].value.replace(/\n/g, '<br>');
    } else if (this.previewSlide.content[0].type === 'YouTube Url') {
      const splitValue = this.previewSlide.content[0].value.split('=');
      const youtubeUrl: any = `https://www.youtube.com/embed/${splitValue[splitValue.length - 1]}`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);

    }
    else if (this.previewSlide.content[0].type === 'External Url') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewSlide.content[0].value);
    }
  }


  close(){
    this.dialogRef.close()
  }
}
