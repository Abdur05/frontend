import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxDeclarationService } from '../../../services/tax-declaration/tax-declaration.service';
import { TaxSlabService } from '../../../services/tax-slab/tax-slab.service';

@Component({
  selector: 'app-add-tax-declaration',
  templateUrl: './add-tax-declaration.component.html',
  styleUrls: ['./add-tax-declaration.component.css']
})
export class AddTaxDeclarationComponent {

  taxDeclarationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  taxSlabDetail: any = []
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxDecSer: TaxDeclarationService,
    private taxSlabSer: TaxSlabService
  ) {
    this.getAlltaxSlabDetail()
  }

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
    this.taxDeclarationFormGroup = this.fb.group({
      regimeId: ['', [Validators.required]],
      componentList: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      component_code: ['', Validators.required],
      component_name: ['', Validators.required],
      maximum_limit: ['', Validators.required]
    })
  }

  get taxDeclarationDetail() {
    return this.taxDeclarationFormGroup.get('componentList') as FormArray
  }

  addDetail() {
    this.taxDeclarationDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.taxDeclarationDetail.removeAt(index)
  }
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxDeclarationFormGroup.invalid)
        return
      this.taxDeclarationFormGroup.value.componentList.map((el: any) => {
        el.regimeId = this.taxDeclarationFormGroup.value.regimeId
      })
      const result: any = await this.taxDecSer.createTaxDeclarationDetail(this.taxDeclarationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/tax-declaration-list/'])
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
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, '', {
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

  async getAlltaxSlabDetail() {
    try {
      const result: any = await this.taxSlabSer.getAllTaxSlabDetail()
      if (result.status === true) {
        this.taxSlabDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

}
