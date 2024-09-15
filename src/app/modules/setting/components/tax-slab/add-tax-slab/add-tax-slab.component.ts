import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxSlabService } from '../../../services/tax-slab/tax-slab.service';

@Component({
  selector: 'app-add-tax-slab',
  templateUrl: './add-tax-slab.component.html',
  styleUrls: ['./add-tax-slab.component.css']
})
export class AddTaxSlabComponent {
  taxSlabFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tasSlabSer: TaxSlabService
  ) { }

  ngOnInit(): void {
    this.createFormdata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata() {
    this.taxSlabFormGroup = this.fb.group({
      tax_type: ['', Validators.required],
      slabs: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      percentage: ['', Validators.required],
      amount: ['']
    })
  }

  get employeeTypeDetail() {
    return this.taxSlabFormGroup.get('slabs') as FormArray
  }

  addDetail() {
    this.employeeTypeDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.employeeTypeDetail.removeAt(index)
  }
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxSlabFormGroup.invalid)
        return
      const result: any = await this.tasSlabSer.createTaxSlabDetail(this.taxSlabFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/tax-slab-list/'])
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

}
