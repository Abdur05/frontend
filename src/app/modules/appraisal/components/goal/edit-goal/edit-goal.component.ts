import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService } from '../../../services/goal/goal.service';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.css']
})
export class EditGoalComponent {

  goalFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  goalId: any = ''
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private goalSer: GoalService
  ) {
  }

  ngOnInit(): void {
    this.goalId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormFields()
    this.singleSkillsDetails()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormFields() {
    this.goalFormGroup = this.fb.group({
      _id: ['', Validators.required],
      goalName: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: [''],
      progress: [''],

    })
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  async singleSkillsDetails() {
    try {
      const result: any = await this.goalSer.singleGoalDetail(this.goalId)
      if (result.status === true) {
        this.goalFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      console.log(this.goalFormGroup.value);

      this.isSubmitted = true
      if (this.goalFormGroup.invalid)
        return

      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.goalFormGroup.value.createdOn = fullDate
      this.goalFormGroup.value.createdBy = username
      this.goalFormGroup.value.changedOn = fullDate
      this.goalFormGroup.value.changedBy = username


      const result: any = await this.goalSer.updateGoalDetail(this.goalFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/appraisal/goal-list'])
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

}
