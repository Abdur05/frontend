import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';
import { EventTypeService } from '../../../services/event-type/event-type.service';

@Component({
  selector: 'app-add-company-calendar',
  templateUrl: './add-company-calendar.component.html',
  styleUrls: ['./add-company-calendar.component.css']
})
export class AddCompanyCalendarComponent {

  companyCalenderFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  eventTypeDetail: any = []
  today: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private companyCalenderSer: CompanyCalenderService,
    private eventTypeSer: EventTypeService

  ) {
    const todayDate = new Date();
    // Add one day to the current date
    todayDate.setDate(todayDate.getDate() + 1);
    this.today = todayDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.createFormdata()
    this.getAllEventTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata() {
    this.companyCalenderFormGroup = this.fb.group({
      year: ['', [Validators.required]],
      date: ['', Validators.required],
      eventTypeId: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventDescription: [''],
    });
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.companyCalenderFormGroup.invalid)
        return
      const result: any = await this.companyCalenderSer.createCompanyCalenderDetail(this.companyCalenderFormGroup.value)
      if (result) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/company-calender-list/'])
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
  async getAllEventTypeDetail() {
    try {
      const result: any = await this.eventTypeSer.getAllEventTypeDetail()
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
