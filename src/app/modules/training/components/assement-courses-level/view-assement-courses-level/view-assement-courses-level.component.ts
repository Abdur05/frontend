import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { CourseService } from '../../../services/course/course.service';
import { QuestionBankService } from '../../../services/questionBank/question-bank.service';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-assement-courses-level',
  templateUrl: './view-assement-courses-level.component.html',
  styleUrls: ['./view-assement-courses-level.component.css']
})
export class ViewAssementCoursesLevelComponent {
  questionFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  courseDetail: any = []
  isShowScreenMenu: any = true;
  questionDetails: any = [];
  questionTypeList: any = ['MCQ-single', 'MCQ-multiple'];
  questionId: any = '';
  assesmentDetails:any = ''
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private assementSer: AssementCoursesLevelService,
    private courseSer: CourseService,
    private questionSer: QuestionBankService,
    private activateRouter: ActivatedRoute,
    public dialogRef: MatDialogRef<ViewAssementCoursesLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.questionId = this.data

    this.createFormField()
    this.getCourseDetail()
    this.getSingleQuestionDetails()

  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }
  createFormField(data?: any) {
    if (data) {
      this.getAllQuestionByCouserId(data.courseId)
      this.questionFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        noOfQuestion: [data.noOfQuestion, Validators.required],
        passPercentage: [data.passPercentage, Validators.required],
        courseId: [data.courseId, Validators.required],
        title: [data.title, Validators.required],
        totalMarks: [data.totalMarks, Validators.required],
        duration: [data.duration, Validators.required],
        noOfAttemptsAllowed: [data.noOfAttemptsAllowed, Validators.required],
        questions: this.fb.array(data.questions.map((el: any) => this.createFormArrayFields(el)))
      })
      return
    }
    this.questionFormGroup = this.fb.group({
      noOfQuestion: ['', Validators.required],
      passPercentage: ['', Validators.required],
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      totalMarks: ['', Validators.required],
      duration: ['', Validators.required],
      noOfAttemptsAllowed: ['', Validators.required],
      questions: this.fb.array([this.createFormArrayFields()])
    })
  }

  get optinalController() {
    return this.questionFormGroup.get('questions') as FormArray
  }

  createFormArrayFields(data?: any) {
    if (data) {
      return this.fb.group({
        questionId: [data.questionId, [Validators.required]],
        marks: [data.marks, [Validators.required]]
      })
    }
    return this.fb.group({
      questionId: ['', [Validators.required]],
      marks: ['', [Validators.required]]
    })
  }

  addOptions() {
    this.optinalController.push(this.createFormArrayFields())
  }

  removeOptions(index: any, questionId: any) {
    this.questionDetails.map((el: any) => {
      console.log(el._id, questionId)
      if (el._id === questionId) {
        el.disable = false
      }
    })
    this.optinalController.removeAt(index);
  }

  getAlphabet(index: number): string {
    return String.fromCharCode(65 + index); // 65 is the ASCII value for 'A'
  }

  async getSingleQuestionDetails() {
    try {
      const result: any = await this.assementSer.singleAssesmentDetail(this.questionId);
      console.log(result.data);
      if (result.status) {
        this.assesmentDetails = result.data
        this.createFormField(result.data)
      }
    } catch (error: any) {
      console.log(error)
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

  async submitData() {
    try {
      console.log(this.questionFormGroup.value);
      this.isSubmitted = true
      if (this.questionFormGroup.invalid)
        return

      const sumMarks = this.questionFormGroup.value.questions.reduce((acc: any, val: any) => Number(acc) + Number(val.marks), 0);
      console.log(sumMarks, 'kkkll', sumMarks !== Number(this.questionFormGroup.value.totalMarks), 'lll', Number(this.questionFormGroup.value.totalMarks))
      if (sumMarks !== Number(this.questionFormGroup.value.totalMarks)) {
        this._snackBar.open('Question Marks will be equal to Pass Percentage', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      const result: any = await this.assementSer.updateAssesmentDetail(this.questionFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/training/assement-list/'])
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
      console.log(error);
      if (error.error.message) {
        this._snackBar.open(error?.error?.message, '', {
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
      this.getAllQuestionByCouserId(event.target.value)
    }
  }

  async getAllQuestionByCouserId(courseId: any) {
    try {
      const result: any = await this.questionSer.getAllQuestionBankByCourseIdDetail(courseId)
      if (result.status === true) {
        this.questionDetails = result.data;
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

  handleQuestionType() {
    const formArray = this.questionFormGroup.get('options') as FormArray;
    formArray.reset()

  }

  handleQuestion(event: any, index: any) {
    if (event.target.value) {
      this.questionDetails.map((el: any) => el.disable = false)
      this.questionFormGroup.value.questions.map((el: any) => {
        this.questionDetails.map((ele: any) => {
          if (el.questionId === ele._id) {
            ele.disable = true
          }
        })
      })

    }
  }
}
