import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalaryService } from 'src/app/modules/payroll/services/salary/salary.service';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-salary-pre-on-boarding',
  templateUrl: './salary-pre-on-boarding.component.html',
  styleUrls: ['./salary-pre-on-boarding.component.css']
})
export class SalaryPreOnBoardingComponent {
  salaryDetail: any = [];
  salaryFormGroup: any = FormGroup;
  candidateId: any = '';
  isSubmitted: any = false;

  constructor(
    private salarySer: SalaryService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private preOnboardSer: PreOnboardingService,
    public dialogRef: MatDialogRef<SalaryPreOnBoardingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.createFormFields();
    this.getAllSalaryDetail()
    this.candidateId = this.data
  }


  createFormFields() {
    this.salaryFormGroup = this.fb.group({
      salary_details: this.fb.array([this.createSalaryDetailsFields()])
    })
  }


  get salary_detailsControllers() {
    return this.salaryFormGroup.get('salary_details') as FormArray
  }

  createSalaryDetailsFields() {
    return this.fb.group({
      type: ['', Validators.required],
      value: ['', Validators.required]
    })
  }

  addSalaryDetails() {
    this.salary_detailsControllers.push(this.createSalaryDetailsFields())
  }

  removeSalaryDetails(index: any, typeName: any) {
    this.salaryDetail.map((el: any) => {
      if (el.componentName === typeName) {
        el.disable = false
      }
    })
    this.salary_detailsControllers.removeAt(index);
  }


  async getAllSalaryDetail() {
    try {
      const result: any = await this.salarySer.getAllSalaryDetail()
      console.log(result);

      if (result.status) {
        this.salaryDetail = result.data;
        // this.salaryDetail.map((el: any) => el.disable = false)
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleSalaryType(event: any) {
    if (event.target.value) {
      this.salaryDetail.map((el: any) => el.disable = false)
      this.salaryFormGroup.value.salary_details.map((el: any) => {
        this.salaryDetail.map((ele: any) => {
          if (el.type === ele.componentName) {
            ele.disable = true
          }
        })
      })

    }
  }

  async handleSubmit() {
    try {
      this.isSubmitted = true
      if (this.salaryFormGroup.invalid)
        return
      var keysData: any = []
      var valueDate: any = []
      this.salaryFormGroup.value.salary_details.map((el: any) => {
        keysData.push(el.type)
        valueDate.push(el.value);
      });
      console.log(keysData, 'keys', valueDate)
      const reqBody = {
        salary_details: {

        }
      }
      keysData.map((el: any, i: any) => {
        reqBody.salary_details = { ...reqBody.salary_details, [el]: valueDate[i] }
      })
      console.log(reqBody, 'reqBody')
      const result: any = await this.preOnboardSer.updatePreOnboardingSalaryDetail(this.candidateId, reqBody);
      if (result.status) {
        this.dialogRef.close(true)
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      console.error(error);
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
}
