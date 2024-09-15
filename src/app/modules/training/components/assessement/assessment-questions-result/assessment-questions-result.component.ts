import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assessment-questions-result',
  templateUrl: './assessment-questions-result.component.html',
  styleUrls: ['./assessment-questions-result.component.css']
})
export class AssessmentQuestionsResultComponent {



  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<AssessmentQuestionsResultComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }


  handleExit() {
    this.dialogRef.close()
    this.router.navigate([`/training/view-course/${this.data.courseId}`])
  }
}
