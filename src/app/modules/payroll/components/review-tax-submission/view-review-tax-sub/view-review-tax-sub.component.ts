import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxDeclarationService } from 'src/app/modules/setting/services/tax-declaration/tax-declaration.service';
import { TaxDecEmployeeService } from '../../../services/tax-dec-employee/tax-dec-employee.service';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';

@Component({
  selector: 'app-view-review-tax-sub',
  templateUrl: './view-review-tax-sub.component.html',
  styleUrls: ['./view-review-tax-sub.component.css']
})
export class ViewReviewTaxSubComponent {


  taxSubmisiionEmployeeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  taxDecDetail: any = [];
  fiscalYear: any = ''
  formData: any = ''
  reviewTaxSubmDetail: any = []
  errorIndex: any = '';
  feedbackMessage: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxDecSer: TaxDeclarationService,
    private taxDecEmployeeSer: TaxDecEmployeeService,
    public dialogRef: MatDialogRef<ViewReviewTaxSubComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    console.log("data1-----", this.data1);
    this.viewUpdate()
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    this.getAllTaxDeclerationEmployee()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  getFormattedFinancialYear(date: Date): string {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    let startYear: number;
    let endYear: number;

    // Financial year starts from April (month index 3)
    if (currentMonth >= 3) {
      startYear = currentYear;
      endYear = currentYear + 1;
    } else {
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    return `April ${startYear} - March ${endYear}`;
  }

  viewUpdate(data?: any) {
    if (data) {
      const componentCodes = data.declarations.components.map((component: any) => component._id);
      const statuses = data.declarations.components.map((component: any) => component.status);
      console.log(componentCodes, statuses);

      this.taxSubmisiionEmployeeFormGroup = this.fb.group({
        employeeId: [data.declarations.emp_code],
        component_code_id: this.fb.array(componentCodes.map((code: any) => this.fb.control(code))),
        fiscal_year: [data.fiscal_year],
        status: this.fb.array(statuses.map((status: any) => this.fb.control(status)))
      });
    } else {
      this.taxSubmisiionEmployeeFormGroup = this.fb.group({
        employeeId: [''],
        component_code_id: this.fb.array([]),
        fiscal_year: [''],
        status: this.fb.array([])
      });
    }
    return this.taxSubmisiionEmployeeFormGroup;
  }
  get componentCodeIds(): FormArray {
    return this.taxSubmisiionEmployeeFormGroup.get('component_code_id') as FormArray;
  }

  get statuses(): FormArray {
    return this.taxSubmisiionEmployeeFormGroup.get('status') as FormArray;
  }

  // async submitData() {
  //   try {
  //     this.isSubmitted = true
  //     console.log(this.taxSubmisiionEmployeeFormGroup.value);

  //     if (this.taxSubmisiionEmployeeFormGroup.invalid)
  //       return

  //     const result: any = await this.taxDecEmployeeSer.updateReviewTaxDetail(this.taxSubmisiionEmployeeFormGroup.value)
  //     if (result.status === true) {
  //       this._snackBar.open(result.message, '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.dialogRef.close()
  //     }
  //   } catch (error: any) {
  //     this._snackBar.open(error.error.message, '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });

  //   }
  // }


  async submitData(componentCode: string, status: string, index: any) {
    try {
      this.isSubmitted = true;

      // Check if componentCode and status are provided
      if (!componentCode || !status) {
        console.error("Component code or status is missing");
        return;
      }

      // Create a request payload with the specific component code and status
      const payload = {
        employeeId: this.taxSubmisiionEmployeeFormGroup.get('employeeId')?.value,
        component_code_id: componentCode,
        fiscal_year: this.taxSubmisiionEmployeeFormGroup.get('fiscal_year')?.value,
        status: status,
        comment: this.feedbackMessage
      };

      if (payload.status === 'Rejected') {
        if (!this.feedbackMessage) {
          this.errorIndex = index
          this._snackBar.open('Please Enter the Comment', '', {
            duration: 5 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
          return

        }

      }

      console.log(payload);

      const result: any = await this.taxDecEmployeeSer.updateReviewTaxDetail(payload);
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        //this.dialogRef.close();
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }




  async getAllTaxDeclerationEmployee() {
    try {
      const result: any = await this.taxDecEmployeeSer.singletaxdeclarationEmployeeDetailForMyTeam(this.fiscalYear, this.data1);
      if (result.status === true) {
        // this.createEmployeeGroup(result.data[0])
        this.viewUpdate(result.data[0])
        this.reviewTaxSubmDetail = result.data
        console.log(this.reviewTaxSubmDetail)

      }
    } catch (error: any) {
      console.error(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleUpdate(id: any) {
    const dialogRef = this.dialog.open(ViewPdfFileComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }
  close() {
    this.dialogRef.close(false)
  }


  handleComment(event: any, index: any, componentValue: any, statusValue: any) {
    if (event.target.value) {
      this.feedbackMessage = event.target.value;
      this.errorIndex = '';
      if (statusValue === "Rejected")
        this.submitData(componentValue, statusValue, index)
    }
  }

}
