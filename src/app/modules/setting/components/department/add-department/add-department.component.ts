import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../services/department/department.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { DesignationService } from '../../../services/designation/designation.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {


  departmentFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  employeeDetail: any = []
  isShowScreenMenu: any = true;
  desginationList: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private departmentSer: DepartmentService,
    private profileSer: MyProfileService,
    private desginationSer: DesignationService

  ) { }

  ngOnInit(): void {
    this.data()
    this.getAllEmployeeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.departmentFormGroup = this.fb.group({
      departmentId: ['', [Validators.required]],
      departmentName: ['', [Validators.required]],
      description: ['', Validators.required],
      headofDepartment: ['', Validators.required]
    });
  }

  checkInputLength(event: any) {
    if (event.target.value) {

      if (this.departmentFormGroup.value.locationId.length > 3) {
        this.departmentFormGroup.controls.companyCode.setValue(this.perviousValue)
        return
      }
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.departmentFormGroup.invalid)
        return
      const result: any = await this.departmentSer.createdepartment(this.departmentFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/department-list/'])
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

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result) {
        this.employeeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }






}
