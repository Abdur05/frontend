import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { ReasonService } from 'src/app/modules/setting/services/reason/reason.service';
import { MyRequestService } from '../../../services/my-request/my-request.service';
import { MyApprovalService } from '../../../services/my-approval/my-approval.service';

@Component({
  selector: 'app-edit-my-approval',
  templateUrl: './edit-my-approval.component.html',
  styleUrls: ['./edit-my-approval.component.css']
})
export class EditMyApprovalComponent {

  myRequestFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  reasonDetail: any = []
  selectedEmployeeId: '' | undefined
  employeeDetail: any = []
  myRequestId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reasonSer: ReasonService,
    private profileSer: MyProfileService,
    private myRequestSer: MyRequestService,
    private myApprovalSer: MyApprovalService,
    private activateRouter: ActivatedRoute

  ) { }

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
      employeeName: [''],
      attendanceDate: ['', Validators.required],
      reason: ['', Validators.required],
      description: [''],
      checkIn: ['', Validators.required],
      checkInNew: [''],
      checkOut: ['', Validators.required],
      checkOutNew: [''],
      totalHours: [''],
      hoursNew: [''],
      statusOld: [''],
      statusNew: [''],
      approvalStatus: [''],
      createdBy: [''],
      createdOn: ['']
    });
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

  calculateTotalHoursNew() {
    const checkInValue = this.myRequestFormGroup.get('checkInNew').value;
    const checkOutValue = this.myRequestFormGroup.get('checkOutNew').value;

    if (checkInValue && checkOutValue) {
      const checkInTime = new Date('1970-01-01T' + checkInValue + 'Z');
      const checkOutTime = new Date('1970-01-01T' + checkOutValue + 'Z');

      // Calculate time difference in milliseconds
      let timeDifference = checkOutTime.getTime() - checkInTime.getTime();

      // Convert time difference to hours
      let hoursNew = Math.abs(timeDifference / 36e5);

      // Round to 2 decimal places
      hoursNew = Math.round(hoursNew * 100) / 100;

      // Update hoursNew form control value
      this.myRequestFormGroup.get('hoursNew').setValue(hoursNew);
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




  async submitData(status?: any) {
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

      this.myRequestFormGroup.value.changedOn = fullDate
      this.myRequestFormGroup.value.changedBy = username
      this.myRequestFormGroup.value.approvalStatus = status;
      const result: any = await this.myRequestSer.updatemyRequest(this.myRequestFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/regularization/my-approval-list/'])
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
    console.log(salesList.firstName, 'sales');
    this.myRequestFormGroup.controls.employeeName.setValue(salesList.firstName)
    // this.createDeliveryFormFields(salesList)
  }
}
