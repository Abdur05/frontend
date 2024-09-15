import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { SalaryService } from '../../../services/salary/salary.service';
import { ExtraEarningService } from '../../../services/extra-earning/extra-earning.service';
import { SalaryComponentService } from 'src/app/modules/setting/services/salary-component/salary-component.service';

@Component({
  selector: 'app-create-earning',
  templateUrl: './create-earning.component.html',
  styleUrls: ['./create-earning.component.css']
})
export class CreateEarningComponent {

  advancePaymentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  designationDetail: any = []
  departmentDetail: any = []
  salaryDetail: any = []
  today: string = '';
  amountLabel: string = 'Amount';
  showAmountField: boolean = false;
  employeeResponse: any = []
  showTableAndSaveButton: boolean = false;
  tableHeader: string = 'Bonus';
  isShowScreenMenu: any = true;
  filterProfileDetails: any = [];
  filterDesignationList: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private designationSer: DesignationService,
    private depatmentSer: DepartmentService,
    private salarySer: SalaryService,
    private extraEarSer: ExtraEarningService,
    private salaryCompSer: SalaryComponentService
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.data()
    this.getAllDepatmentDetail()
    this.getAllDesignationDetail()
    this.getAllSalaryDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.advancePaymentFormGroup = this.fb.group({
      designation: ['', Validators.required],
      department: ['', Validators.required],
      transaction_date: ['', Validators.required],
      earning_component: ['', Validators.required],
      percentage_FlatAmount: ['', Validators.required],
      percentage_amount: ['', Validators.required],
      employeeDetails: this.fb.array([this.cretaeFormArray()])
    });
    this.advancePaymentFormGroup.get('percentage_FlatAmount')?.valueChanges.subscribe((value: any) => {
      this.updateAmountLabel(value);
    });
    this.advancePaymentFormGroup.get('percentage_amount')?.valueChanges.subscribe((value: any) => {
      this.updateAmounts(value);
    });

  }
  updateAmountLabel(value: string): void {
    if (value === 'Percentage') {
      this.amountLabel = 'Percentage Amount';
      this.showAmountField = true;
    } else if (value === 'Flat Amount') {
      this.amountLabel = 'Flat Amount';
      this.showAmountField = true;
    } else {
      this.amountLabel = 'Amount';
      this.showAmountField = false;
    }

  }

  updateAmounts(value: string): void {
    this.employeeFormArray.controls.forEach(group => {
      group.get('amount')?.setValue(value);
    });
  }

  updateTableHeader(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedComponent = this.salaryDetail.find((detail: any) => detail._id === selectedValue);
    this.tableHeader = selectedComponent ? selectedComponent.component_name : 'Bonus';
  }

  cretaeFormArray(el?: any) {
    if (el) {
      return this.fb.group({
        emp_code: [el.employeeId || ''],
        amount: [this.advancePaymentFormGroup.get('percentage_amount')?.value || '', Validators.required],
        transaction_date: [el.transaction_date],
      })
    }
    return this.fb.group({
      emp_code: [''],
      amount: ['', Validators.required],
      transaction_date: [''],
    })
  }

  get employeeFormArray() {
    return this.advancePaymentFormGroup.get('employeeDetails') as FormArray
  }
  addDetail() {
    this.employeeFormArray.push(this.cretaeFormArray())
  }
  deleteRow(index: any) {
    this.employeeFormArray.removeAt(index)
  }

  async getEmployee() {
    try {
      const result: any = await this.extraEarSer.getExtraEarningDetailFilter(this.advancePaymentFormGroup.value)
      console.log(result);

      if (result.status === true) {
        this.employeeResponse = result.data
        console.log(this.employeeResponse);
        this.employeeFormArray.clear()
        this.employeeResponse.forEach((emp: any) => {
          this.employeeFormArray.push(this.cretaeFormArray(emp));
        });
        this.showTableAndSaveButton = true;
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.advancePaymentFormGroup.invalid)
        return
      const transactionDate = this.advancePaymentFormGroup.get('transaction_date')?.value;

      this.employeeFormArray.controls.forEach(group => {
        group.get('transaction_date')?.setValue(transactionDate);
      });
      const result: any = await this.extraEarSer.createExtraEarningDetail(this.advancePaymentFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/extra-earnings/'])
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


  async getAllDesignationDetail() {
    try {
      const result: any = await this.designationSer.getAllDesignationDetails()
      console.log(result);
      if (result) {
        this.designationDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async getAllDepatmentDetail() {
    try {
      const result: any = await this.depatmentSer.getAlldepartmentDetails()
      console.log(result);

      if (result) {
        this.departmentDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async getAllSalaryDetail() {
    try {
      const result: any = await this.salaryCompSer.getAllSalaryComponent()
      console.log(result);

      if (result) {
        this.salaryDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleDeperament(event: any) {
    if (event.target.value) {
      const findDetails = this.departmentDetail.find((el: any) => el._id === event.target.value);
      console.log("findDetails----", findDetails);
      console.log("this.designationDetail----", this.designationDetail);
      if (findDetails) {
        this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === findDetails.departmentId)
      }
    }
  }
}
