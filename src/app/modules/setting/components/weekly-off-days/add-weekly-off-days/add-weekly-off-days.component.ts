import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { WeeklyOffDaysService } from '../../../services/weekly-off-days/weekly-off-days.service';

@Component({
  selector: 'app-add-weekly-off-days',
  templateUrl: './add-weekly-off-days.component.html',
  styleUrls: ['./add-weekly-off-days.component.css']
})
export class AddWeeklyOffDaysComponent {

  WeeklyOffFormData: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  weeklyOffId: any = ''
  weekOffDetail: any = []
  isEdit: any = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private weekOffSer: WeeklyOffDaysService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.weeklyOffId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormGroupdata()
    // this.singleWeeklyOffDetail()
    this.getAllWeeklyOffDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  async singleWeeklyOffDetail() {
    try {
      const result: any = await this.weekOffSer.singleweeklyOffDaysDetails(this.weeklyOffId)
      if (result.status === '1') {
        this.WeeklyOffFormData.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  createFormGroupdata() {
    this.WeeklyOffFormData = this.fb.group({
      sunday: [''],
      monday: [''],
      tuesday: [''],
      wednesday: [''],
      thursday: [''],
      friday: [''],
      saturday: [''],


    });

  }



  async submitData() {
    console.log(this.WeeklyOffFormData.value);
    try {
      this.isSubmitted = true
      if (this.WeeklyOffFormData.invalid)
        return
      let result: any;
      if (this.weekOffDetail.length != 0) {
        result = await this.weekOffSer.updateweeklyOffDays(this.WeeklyOffFormData.value)
      }
      else { }
      result = await this.weekOffSer.creaeweeklyOffDays(this.WeeklyOffFormData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
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

  async getAllWeeklyOffDetail() {
    try {
      const result: any = await this.weekOffSer.getAllweeklyOffDaysDetails()
      console.log(result);

      if (result) {
        this.weekOffDetail = result.data
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
