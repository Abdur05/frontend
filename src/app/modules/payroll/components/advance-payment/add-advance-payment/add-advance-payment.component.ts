import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { AdvancePaymentService } from '../../../services/advancePayment/advance-payment.service';

@Component({
  selector: 'app-add-advance-payment',
  templateUrl: './add-advance-payment.component.html',
  styleUrls: ['./add-advance-payment.component.css']
})
export class AddAdvancePaymentComponent {

  advancePaymentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  employeeDetail: any = []


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private myprofileSer: MyProfileService,
    private advancePaySer: AdvancePaymentService
    // private reasonSer: ReasonService

  ) { }

  ngOnInit(): void {
    this.data()
    this.getAllEmployeeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.advancePaymentFormGroup = this.fb.group({
      employeeId: ['', Validators.required],
      department: ['', Validators.required],
      advancePaymentAmount: ['', Validators.required],
      payment_date: ['', [Validators.required, this.futureDateValidator]],
      installmentForMonth: ['', Validators.required],
      advanceGivenBy: ['', Validators.required],
      remarks: [''],
    });
  }


  futureDateValidator(control: any) {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    if (inputDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.advancePaymentFormGroup.invalid)
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

      this.advancePaymentFormGroup.value.createdOn = fullDate
      this.advancePaymentFormGroup.value.createdBy = username
      this.advancePaymentFormGroup.value.changedOn = fullDate
      this.advancePaymentFormGroup.value.changedBy = username
      const result: any = await this.advancePaySer.createadvancePaymentDetail(this.advancePaymentFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/advance-payment-list/'])
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

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.myprofileSer.getAllMyProfileDetails()
      if (result.status === '1') {
        this.employeeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleEmployee(event: any) {
    const selectEmployee: any = this.employeeDetail.find((el: any) => el.employeeId === event.target.value)
    this.advancePaymentFormGroup.patchValue({
      department: selectEmployee ? selectEmployee.department : ''
    })
  }


}
