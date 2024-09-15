import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ReasonService } from 'src/app/modules/setting/services/reason/reason.service';
import { LoanRequestService } from '../../../services/loan-request/loan-request.service';

@Component({
  selector: 'app-add-loan-request',
  templateUrl: './add-loan-request.component.html',
  styleUrls: ['./add-loan-request.component.css']
})
export class AddLoanRequestComponent implements OnInit {

  loanRequestFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  today: String = ''
  isShowScreenMenu: any = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private loanSer: LoanRequestService
  ) {
    this.today = new Date().toISOString().split('T')[0];

  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  ngOnInit(): void {
    this.createFormdata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata() {
    this.loanRequestFormGroup = this.fb.group({
      loanAmount: ['', Validators.required],
      requestedDisbursementDate: ['', Validators.required],
      reason: [''],
      installment: ['', Validators.required],
      employeeName: [''],
      // employeeId: ['']
    });
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.loanRequestFormGroup.invalid)
        return
      const employeeId: any = localStorage.getItem('userName')
      const employeeName: any = localStorage.getItem('employeeName')

      this.loanRequestFormGroup.controls.employeeName.setValue(employeeName)
      // this.loanRequestFormGroup.controls.employeeId.setValue(employeeId)
      const result: any = await this.loanSer.createLoanRequestDetail(this.loanRequestFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/employee/loan-request-list/'])
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


}
