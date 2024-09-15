import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PayslipService } from 'src/app/modules/payroll/services/payslips/payslip.service';
import { EmployeeTypeService } from 'src/app/modules/setting/services/employee-type/employee-type.service';

@Component({
  selector: 'app-get-payslip',
  templateUrl: './get-payslip.component.html',
  styleUrls: ['./get-payslip.component.css']
})
export class GetPayslipComponent implements OnInit {

  getPayslipFormGroup: any = FormGroup
  employeeTypeDetail: any = []
  isLoader:any =  false;
  constructor(
    private fb: FormBuilder,
    private employeeTypeSer: EmployeeTypeService,
    private _snackBar: MatSnackBar,
    private payslipSer: PayslipService,
    public dialogRef: MatDialogRef<GetPayslipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.createFormData()
    this.getEmployeeTypeDetail()
  }

  createFormData() {
    this.getPayslipFormGroup = this.fb.group({
      employeeType: ['']
    })
  }

  async getEmployeeTypeDetail() {
    try {
      const result: any = await this.employeeTypeSer.getAllEmployeeTypeDetail()
      console.log(result);

      if (result.status === '1') {
        this.employeeTypeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async submitPaySlip() {
    try {
      this.isLoader = true;
      const result: any = await this.payslipSer.generatePaySlip(this.getPayslipFormGroup.value)
      if (result) {
      this.isLoader = false;
        this.dialogRef.close(true)
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
      }
      else {
      this.isLoader = false;

        this._snackBar.open(result.message, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error'
        });
      }
    } catch (error: any) {
      this.isLoader = false;
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
}
