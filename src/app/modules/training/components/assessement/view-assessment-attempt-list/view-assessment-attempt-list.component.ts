import { Component, Inject } from '@angular/core';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-assessment-attempt-list',
  templateUrl: './view-assessment-attempt-list.component.html',
  styleUrls: ['./view-assessment-attempt-list.component.css']
})
export class ViewAssessmentAttemptListComponent {

  isLoader: any = false;
  assetDetails: any = []
  constructor(
    private assessmentSer: AssementCoursesLevelService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ViewAssessmentAttemptListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getAllAtemptDetails()
  }


  async getAllAtemptDetails() {
    try {
      this.isLoader = true
      const result: any = await this.assessmentSer.getAllAssesmentAttemptDetails()
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.isLoader = false;
        this.assetDetails = result.data
      }
    } catch (error: any) {
      console.log(error)
      this.isLoader = false;
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  close(){
    this.dialogRef.close()
  }
}
