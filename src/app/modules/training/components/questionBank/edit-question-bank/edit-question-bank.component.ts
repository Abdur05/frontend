import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { CourseService } from '../../../services/course/course.service';
import { QuestionBankService } from '../../../services/questionBank/question-bank.service';

@Component({
  selector: 'app-edit-question-bank',
  templateUrl: './edit-question-bank.component.html',
  styleUrls: ['./edit-question-bank.component.css']
})
export class EditQuestionBankComponent {
  questionFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  courseDetail: any = []
  isShowScreenMenu: any = true;
  moduleDetails: any = [];
  questionTypeList: any = ['MCQ-single', 'MCQ-multiple'];
  questionId:any = '';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private courseModSer: CourseModuleService,
    private courseSer: CourseService,
    private questionSer:QuestionBankService,
    private activateRouter: ActivatedRoute,

  ) { 
    this.questionId = this.activateRouter.snapshot.paramMap.get('id')

  }

  ngOnInit(): void {
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
  createFormField(data?:any) {
    if(data){
      this.getAllCourseModuleDetails(data.courseId._id)
      this.questionFormGroup = this.fb.group({
        _id:[data._id],
        question_type: [data.question_type, Validators.required],
        question: [data.question, Validators.required],
        courseId: [data.courseId._id, Validators.required],
        courseModuleId: [data.courseModuleId._id, Validators.required],
        options: this.fb.array(data.options.map((el:any) => this.createFormArrayFields(el)))
      })
      return
    }
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

  createFormArrayFields(data?:any) {
    if(data){
      return this.fb.group({
        option: [data.option, [Validators.required]],
        correct_answer: [data.correct_answer]
      })
    }
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


  async getSingleQuestionDetails() {
    try {
      const result: any = await this.questionSer.singleQuestionBankDetail(this.questionId);
      console.log(result.data);
      if (result.status) {
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
      this.questionFormGroup.value.options.map((el: any) => {
        if(el.correct_answer === null){
          el.correct_answer = false
        }
    
       });
      const result: any = await this.questionSer.updateQuestionBankDetail(this.questionFormGroup.value)
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
   this.questionFormGroup.value.options.map((el: any) => {
    if(el.correct_answer === null){
      el.correct_answer = false
    }

   });
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
