import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxesService } from '../../../services/taxes/taxes.service';
import { SalaryService } from '../../../services/salary/salary.service';

@Component({
  selector: 'app-edit-taxes',
  templateUrl: './edit-taxes.component.html',
  styleUrls: ['./edit-taxes.component.css']
})
export class EditTaxesComponent {

  taxesFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  perviousValue: any = '';
  employeeDetail: any = []
  taxesId: any = ''
  salaryDetail: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxesSer: TaxesService,
    private activateRouter: ActivatedRoute,
    private salarySer: SalaryService



  ) { }

  ngOnInit(): void {
    this.taxesId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.singleTaxesDetails()
    this.getAllSalaryDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.taxesFormGroup = this.fb.group({
      _id: ['', Validators.required],
      pan: ['', [Validators.required]],
      tan: [''],
      taxPaymentFrequency: [''],
      tdsCircle: [''],
      deductorType: [''],
      deductorName: [''],
      deductorFatherName: [''],
    });
  }

  async singleTaxesDetails() {
    try {
      const result: any = await this.taxesSer.singletaxesDetail(this.taxesId)
      if (result.status === '1') {
        this.taxesFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxesFormGroup.invalid)
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

      this.taxesFormGroup.value.createdOn = fullDate
      this.taxesFormGroup.value.createdBy = username
      this.taxesFormGroup.value.changedOn = fullDate
      this.taxesFormGroup.value.changedBy = username

      const result: any = await this.taxesSer.updatetaxesDetail(this.taxesFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/taxes-list/'])
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

  async getAllSalaryDetail() {
    try {
      const result: any = await this.salarySer.getAllSalaryDetail()
      console.log(result);

      if (result.status === '1') {
        this.salaryDetail = result.data
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
