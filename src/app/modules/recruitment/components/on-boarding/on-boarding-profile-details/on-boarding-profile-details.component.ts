import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { EmployeeTypeService } from 'src/app/modules/setting/services/employee-type/employee-type.service';
import { LocationService } from 'src/app/modules/setting/services/location/location.service';
import { RoleService } from 'src/app/modules/setting/services/role/role.service';
import { ShiftMaintenanceService } from 'src/app/modules/setting/services/shift/shift-maintenance.service';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';

@Component({
  selector: 'app-on-boarding-profile-details',
  templateUrl: './on-boarding-profile-details.component.html',
  styleUrls: ['./on-boarding-profile-details.component.css']
})
export class OnBoardingProfileDetailsComponent {

  designationDetail: any = [];
  departmentDetail: any = [];
  profileDetails: any = [];
  roleDetail: any = [];
  filterDesignationList: any = [];
  filterRoleList: any = [];
  filterProfileDetails: any = [];
  locationDetail: any = []
  shiftDetail: any = []
  employeeTypeDetail: any = [];
  profileFormGroup: any = FormGroup;
  isSubmitted: any = false;
  constructor(
    private _snackBar: MatSnackBar,
    private profileSer: MyProfileService,
    private roleSer: RoleService,
    private locationSer: LocationService,
    private shiftMaintenanceSer: ShiftMaintenanceService,
    private empTypeSer: EmployeeTypeService,
    private preOnboardSer: PreOnboardingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OnBoardingProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.createFormFields()
    this.getAllEmployeeDetail()
    this.getAllRolesDetail()
    this.getAllShiftMaintenanceDetail()
    this.getAllEmployeeTypeDetail();
    this.getAllLocationDetail();
    console.log(this.data)
  }


  createFormFields() {
    this.profileFormGroup = this.fb.group({
      reportingManager: ['', Validators.required],
      role: ['', Validators.required],
      roleId: ['', Validators.required],
      locationId: ['', Validators.required],
      defaultShift: ['', Validators.required],
      employeeTypeId: ['', Validators.required],
    })
  }






  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result.status) {
        this.profileDetails = result.data;
        this.filterProfileDetails = this.profileDetails.filter((el: any) => el.department === this.data.employeeDetails.department &&  (el.role === 'Reporting Manager' || el.role === 'Supervisor' || el.role === 'Admin') );

      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllRolesDetail() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails()
      if (result.status === '1') {
        this.roleDetail = result.data;
        this.filterRoleList = this.roleDetail.filter((el: any) => (el.departmentId === this.data.employeeDetails.departmentId && el.designationId === this.data.employeeDetails.designationId));

      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllLocationDetail() {
    try {
      const result: any = await this.locationSer.getAllLocationDetails()
      if (result) {
        this.locationDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllShiftMaintenanceDetail() {
    try {
      const result: any = await this.shiftMaintenanceSer.getAllShiftMaintenanceDetail()
      if (result) {
        this.shiftDetail = result.data
        const findDetails = this.shiftDetail.find((el:any) => el.description.toLowerCase() === 'general');
        if(findDetails){
          this.profileFormGroup.controls.defaultShift.setValue(findDetails._id)
        }
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllEmployeeTypeDetail() {
    try {
      const result: any = await this.empTypeSer.getAllEmployeeTypeDetail()
      if (result) {
        this.employeeTypeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleRole(event: any) {
    if (event.target.value) {
      const findDetails = this.roleDetail.find((el: any) => el._id === event.target.value);
      this.profileFormGroup.controls.role.setValue(findDetails.roleId)
    }
  }




  async handleProfileCreate() {
    try {
      this.isSubmitted = true;
      if (this.profileFormGroup.invalid) {
        return;
      }
      console.log(this.profileFormGroup.value)
      const result: any = await this.preOnboardSer.createEmployeeDetailsbyCandiate(this.profileFormGroup.value, this.data.employeeDetails.candidateId, this.data.status);
      if (result.status) {
        this.dialogRef.close(true)
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });

      }
    } catch (error: any) {
      console.error(error);
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }

  }


  close() {
    this.dialogRef.close(false)

  }
}
