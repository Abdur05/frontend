import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { ReasonService } from 'src/app/modules/setting/services/reason/reason.service';
import { MyRequestService } from '../../../services/my-request/my-request.service';

@Component({
  selector: 'app-add-my-request',
  templateUrl: './add-my-request.component.html',
  styleUrls: ['./add-my-request.component.css']
})
export class AddMyRequestComponent {


  myRequestFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  reasonDetail: any = []
  selectedEmployeeId: '' | undefined
  employeeDetail: any = []
  isShowScreenMenu: any = true;
  maxDate: any = ''
minDate:any = '';
  currentDate: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reasonSer: ReasonService,
    private profileSer: MyProfileService,
    private myRequestSer: MyRequestService

  ) {
    this.currentDate = this.getCurrentDate();
    this.minDate = this.findCurrentMonth(this.currentDate);
    this.maxDate = this.getMaxDate();
  }

  ngOnInit(): void {
    this.data()
    this.getAllReasonDetail()
    this.getAllEmployeeDetail()
  }

  getCurrentDate(): string {
    const today = new Date();
    const offset = today.getTimezoneOffset() * 60000; // Convert offset to milliseconds
    const localDate = new Date(today.getTime() - offset);
    console.log("localDate.toISOString().split('T')[0]----", localDate.toISOString().split('T')[0]);
    return localDate.toISOString().split('T')[0]; // Returns date in 'YYYY-MM-DD' format
  }

  findCurrentMonth(date: string): string {
    const currentDate = new Date(date);
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDayOfMonth.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }

  getMaxDate(): string {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfMonth.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  data() {
    this.myRequestFormGroup = this.fb.group({
      employeeId: ['', Validators.required],
      employeeName: [''],
      attendanceDate: [this.currentDate, Validators.required],
      totalHours: [''],
      reason: ['', Validators.required],
      description: [''],
      checkOut: ['', Validators.required],
      checkIn: ['', Validators.required],
      reportingManager: ['']
    });

  }

  validateTimeComparison() {
    const checkIn = this.myRequestFormGroup.get('checkIn').value;
    const checkOut = this.myRequestFormGroup.get('checkOut').value;

    if (checkIn && checkOut && checkIn > checkOut) {
      this.myRequestFormGroup.get('checkOut').setErrors({ 'oldGreaterThanNew': true });
    } else {
      this.myRequestFormGroup.get('checkOut').setErrors(null);
    }
  }

  dateValid(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();

    return selectedDate > today ? { dateGreaterThanToday: true } : null;
  }

  calculateTotalHours() {
    const checkInValue = this.myRequestFormGroup.get('checkIn').value;
    const checkOutValue = this.myRequestFormGroup.get('checkOut').value;
    const splitValueIn = checkInValue.split(':');
    const splitValueOut = checkOutValue.split(':');


    // console.log(Number(splitValueIn[0]) && Number(splitValueOut[0]), Number(splitValueOut[0]) ,'kkkkk', Number(splitValueIn[0]))
    if (checkInValue && checkOutValue) {
      console.log(this.myRequestFormGroup.get('attendanceDate').value, Number(splitValueIn[0]), Number(splitValueOut[0]))
      if (Number(splitValueIn[0]) < Number(splitValueOut[0])) {
        const checkInTime = new Date(this.myRequestFormGroup.get('attendanceDate').value + 'T' + checkInValue + 'Z');
        const checkOutTime = new Date(this.myRequestFormGroup.get('attendanceDate').value + 'T' + checkOutValue + 'Z');
        console.log(checkInTime, checkInTime)
        // Calculate time difference in milliseconds
        let timeDifference = checkOutTime.getTime() - checkInTime.getTime();

        // Convert time difference to hours
        let totalHours = Math.abs(timeDifference / 36e5);

        // Round to 2 decimal places
        totalHours = Math.round(totalHours * 100) / 100;

        // Update totalHours form control value
        this.myRequestFormGroup.get('totalHours').setValue(totalHours);
        this.myRequestFormGroup.get('checkOut').setErrors(null);

      }
      else {
        this.myRequestFormGroup.get('checkOut').setErrors({ 'oldGreaterThanNew': true });
        this.myRequestFormGroup.controls.totalHours.reset()
      }
    }

  }


  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.myRequestFormGroup.value);
      if (this.myRequestFormGroup.invalid)
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

      this.myRequestFormGroup.value.createdOn = fullDate
      this.myRequestFormGroup.value.createdBy = username
      this.myRequestFormGroup.value.changedOn = fullDate
      this.myRequestFormGroup.value.changedBy = username

      const result: any = await this.myRequestSer.createmyRequest(this.myRequestFormGroup.value)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/regularization/my-request-list/'])
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

  async getAllReasonDetail() {
    try {
      const result: any = await this.reasonSer.getAllreasonDetails()
      if (result.status === '1') {
        this.reasonDetail = result.data
      }
    } catch (error: any) {

      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()
      if (result) {
        this.employeeDetail = result.data;
        const userName = localStorage.getItem('userName')
        const findDetails = this.employeeDetail.find((el: any) => el.employeeId === userName)
        this.myRequestFormGroup.controls.employeeId.setValue(findDetails.employeeId)
        this.myRequestFormGroup.controls.employeeName.setValue(findDetails.firstName + " " + findDetails.lastName)
        this.myRequestFormGroup.controls.reportingManager.setValue(findDetails.reportingManager)
        console.log(findDetails, 'finddetails');

      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  typeaheadOnSelect(event: any) {
    console.log('Selected value: ', event.value);
    this.selectedEmployeeId = event.value;
    const salesList = this.employeeDetail.find((el: any) => el.employeeId === event.value);
    console.log(salesList.firstName);

    this.myRequestFormGroup.controls.employeeName.setValue(salesList.firstName)

    // this.createDeliveryFormFields(salesList)
  }



  changeDateFromate(date: any, type?: any) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = currentDate.getDate();
    
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time
    const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fullDate;
  }
}
