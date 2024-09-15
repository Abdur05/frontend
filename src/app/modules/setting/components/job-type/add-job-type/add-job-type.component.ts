import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobTypeService } from '../../../services/job-type/job-type.service';

@Component({
  selector: 'app-add-job-type',
  templateUrl: './add-job-type.component.html',
  styleUrls: ['./add-job-type.component.css']
})
export class AddJobTypeComponent {


  jobTypeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private jobTypeSer: JobTypeService
  ) { }

  ngOnInit(): void {
    this.createFormdata()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata() {
    this.jobTypeFormGroup = this.fb.group({
      jobTypeList: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      jobType: ['', Validators.required],
      description: ['',Validators.required]
    })
  }

  get employeeTypeDetail() {
    return this.jobTypeFormGroup.get('jobTypeList') as FormArray
  }

  addDetail() {
    this.employeeTypeDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.employeeTypeDetail.removeAt(index)
  }
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.jobTypeFormGroup.invalid)
        return
      const result: any = await this.jobTypeSer.createJobTypeDetail(this.jobTypeFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/job-type-list/'])
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
