import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JobTypeService } from '../../../services/job-type/job-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-job-type',
  templateUrl: './view-job-type.component.html',
  styleUrls: ['./view-job-type.component.css']
})
export class ViewJobTypeComponent {

  jobTypeId: any = '';
  jobTypeDetails: any = ''
  constructor(
    private _snackBar: MatSnackBar,
    private jobTypeSer: JobTypeService,
    public dialogRef: MatDialogRef<ViewJobTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.jobTypeId = this.data
    this.singleJobDetail()

  }


  async singleJobDetail() {
    try {
      const result: any = await this.jobTypeSer.singleJobTypeDetail(this.jobTypeId)
      if (result.status) {
        this.jobTypeDetails = result.data
      }
    } catch (error:any) {
      console.log(error)
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  close() {
    this.dialogRef.close()
  }
}
