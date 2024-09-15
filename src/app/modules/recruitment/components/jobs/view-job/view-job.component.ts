import { Component, Inject } from '@angular/core';
import { JobService } from '../../../services/jobs/-job.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent {

  jobId:any = '';
  jobDetails:any = ''
  constructor(
    private _snackBar: MatSnackBar,
    private jobSer: JobService,
    public dialogRef: MatDialogRef<ViewJobComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.jobId = this.data
    this.singleJobDetail()

  }


  async singleJobDetail() {
    try {
      const result: any = await this.jobSer.singleJobDetail(this.jobId)
      console.log(result.data, 'single');

      if (result.status) {
        this.jobDetails = result.data
      }
    

    } catch (error) {
      console.log(error)
    }
  }

  close(){
    this.dialogRef.close()
  }
}
