import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralSettingService } from '../../../services/general/general-setting.service';

@Component({
  selector: 'app-add-general-setting',
  templateUrl: './add-general-setting.component.html',
  styleUrls: ['./add-general-setting.component.css']
})
export class AddGeneralSettingComponent {

  generalSettingFormFroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private generalSettingSer: GeneralSettingService

  ) { }

  ngOnInit(): void {
    this.createFormField()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormField() {
    this.generalSettingFormFroup = this.fb.group({
      effectiveForm: ['', Validators.required],
      defaultShiftTime: [''],
      scaleView: [''],
      totalHours: [''],
      minHours: [''],
      manualInput: [''],
      fullDay: [''],
      halfDay: [''],
      showOvertime: [''],
      weekend: [''],
      holiday: [''],
      leave: [''],
      carryOverbalance: [''],
      enableTracking: [''],
      webcheck: [''],
      mobileCheck: [''],
      makeLocation: [''],
      showAllEntriesEnable: [''],
      viewTheirEntries: [''],
      editTheirEntries: [''],
      notifyme: [''],
      emailNotify: [''],
      editEntries: [''],
      checkInRemainderBefore: [''],
      checkInRemainderAfter: [''],
      checkInEndBefore: [''],
      checkInEndAfter: [''],
      notificationReportingManager: [''],
      passwordProtection: [''],
      regularizationForFuture: [''],
      reasonForRegularization: [''],
      forgotOut: [''],
      forgotIn: [''],
      forgotId: [''],
      systemError: [''],
      createNewCkeck: [''],
      replaceExistingCheck: [''],

    });
  }

  async submitData() {

    try {
      console.log(this.generalSettingFormFroup.value);
      
      this.isSubmitted = true
      if (this.generalSettingFormFroup.invalid)
        return
      const result: any = await this.generalSettingSer.creategeneralSetting(this.generalSettingFormFroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/general-setting-list/'])
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

  changeRadioButton(data: any) {
    this.generalSettingFormFroup.controls.enableScaleView.setValue(data);
    // this.generalSettingFormFroup.controls.disableScaleView.setValue(data);
  }
  changeRadioButton1(data: any) {
    // this.generalSettingFormFroup.controls.enableScaleView.setValue(data);
    this.generalSettingFormFroup.controls.disableScaleView.setValue(data);
  }
  changeRadioButton2(data: any) {
    // this.generalSettingFormFroup.controls.enableScaleView.setValue(data);
    this.generalSettingFormFroup.controls.firstCheckIn.setValue(data);
  }
  changeRadioButton3(data: any) {
    // this.generalSettingFormFroup.controls.enableScaleView.setValue(data);
    this.generalSettingFormFroup.controls.everyValidCheck.setValue(data);
  }
}
