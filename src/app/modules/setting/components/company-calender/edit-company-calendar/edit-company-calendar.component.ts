import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';
import { EventTypeService } from '../../../services/event-type/event-type.service';

@Component({
  selector: 'app-edit-company-calendar',
  templateUrl: './edit-company-calendar.component.html',
  styleUrls: ['./edit-company-calendar.component.css']
})
export class EditCompanyCalendarComponent {

  companyCalenderFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  eventTypeDetail: any = []
  today: string = '';
  companyCalenderId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private companyCalenderSer: CompanyCalenderService,
    private eventTypeSer: EventTypeService,
    private activateRouter: ActivatedRoute
  ) {
    const todayDate = new Date();
    // Add one day to the current date
    todayDate.setDate(todayDate.getDate() + 1);
    this.today = todayDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.companyCalenderId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getAllEventTypeDetail()
    this.getCompanyCalenderDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata() {
    this.companyCalenderFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      year: ['', [Validators.required]],
      date: ['', Validators.required],
      eventTypeId: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventDescription: [''],
    });
  }

  async getCompanyCalenderDetail() {
    try {
      // const result: any = await this.companyCalenderSer.singleCompanyCalenderDetail(this.companyCalenderId)
      // if (result) {
      //   this.companyCalenderFormGroup.patchValue(result.data)
      // }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.companyCalenderFormGroup.invalid)
        return
      const result: any = await this.companyCalenderSer.updateCompanyCalenderDetail(this.companyCalenderFormGroup.value, '')
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
