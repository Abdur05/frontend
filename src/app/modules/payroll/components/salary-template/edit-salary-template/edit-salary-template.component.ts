import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../../services/salary/salary.service';
import { SalaryTemplateService } from '../../../services/salary-template/salary-template.service';

@Component({
  selector: 'app-edit-salary-template',
  templateUrl: './edit-salary-template.component.html',
  styleUrls: ['./edit-salary-template.component.css']
})
export class EditSalaryTemplateComponent {

  salaryTemplateFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  salaryDetail: any = []
  salaryTempId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private salarySer: SalaryService,
    private salaryTempSer: SalaryTemplateService,
    private activateRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.salaryTempId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getAllSalaryDetail()
    this.singleSalaryTempDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata(data?: any) {
    if (data) {
      this.salaryTemplateFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        templateID: [data.templateID, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
        description: [data.description],
        earningList: this.fb.array(data.earningList.map((ele: any) => this.addEarning(ele))),
        deductionList: this.fb.array(data.deductionList.map((ele: any) => this.addDeduction(ele))),
      });
      return
    }
    this.salaryTemplateFormGroup = this.fb.group({
      _id: ['', Validators.required],
      templateID: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      templateName: ['', [Validators.required]],
      description: [''],

      earningList: this.fb.array([this.addEarning()]),
      deductionList: this.fb.array([this.addDeduction()]),
    });
  }

  addEarning(data?: any) {

    if (data) {
      return this.fb.group({
        salaryComponent: [data.salaryComponent],
        calculationType: [data.calculationType],
        monthlyAmount: [data.monthlyAmount],
        annualAmount: [data.annualAmount],
      })
    }
    return this.fb.group({
      salaryComponent: [''],
      calculationType: [''],
      monthlyAmount: [''],
      annualAmount: [''],
    })
  }

  get earningDetail() {
    return this.salaryTemplateFormGroup.get('earningList') as FormArray
  }

  addEarningDetail() {
    this.earningDetail.push(this.addEarning())
  }
  deleteRow(index: any) {
    this.earningDetail.removeAt(index)
  }

  addDeduction(data?: any) {
    if (data) {
      return this.fb.group({
        salaryComponent1: [data.salaryComponent1],
        calculationType1: [data.calculationType1],
        monthlyAmount1: [data.monthlyAmount1],
        annualAmount1: [data.annualAmount1],
      })
    }
    return this.fb.group({
      salaryComponent1: [''],
      calculationType1: [''],
      monthlyAmount1: [''],
      annualAmount1: [''],
    })
  }

  get deductionDetail() {
    return this.salaryTemplateFormGroup.get('deductionList') as FormArray
  }

  addDeductionDetail() {
    this.deductionDetail.push(this.addDeduction())
  }
  deleteRowDection(index: any) {
    this.deductionDetail.removeAt(index)
  }

  async getAllSalaryDetail() {
    try {
      const result: any = await this.salarySer.getAllSalaryDetail()
      console.log(result);

      if (result.status === '1') {
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

  async singleSalaryTempDetails() {
    try {
      const result: any = await this.salaryTempSer.singlesalaryTemplateDetail(this.salaryTempId)
      if (result.status === '1') {
        // this.salaryTemplateFormGroup.patchValue(result.data)
        this.createdata(result.data)
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
      if (this.salaryTemplateFormGroup.invalid)
        return
      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.salaryTemplateFormGroup.value.createdOn = fullDate
      this.salaryTemplateFormGroup.value.createdBy = username
      this.salaryTemplateFormGroup.value.changedOn = fullDate
      this.salaryTemplateFormGroup.value.changedBy = username

      const result: any = await this.salaryTempSer.updatesalaryTemplateDetail(this.salaryTemplateFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/salary-template-list/'])
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
