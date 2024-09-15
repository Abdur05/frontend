import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';

@Component({
  selector: 'app-add-employee-type',
  templateUrl: './add-employee-type.component.html',
  styleUrls: ['./add-employee-type.component.css']
})
export class AddEmployeeTypeComponent implements OnInit {

  employeeTypeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private employeeTypeSer: EmployeeTypeService
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
    this.employeeTypeFormGroup = this.fb.group({
      empType: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      employeeType: ['', Validators.required],
      description: ['']
    })
  }

  get employeeTypeDetail() {
    return this.employeeTypeFormGroup.get('empType') as FormArray
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
      if (this.employeeTypeFormGroup.invalid)
        return
      const result: any = await this.employeeTypeSer.createEmployeeTypeDetail(this.employeeTypeFormGroup.value)
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
