import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxSettingService } from '../../../services/tax-setting/tax-setting.service';

@Component({
  selector: 'app-edit-tax-setting',
  templateUrl: './edit-tax-setting.component.html',
  styleUrls: ['./edit-tax-setting.component.css']
})
export class EditTaxSettingComponent {
  taxSettingFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  fiscalYearValue: string | undefined;
  taxSettingId:any='';
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxSettingSer: TaxSettingService,
private activatedRouter:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.taxSettingId=this.activatedRouter.snapshot.paramMap.get('id')
    this.data()
    this.getTaxSettingDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  data() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    let fiscalYearStart, fiscalYearEnd;

    if (currentMonth >= 3) { // From April (month 3) onwards
      fiscalYearStart = currentYear;
      fiscalYearEnd = currentYear + 1;
    } else { // From January to March
      fiscalYearStart = currentYear - 1;
      fiscalYearEnd = currentYear;
    }

    const fiscalYear = `April ${fiscalYearStart} - March ${fiscalYearEnd}`;

    this.taxSettingFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      fiscal_year: [fiscalYear, [Validators.required]],
      decleration: this.fb.group({
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
      }),
      submission: this.fb.group({
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
      }),
      actual_proof_consideration: this.fb.group({
        start_date: ['', [Validators.required]],
        end_date: ['', [Validators.required]],
      }),
    });
  }

  updateEndDateLimits(groupName: string) {
    const startDateControl = this.taxSettingFormGroup.get(`${groupName}.start_date`);
    const endDateControl = this.taxSettingFormGroup.get(`${groupName}.end_date`);
    
    if (startDateControl && endDateControl) {
      const startDate = startDateControl.value;
      endDateControl.setValue('');
      endDateControl.markAsUntouched();
    }
  }

  getMinDate(groupName: string): string {
    const startDate = this.taxSettingFormGroup.get(`${groupName}.start_date`)?.value;
    return startDate ? startDate : '';
  }

  validateDates(groupName: string) {
    const startDateControl = this.taxSettingFormGroup.get(`${groupName}.start_date`);
    const endDateControl = this.taxSettingFormGroup.get(`${groupName}.end_date`);

    if (startDateControl && endDateControl) {
      const startDate = new Date(startDateControl.value);
      const endDate = new Date(endDateControl.value);

      if (endDate < startDate) {
        endDateControl.setErrors({ dateOutOfRange: 'End date cannot be earlier than start date' });
      } else {
        endDateControl.setErrors(null);
      }
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxSettingFormGroup.invalid)
        return
      // this.taxSettingFormGroup.controls.fiscal_year.setValue(formatDate(date,'yyyy-MM-dd','en'));

      console.log(this.taxSettingFormGroup.value);

      const result: any = await this.taxSettingSer.updateTaxSettingDetail(this.taxSettingFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/tax-setting-list/'])
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
  async getTaxSettingDetails() {
    try {
      const result: any = await this.taxSettingSer.singleTaxSettingDetail(this.taxSettingId)
      console.log(result);

      if (result.status === true) {
        this.taxSettingFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

}
