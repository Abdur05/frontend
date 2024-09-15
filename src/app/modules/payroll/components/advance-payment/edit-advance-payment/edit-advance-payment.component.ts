import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { AdvancePaymentService } from '../../../services/advancePayment/advance-payment.service';

@Component({
  selector: 'app-edit-advance-payment',
  templateUrl: './edit-advance-payment.component.html',
  styleUrls: ['./edit-advance-payment.component.css']
})
export class EditAdvancePaymentComponent {

  advancePaymentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  employeeDetail: any = []
  advancePaymentId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private myprofileSer: MyProfileService,
    private advancePaySer: AdvancePaymentService,
    private activateRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.advancePaymentId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllEmployeeDetail()
    this.singleAdvancePaymentDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.advancePaymentFormGroup = this.fb.group({
      _id: ['', Validators.required],
      employeeId: ['', Validators.required],
      department: ['', Validators.required],
      advancePaymentAmount: ['', Validators.required],
      payment_date: ['', Validators.required],
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


      const result: any = await this.advancePaySer.updatadvancePaymentDetail(this.advancePaymentFormGroup.value)
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

  async singleAdvancePaymentDetails() {
    try {
      const result: any = await this.advancePaySer.singleadvancePaymentDetail(this.advancePaymentId)
      if (result.status === '1') {
        this.advancePaymentFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async getAllEmployeeDetail() {
    try {
      const result: any = await this.myprofileSer.getAllMyProfileDetails()
      // console.log(result);

      if (result.status === '1') {
        this.employeeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleEmployee(event: any) {
    const selectEmployee: any = this.employeeDetail.find((el: any) => el.employeeId === event.target.value)
    // console.log(selectEmployee, 'ooooooo');

    this.advancePaymentFormGroup.patchValue({
      department: selectEmployee ? selectEmployee.department : ''
    })
  }

}
