import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { CourseService } from '../../../services/course/course.service';
import { QuestionBankService } from '../../../services/questionBank/question-bank.service';

@Component({
  selector: 'app-add-question-bank',
  templateUrl: './add-question-bank.component.html',
  styleUrls: ['./add-question-bank.component.css']
})
export class AddQuestionBankComponent {
  questionFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  courseDetail: any = []
  isShowScreenMenu: any = true;
  moduleDetails: any = [];
  questionTypeList: any = ['MCQ-single', 'MCQ-multiple']
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private courseModSer: CourseModuleService,
    private courseSer: CourseService,
    private questionSer:QuestionBankService
  ) { }

  ngOnInit(): void {
    this.createFormField()
    this.getCourseDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }
  createFormField() {
    this.questionFormGroup = this.fb.group({
      question_type: ['', Validators.required],
      question: ['', Validators.required],
      courseId: ['', Validators.required],
      courseModuleId: ['', Validators.required],
      options: this.fb.array([this.createFormArrayFields()])
    })
  }

  get optinalController() {
    return this.questionFormGroup.get('options') as FormArray
  }

  createFormArrayFields() {
    return this.fb.group({
      option: ['', [Validators.required]],
      correct_answer: [false]
    })
  }

  addOptions() {
    this.optinalController.push(this.createFormArrayFields())
  }

  removeOptions(index: any) {
    this.optinalController.removeAt(index);
  }

  async submitData() {
    try {
      console.log(this.questionFormGroup.value);
      this.isSubmitted = true
      if (this.questionFormGroup.invalid)
        return

      if (this.questionFormGroup.value.question_type === 'MCQ-single') {
        const findDetails = this.questionFormGroup.value.options.filter((el: any) => el.correct_answer === true);
        if (findDetails.length === 0) {
          this._snackBar.open("Please Chosse the correct answer", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return
        }
        if (findDetails.length > 1) {
          this._snackBar.open("Please Select only one correct answer", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return
        }
      }
      if (this.questionFormGroup.value.question_type === 'MCQ-multiple') {
        const findDetails = this.questionFormGroup.value.options.filter((el: any) => el.correct_answer === true);
        if (findDetails.length === 0) {
          this._snackBar.open("Please Chosse the correct answer", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return
        }
       
        if (findDetails.length < 2) {
          this._snackBar.open("Please Select only two correct answer", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return
        }
      }
      const result: any = await this.questionSer.createQuestionBankDetail(this.questionFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/training/question-list/'])
        return
      }
      if (result.status === false) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getCourseDetail() {
    try {
      const result: any = await this.courseSer.getAllCourseDetail()
      if (result.status === true) {
        this.courseDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleCourse(event: any) {
    if (event.target.value) {
      this.getAllCourseModuleDetails(event.target.value)
    }
  }

  async getAllCourseModuleDetails(courseId: any) {
    try {
      const result: any = await this.courseModSer.getAllCourseModuleDetail(courseId)
      if (result.status === true) {
        this.moduleDetails = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  correctAnswer(event: any, index?: any) {
    this.questionFormGroup.value.options.map((el: any) => el.correct_answer = false);
    const formArray = this.questionFormGroup.get('options') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    formGroup.patchValue({
      correct_answer: event.target.checked
    })
  }
  
  handleCheckAnswer(event: any, index?: any) {
  //  const findAnswer= this.questionFormGroup.value.options.filter((el: any) => el.correct_answer === true);
  
    const formArray = this.questionFormGroup.get('options') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    formGroup.patchValue({
      correct_answer: event.target.checked
    })
  }

  handleQuestionType(){
    const formArray = this.questionFormGroup.get('options') as FormArray;
    formArray.reset()
   
  }
}
