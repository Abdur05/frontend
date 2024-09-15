import { Component } from '@angular/core';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PreviewAssessmentAlertMessageComponent } from '../preview-assessment-alert-message/preview-assessment-alert-message.component';
import { AssessmentQuestionsResultComponent } from '../assessment-questions-result/assessment-questions-result.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-questions',
  templateUrl: './assessment-questions.component.html',
  styleUrls: ['./assessment-questions.component.css']
})
export class AssessmentQuestionsComponent {
  assessmentId: any = '';
  courseId: any = '';
  currentQuestion: any = 0;
  currentDurations: any = 0;
  optionChoosed: any = [];
  questionDetails: any = {}

  constructor(
    private assessmentSer: AssementCoursesLevelService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
    private dialogBox: MatDialog
  ) {
    this.assessmentId = this.activateRouter.snapshot.paramMap.get('assessmentId')
    this.courseId = this.activateRouter.snapshot.paramMap.get('courseId')
    this.startAssessment()
    // this.handleInstructionBox(60)

  }



  async startAssessment() {
    try {
      const reqBody = {
        assessId: this.assessmentId
      }
      const result: any = await this.assessmentSer.createAssesmentAttempt(reqBody);
      if (result.status === true) {
        this.currentDurations = result.data.duration;
        this.handleInstructionBox(result.data.duration)
        this.questionDetails = result.data
        // this.router.navigate([`/training/assessment-question/${this.assessmentId}`])
        return;
      }
      if (result.status === false) {
        this.router.navigate([`/training/view-course/${this.courseId}`])

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleInstructionBox(data: any) {
    const dialogRef = this.dialogBox.open(PreviewAssessmentAlertMessageComponent, {
      data: data,
      width: '1000px',
      height: '1000px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.startTimer()
    });
  }


  startTimer(min?: any) {
    let minutes = this.currentDurations; // Set the initial number of minutes here
    let seconds = minutes * 60;
    const timerDisplay: any = document.getElementById("timerDisplay");

    const countdown = setInterval(() => {
      let displayMinutes: any = Math.floor(seconds / 60);
      let displaySeconds: any = seconds % 60;

      // Add leading zeros if needed
      displayMinutes = displayMinutes < 10 ? `0${displayMinutes}` : displayMinutes;
      displaySeconds = displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds;

      timerDisplay.innerHTML = `${displayMinutes}:${displaySeconds}`;

      // Check if the timer has reached zero
      if (seconds === 0) {
        clearInterval(countdown);
        // this.router.navigate([`/training/view-course/${this.courseId}`])

        this._snackBar.open("Time's up!", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      } else {
        seconds--;
      }
    }, 1000);
  }


  handleSubmit(index: any) {
    const questionLength = this.questionDetails?.questions.length;
    console.log(questionLength, 'questionLength', this.currentQuestion + 1)
    if (questionLength === (this.currentQuestion + 1)) {
      this.addedQuestion(this.questionDetails?.questions[index].questionId, index, 'finial')
    } else {
      this.addedQuestion(this.questionDetails?.questions[index].questionId, index, 'no')

    }
  }

  // handleFinish() {
  //   alert('done')
  // }

  async addedQuestion(data: any, index: any, type: any) {
    try {
      const reqBody = {
        attemptId: this.questionDetails.attemptId,
        questionId: data,
        optionChoosed: this.optionChoosed
      }
      console.log(reqBody, 'data');


      const result: any = await this.assessmentSer.saveAnswerDetails(reqBody);
      if (result.status === true) {
        if (type === 'no') {
          this.currentQuestion = index + 1;
          this.optionChoosed = []
        }
        if (type === 'finial') {
          result.data.courseId = this.courseId
          result.data.courseTitle = this.questionDetails?.title
          this.handleAssessmentresult(result.data)
        }
        return;
      }
      if (result.status === false) {
        // this.router.navigate([`/training/view-course/${this.courseId}`])

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  selectOption(type: any, id: any) {
    if (type === 'radio') {
      this.optionChoosed = [];
      this.optionChoosed.push(id)
    } else {
      this.optionChoosed.push(id)
    }
  }


  handleAssessmentresult(data: any) {
    const dialogRef = this.dialogBox.open(AssessmentQuestionsResultComponent, {
      data: data,
      width: '1000px',
      height: '1000px',
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.startTimer()
    });
  }

  handleExit() {
    Swal.fire({
      title: "Are you sure you want to exist?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.router.navigate([`/training/view-course/${this.courseId}`])
      }
    });
  }

}
