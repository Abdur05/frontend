import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobTypeService } from '../../../services/job-type/job-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-job-type',
  templateUrl: './edit-job-type.component.html',
  styleUrls: ['./edit-job-type.component.css']
})
export class EditJobTypeComponent {


  jobTypeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  jobTypeId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private jobTypeSer: JobTypeService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.jobTypeId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.singleEmployeeTypeDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata(data?: any) {
    if (data) {
      this.jobTypeFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        jobType: [data.jobType],
        description: [data.description],

      });
    }
    this.jobTypeFormGroup = this.fb.group({
      _id: ['', Validators.required],
      jobType: ['', Validators.required],
      description: ['', Validators.required],

    });
  }
  createEmployeeGroup(el?: any) {
    if (el) {
      return this.fb.group({
        employeeType: [el.employeeType],
        description: [el.description]
      })
    }
    return this.fb.group({
      employeeType: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  get employeeTypeDetail() {
    return this.jobTypeFormGroup.get('empType') as FormArray
  }

  addDetail() {
    this.employeeTypeDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.employeeTypeDetail.removeAt(index)
  }

  async singleEmployeeTypeDetails() {
    try {
      const result: any = await this.jobTypeSer.singleJobTypeDetail(this.jobTypeId)
      console.log(result);

      if (result.status === true) {
        this.jobTypeFormGroup.patchValue(result.data)
        // this.createFormdata(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.jobTypeFormGroup.invalid)
        return
      const result: any = await this.jobTypeSer.updateJobTypeDetail(this.jobTypeFormGroup.value)
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
