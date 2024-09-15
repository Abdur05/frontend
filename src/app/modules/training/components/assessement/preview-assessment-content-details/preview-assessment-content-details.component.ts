import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-assessment-content-details',
  templateUrl: './preview-assessment-content-details.component.html',
  styleUrls: ['./preview-assessment-content-details.component.css']
})
export class PreviewAssessmentContentDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<PreviewAssessmentContentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {

  }



  async startAssessment() {
    // try {
    //   const reqBody = {
    //     assessId: this.data._id
    //   }
    //   const result: any = await this.assessmentSer.createAssesmentAttempt(reqBody);
    //   if (result.status === true) {
        this.dialogRef.close()
        this.router.navigate([`/training/assessment-question/${this.data.courseId}/${this.data._id}`])
    //     return;
    //   }
    //   if (result.status === false) {
    //     this._snackBar.open(result.message, '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-error',
    //     });
    //   }

    // } catch (error: any) {
    //   this._snackBar.open(error.error.message, '', {
    //     duration: 5 * 1000, horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     panelClass: 'app-notification-error',
    //   });
    // }
  }
}
