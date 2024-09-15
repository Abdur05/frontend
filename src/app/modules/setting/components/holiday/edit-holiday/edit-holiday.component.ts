import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HolidayService } from '../../../services/holiday/holiday.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventTypeService } from '../../../services/event-type/event-type.service';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';

@Component({
  selector: 'app-edit-holiday',
  templateUrl: './edit-holiday.component.html',
  styleUrls: ['./edit-holiday.component.css']
})
export class EditHolidayComponent {


  holidayFormData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  eventId: any = ''
  years: number[] = [];
  eventTypeDetail: any = []
  eventList: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private holidaySer: HolidayService,
    public dialogRef: MatDialogRef<EditHolidayComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,
    private eventTypeSe: EventTypeService,
    private companyCalenderSer: CompanyCalenderService
  ) {
    console.log(data1, 'jhhhh')
    this.eventId = data1
  }

  ngOnInit(): void {
    this.data()
    this.singleEventDetails()
    this.generateYears()
    this.getAllEventTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.holidayFormData = this.fb.group({
      _id: [''],
      // year: ['', [Validators.required]],
      eventTitle: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventTypeId: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: [''],
      endTime: ['']

    });
  }
  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const futureYearsCount = 15; // Change this to the number of future years you want
    for (let i = 0; i <= futureYearsCount; i++) {
      this.years.push(currentYear + i);
    }
  }


  async submitData() {
    console.log(this.holidayFormData.value);

    try {
      this.isSubmitted = true;
      console.log(this.holidayFormData, 'kkk')
      if (this.holidayFormData.invalid)
        return
      this.holidayFormData.value._id = this.eventId[0]
      console.log("this.holidayFormData.value----", this.holidayFormData.value);
      const result: any = await this.companyCalenderSer.updateCompanyCalenderDetail(this.holidayFormData.value, this.eventId[1])
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        // this.router.navigate(['/setting/holiday-list/'])
        this.dialogRef.close(true)
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


  // Get Single details for Exchange Rate 
  async singleEventDetails() {
    try {
      console.log(this.eventId, 'iddddddddd');

      const result: any = await this.companyCalenderSer.singleCompanyCalenderDetail(this.eventId);
      console.log(result, 'ooooo');

      const additionalId = result.eventList;
      console.log(additionalId, 'ppppppppppppp');

      if (result.status) {
        // console.log(result.data.eventList[0]._id)
        // this.eventList = result.data.eventList[0]
        console.log("result.data[0]-----", result.data[0]);
        this.holidayFormData.patchValue(result.data[0])

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      console.log(error);

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  calculateTotalHours() {
    const startTimeValue = this.holidayFormData.get('startTime').value;
    const endTimeValue = this.holidayFormData.get('endTime').value;
    const splitValueIn = startTimeValue.split(':');
    const splitValueOut = endTimeValue.split(':');


    // console.log(Number(splitValueIn[0]) && Number(splitValueOut[0]), Number(splitValueOut[0]) ,'kkkkk', Number(splitValueIn[0]))
    if (startTimeValue && endTimeValue) {
      // Update totalHours form control value
      this.holidayFormData.get('startTime').setErrors(null);

    }
    else {
      this.holidayFormData.get('endTime').setErrors({ 'oldGreaterThanNew': true });
      this.holidayFormData.controls.totalHours.reset()
    }
  }


  checkDateValue(event: any) {
    if (event.target.value) {
      if (event.target.value < this.holidayFormData.value.validFrom) {
        this.holidayFormData.get('endDate').setErrors({ customError: true })
      }
    } else {
      this.holidayFormData.get('endDate').setErrors(null)
    }
  }


  handleEventType(event: any) {
    if (event.target.value) {
      if (event.target.value === 'E') {
        this.holidayFormData.get('startTime').setValidators(Validators.required);
        this.holidayFormData.get('startTime').updateValueAndValidity();
        this.holidayFormData.get('endTime').setValidators(Validators.required);
        this.holidayFormData.get('endTime').updateValueAndValidity()
      } else {
        this.holidayFormData.get('startTime').clearValidators()
        this.holidayFormData.get('startTime').updateValueAndValidity();
        this.holidayFormData.get('endTime').clearValidators()
        this.holidayFormData.get('endTime').updateValueAndValidity();
      }
    }
  }

  async getAllEventTypeDetail() {
    try {
      const result: any = await this.eventTypeSe.getAllEventTypeDetail()
      if (result) {
        this.eventTypeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
