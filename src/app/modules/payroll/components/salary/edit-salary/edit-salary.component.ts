import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryService } from '../../../services/salary/salary.service';

@Component({
  selector: 'app-edit-salary',
  templateUrl: './edit-salary.component.html',
  styleUrls: ['./edit-salary.component.css']
})
export class EditSalaryComponent {

  salaryFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  employeeDetail: any = []
  salaryId: any = ''
  isShowScreenMenu: any = true;

  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private salarySer: SalaryService,
    private activateRouter: ActivatedRoute

  ) { }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  ngOnInit(): void {
    this.salaryId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.singleSalaryDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.salaryFormGroup = this.fb.group({
      _id: ['', Validators.required],
      componentType: ['', [Validators.required]],
      componentName: ['', Validators.required],
      nameinPayslip: ['', Validators.required],
      flatAmount: [''],
      amount: [''],
      maximumDeductionAmount: [''],
      frequencyDeduction: [''],
      maximumReimbursementAmount: [''],
      frequencyReimbursement: [''],
    });
  }

  async singleSalaryDetails() {
    try {
      const result: any = await this.salarySer.singleSalaryDetail(this.salaryId)
      if (result.status) {
        this.salaryFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.salaryFormGroup.invalid)
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

      this.salaryFormGroup.value.createdOn = fullDate
      this.salaryFormGroup.value.createdBy = username
      this.salaryFormGroup.value.changedOn = fullDate
      this.salaryFormGroup.value.changedBy = username

      const result: any = await this.salarySer.updateSalaryDetail(this.salaryFormGroup.value)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/salary-list/'])
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

}
