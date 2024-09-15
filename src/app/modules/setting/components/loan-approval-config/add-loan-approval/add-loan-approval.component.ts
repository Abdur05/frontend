import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';
import { RoleService } from '../../../services/role/role.service';
import { LoanApproveConfigService } from '../../../services/loan-approve-config/loan-approve-config.service';

@Component({
  selector: 'app-add-loan-approval',
  templateUrl: './add-loan-approval.component.html',
  styleUrls: ['./add-loan-approval.component.css']
})
export class AddLoanApprovalComponent {

  loanApprovalConfigFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  roleDetail: any = []
  empTypeDetail: any = []
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private empTypeSer: EmployeeTypeService,
    private roleSer: RoleService,
    private loanApproveSer: LoanApproveConfigService
  ) { }

  ngOnInit(): void {
    this.createFormdata()
    this.getAllEmployeeType()
    this.getAllRoleDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata() {
    this.loanApprovalConfigFormGroup = this.fb.group({
      employeeTypeId: [''],
      roleId: [''],
      approvalLevels: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      stages: [''],
    })
  }

  get employeeTypeDetail() {
    return this.loanApprovalConfigFormGroup.get('approvalLevels') as FormArray
  }

  addDetail() {
    this.employeeTypeDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.employeeTypeDetail.removeAt(index)
  }

  private transformFormData() {
    const formValue = this.loanApprovalConfigFormGroup.value;
    const approvalLevelsArray = formValue.approvalLevels;

    const transformedApprovalLevels = approvalLevelsArray.reduce((acc: any, level: any, index: any) => {
      acc[index] = level;
      return acc;
    }, {});

    return {
      employeeTypeId: formValue.employeeTypeId,
      roleId: formValue.roleId,
      approvalLevels: transformedApprovalLevels,
    };
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.loanApprovalConfigFormGroup.invalid)
        return
      // const transformedData = this.transformFormData();

      const result: any = await this.loanApproveSer.createloanApprovalstageDetail(this.loanApprovalConfigFormGroup.value)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/loan-approval-list/'])
        return
      }
      if (!result.status) {
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

  async getAllEmployeeType() {
    try {
      const result: any = await this.empTypeSer.getAllEmployeeTypeDetail()
      if (result) {
        this.empTypeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleEmployeeType(event: any) {
    const findEmpType = this.empTypeDetail.find((el: any) => el._id === event.target.value)
    console.log(findEmpType);
    this.loanApprovalConfigFormGroup.controls.employeeType.setValue(findEmpType.employeeType)

  }

  async getAllRoleDetail() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails()
      if (result) {
        this.roleDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleRole(event: any) {
    const findEmpType = this.roleDetail.find((el: any) => el._id === event.target.value)
    console.log(findEmpType);
    this.loanApprovalConfigFormGroup.controls.roleName.setValue(findEmpType.roleName)

  }
  handleRoleDetail(event: any) {
    if (event.target.value) {
      // this.salaryDetail.map((el: any) => el.disable = false);
      this.roleDetail.map((el: any) => {
        if (el._id === event.target.value) {
          el.disable = true
        }
      })

    }
  }

}
