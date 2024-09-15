import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';

@Component({
  selector: 'app-edit-employee-type',
  templateUrl: './edit-employee-type.component.html',
  styleUrls: ['./edit-employee-type.component.css']
})
export class EditEmployeeTypeComponent implements OnInit {


  employeeTypeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  employeeTypeId: any = ''
  isShowScreenMenu:any = true;

  constructor(
    private employeeTypeSer: EmployeeTypeService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeTypeId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.singleEmployeeTypeDetails()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata(data?: any) {
    if (data) {
      this.employeeTypeFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        employeeType: [data.employeeType],
        description: [data.description],
       
      });
    }
    this.employeeTypeFormGroup = this.fb.group({
      _id: ['', Validators.required],
      employeeType: [''],
      description: [''],

    });
  }
 
  async singleEmployeeTypeDetails() {
    try {
      const result: any = await this.employeeTypeSer.singleEmployeeTypeDetail(this.employeeTypeId)
      console.log(result);

      if (result.status === '1') {
        this.employeeTypeFormGroup.patchValue(result.data)
        // this.createFormdata(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.employeeTypeFormGroup.invalid)
        return
      const result: any = await this.employeeTypeSer.updateEmployeeTypeDetail(this.employeeTypeFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/employee-type-list/'])
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
