import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HolidayService } from '../../../services/holiday/holiday.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';
import { EventTypeService } from '../../../services/event-type/event-type.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.css']
})
export class AddHolidayComponent {


  holidayFormData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  years: number[] = [];
  eventTypeDetail: any = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private holidaySer: HolidayService,
    public dialogRef: MatDialogRef<AddHolidayComponent>,
    private companyCalenderSer: CompanyCalenderService,
    private eventTypeSe: EventTypeService
  ) { }

  ngOnInit(): void {
    this.data()
    this.generateYears()
    this.getAllEventTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const futureYearsCount = 15; // Change this to the number of future years you want
    for (let i = 0; i <= futureYearsCount; i++) {
      this.years.push(currentYear + i);
    }
  }

  data() {
    this.holidayFormData = this.fb.group({
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


  // calculateNoOfDays(index: number) {
  //   const holidayGroup:any = this.holidayDetail.at(index) as FormGroup;
  //   const startDate = holidayGroup.get('startDate').value;
  //   const endDate = holidayGroup.get('endDate').value;

  //   if (startDate && endDate) {
  //     const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     holidayGroup.get('noofDays').setValue(diffDays + 1);
  //   }
  // }


  async submitData() {
    console.log(this.holidayFormData.value);

    try {
      this.isSubmitted = true
      if (this.holidayFormData.invalid)
        return
      const result: any = await this.companyCalenderSer.createCompanyCalenderDetail(this.holidayFormData.value)
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


  calculateTotalHours() {
    const startTimeValue = this.holidayFormData.get('startTime').value;
    const endTimeValue = this.holidayFormData.get('endTime').value;
    const splitValueIn = startTimeValue.split(':');
    const splitValueOut = endTimeValue.split(':');


    // console.log(Number(splitValueIn[0]) && Number(splitValueOut[0]), Number(splitValueOut[0]) ,'kkkkk', Number(splitValueIn[0]))
    if (startTimeValue && endTimeValue) {
      if (Number(splitValueIn[0]) < Number(splitValueOut[0])) {
        this.holidayFormData.get('endTime').setErrors(null);

      } else {
        this.holidayFormData.get('endTime').setErrors({ 'oldGreaterThanNew': true });
      }
      // Update totalHours form control value

    }
    else {
      this.holidayFormData.get('endTime').setErrors({ 'oldGreaterThanNew': true });
    }
  }


  checkDateValue(event: any) {
    if (event.target.value) {
      if (event.target.value < this.holidayFormData.value.startDate) {
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
