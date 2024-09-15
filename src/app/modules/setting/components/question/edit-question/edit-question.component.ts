import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalQuestionService } from '../../../services/medicalQuestion/medical-question.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent {


  departmentFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  medicalQuestionId: any = ''
  isShowScreenMenu:any = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private medicalSer: MedicalQuestionService,
    private activateRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.medicalQuestionId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.singleQuestionDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.departmentFormGroup = this.fb.group({
      _id: ['', Validators.required],
      questionId: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async singleQuestionDetail() {
    try {
      const result: any = await this.medicalSer.singlemedicalQuestionDetails(this.medicalQuestionId)
      if (result.status === '1') {
        this.departmentFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.departmentFormGroup.invalid)
        return
      const result: any = await this.medicalSer.updatemedicalQuestion(this.departmentFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/question-list/'])
        return
      }
      if (result.status === '0') {
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

}
