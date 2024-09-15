import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';
import { RoleService } from '../../../services/role/role.service';
import { LoanApproveConfigService } from '../../../services/loan-approve-config/loan-approve-config.service';

@Component({
  selector: 'app-edit-loan-approval',
  templateUrl: './edit-loan-approval.component.html',
  styleUrls: ['./edit-loan-approval.component.css']
})
export class EditLoanApprovalComponent {

  loanApprovalConfigFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  roleDetail: any = []
  empTypeDetail: any = []
  loanConfigId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private empTypeSer: EmployeeTypeService,
    private roleSer: RoleService,
    private loanApproveSer: LoanApproveConfigService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loanConfigId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getAllEmployeeType()
    this.getAllRoleDetail()
    this.singleLoanConfigDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata(data?: any) {
    if (data) {
      this.loanApprovalConfigFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        employeeTypeId: [data.employeeTypeId],
        roleId: [data.roleId],
        // approvalLevels: this.fb.array([this.createEmployeeGroup()])
        approvalLevels: data.approvalLevels ? this.fb.array(data.approvalLevels.map((el: any) => this.createEmployeeGroup(el))) : this.fb.array([]),
      })
      this.loanApprovalConfigFormGroup.patchValue(data)

      return
    }
    this.loanApprovalConfigFormGroup = this.fb.group({
      _id: ['', Validators.required],
      employeeTypeId: [''],
      roleId: [''],
      approvalLevels: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup(el?: any) {
    if (el) {
      return this.fb.group({
        stages: [el.stages],
      })
    }
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
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.loanApprovalConfigFormGroup.invalid)
        return
      const result: any = await this.loanApproveSer.updateloanApprovalstageDetail(this.loanApprovalConfigFormGroup.value)
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


  async singleLoanConfigDetails() {
    try {
      const result: any = await this.loanApproveSer.singleloanApprovalstageDetail(this.loanConfigId)

      if (result.status) {
        this.createFormdata(result.data)
      }
    } catch (error) {
      console.log(error)
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

}
