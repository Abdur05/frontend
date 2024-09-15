import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRequestService } from '../../../services/loan-request/loan-request.service';

@Component({
  selector: 'app-edit-loan-request',
  templateUrl: './edit-loan-request.component.html',
  styleUrls: ['./edit-loan-request.component.css']
})
export class EditLoanRequestComponent implements OnInit {

  loanRequestFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  today: String = ''
  loanRequestId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
    private loanSer: LoanRequestService

  ) {
    this.today = new Date().toISOString().split('T')[0];

  }

  isShowScreenMenu:any = true;

  
  ngOnInit(): void {
    this.loanRequestId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getLoanRequestDetails()

  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata() {
    this.loanRequestFormGroup = this.fb.group({
      _id: ['', Validators.required],
      // employeeId: [''],
      // employeeName: [''],
      loanAmount: ['', Validators.required],
      requestedDisbursementDate: ['', Validators.required],
      reason: [''],
      installment: ['', Validators.required]

    });
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.loanRequestFormGroup.invalid)
        return
      // const username: any = localStorage.getItem('userName')
      // const employeeName: any = localStorage.getItem('employeeName')

      // this.loanRequestFormGroup.controls.employeeId.setValue(username)
      // this.loanRequestFormGroup.controls.employeeName.setValue(employeeName)

      // const currentDate = new Date();
      // const year = currentDate.getFullYear();
      // const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      // const day = currentDate.getDate();
      // const hours = currentDate.getHours();
      // const minutes = currentDate.getMinutes();
      // const seconds = currentDate.getSeconds();

      // // Format the date and time
      // const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      // this.loanRequestFormGroup.value.createdOn = fullDate
      // this.loanRequestFormGroup.value.createdBy = username
      // this.loanRequestFormGroup.value.changedOn = fullDate
      // this.loanRequestFormGroup.value.changedBy = username

      const result: any = await this.loanSer.updateLoanRequestDetail(this.loanRequestFormGroup.value)
      if (result) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/employee/loan-request-list/'])
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

  async getLoanRequestDetails() {
    try {
      const result: any = await this.loanSer.singleLoanRequestDetail(this.loanRequestId)
      if (result) {
        this.loanRequestFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


}
