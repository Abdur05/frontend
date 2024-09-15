import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxSettingService } from '../../../services/tax-setting/tax-setting.service';

@Component({
  selector: 'app-add-tax-setting',
  templateUrl: './add-tax-setting.component.html',
  styleUrls: ['./add-tax-setting.component.css']
})
export class AddTaxSettingComponent {


  taxSettingFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  // fiscalYearValue: string | undefined;
  // fiscalYearError: string | null = null;
  // taxdeclerationError: string | null = null;
  errors: { [key: string]: string | null } = {
    fiscalYearError: null,
    taxdeclerationError: null,
    taxSubmissionError: null,
    proofSubmissionError: null
  };
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxSettingSer: TaxSettingService

  ) { }

  ngOnInit(): void {
    this.data()
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
      this.isSubmitted = true;
      if (this.taxSettingFormGroup.invalid) return;

      console.log(this.taxSettingFormGroup.value);

      const result: any = await this.taxSettingSer.createTaxSettingDetail(this.taxSettingFormGroup.value);
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/tax-setting-list/']);
        return;
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
        return;
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  validateFiscalYear(control: AbstractControl) {
    const fiscalYear = control.value;
    const regex = /^([a-zA-Z]+ \d{4}) - ([a-zA-Z]+ \d{4})$/;
    const match = regex.exec(fiscalYear);

    if (!match) {
      return { invalidFiscalYear: 'Invalid format. Use "Month YYYY - Month YYYY".' };
    }

    const startYear = new Date(`1 ${match[1]}`).getFullYear();
    const endYear = new Date(`1 ${match[2]}`).getFullYear();

    if (endYear !== startYear + 1) {
      return { invalidFiscalYear: 'The fiscal year must span exactly one year.' };
    }

    return null;
  }

  private getFiscalYearRange(fiscalYear: string): { startFiscal: Date; endFiscal: Date } {
    const [startFiscalStr, endFiscalStr] = fiscalYear.split(' - ').map(date => `1 ${date}`);
    const startFiscal = new Date(startFiscalStr);
    const endFiscal = new Date(endFiscalStr);
    endFiscal.setFullYear(endFiscal.getFullYear() + 1); // Set end fiscal year correctly

    return { startFiscal, endFiscal };
  }

  private checkDateInRange(controlPath: string, startFiscal: Date, endFiscal: Date) {
    const control = this.taxSettingFormGroup.get(controlPath);
    if (!control || !control.value) return;

    const date = new Date(control.value);
    if (date < startFiscal || date >= endFiscal) {
      control.setErrors({ dateOutOfRange: `Date must be within ${startFiscal.toDateString()} and ${endFiscal.toDateString()}` });
    } else {
      control.setErrors(null);
    }
  }
}
