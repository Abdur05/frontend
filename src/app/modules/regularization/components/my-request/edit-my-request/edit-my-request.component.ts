import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { ReasonService } from 'src/app/modules/setting/services/reason/reason.service';
import { MyRequestService } from '../../../services/my-request/my-request.service';

@Component({
  selector: 'app-edit-my-request',
  templateUrl: './edit-my-request.component.html',
  styleUrls: ['./edit-my-request.component.css']
})
export class EditMyRequestComponent {


  myRequestFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  reasonDetail: any = []
  selectedEmployeeId: '' | undefined
  employeeDetail: any = []
  myRequestId: any = ''
  isShowScreenMenu: any = true;
  maxDate: any = ''
  minDate: any = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reasonSer: ReasonService,
    private profileSer: MyProfileService,
    private myRequestSer: MyRequestService,
    private activateRouter: ActivatedRoute
  ) {
    this.maxDate = this.changeDateFromate(new Date())
    this.minDate = this.findCurrentMonth(this.maxDate)

  }

  ngOnInit(): void {
    this.myRequestId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllReasonDetail()
    this.getAllEmployeeDetail()
    this.singleMyRequestDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  data() {
    this.myRequestFormGroup = this.fb.group({
      _id: ['', Validators.required],
      employeeId: ['', Validators.required],
      attendanceDate: ['', [Validators.required, this.dateValid.bind(this)]],
      totalHours: [''],
      reason: ['', Validators.required],
      description: [''],
      checkOut: ['', Validators.required],
      checkIn: ['', Validators.required]
    });
  }

  dateValid(control: any) {
    const selectedDate = new Date(control.value);
    const today = new Date();

    return selectedDate > today ? { dateGreaterThanToday: true } : null;
  }

  calculateTotalHours() {
    const checkInValue = this.myRequestFormGroup.get('checkIn').value;
    const checkOutValue = this.myRequestFormGroup.get('checkOut').value;

    if (checkInValue && checkOutValue) {
      const checkInTime = new Date('1970-01-01T' + checkInValue + 'Z');
      const checkOutTime = new Date('1970-01-01T' + checkOutValue + 'Z');

      // Calculate time difference in milliseconds
      let timeDifference = checkOutTime.getTime() - checkInTime.getTime();

      // Convert time difference to hours
      let totalHours = Math.abs(timeDifference / 36e5);

      // Round to 2 decimal places
      totalHours = Math.round(totalHours * 100) / 100;

      // Update totalHours form control value
      this.myRequestFormGroup.get('totalHours').setValue(totalHours);
    }
  }


  async singleMyRequestDetails() {
    try {
      const result: any = await this.myRequestSer.singlemyRequestDetails(this.myRequestId)
      if (result.status === true) {
        this.myRequestFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
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

      const result: any = await this.myRequestSer.updatemyRequest(this.myRequestFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/regularization/my-request-list/'])
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
        this.employeeDetail = result.data
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
    // this.createDeliveryFormFields(salesList)
  }


  changeDateFromate(date: any, type?: any) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = currentDate.getDate();
    if (type === 'to') {
      day = currentDate.getDate() + 1;
    }
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time
    const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fullDate;
  }

  findCurrentMonth(date: any) {
    const today = new Date();

    // Get the current year and month, set day to 1 (first day of the month)
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-indexed
    const day = 1;

    // Format the month and day with leading zeros if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    return `${year}-${formattedMonth}-${formattedDay}`
    console.log(`${year}-${formattedMonth}-${formattedDay}`);
  }


}
