import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxDeclarationService } from '../../../services/tax-declaration/tax-declaration.service';
import { TaxSlabService } from '../../../services/tax-slab/tax-slab.service';

@Component({
  selector: 'app-edit-tax-declaration',
  templateUrl: './edit-tax-declaration.component.html',
  styleUrls: ['./edit-tax-declaration.component.css']
})
export class EditTaxDeclarationComponent {

  taxDeclarationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  taxId: any = ''
  isShowScreenMenu: any = true;
  taxSlabDetail: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxDecSer: TaxDeclarationService,
    private activateRouter: ActivatedRoute,
    private taxSlabSer: TaxSlabService
  ) {
    this.getAlltaxSlabDetail()

  }

  ngOnInit(): void {
    this.taxId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getTaxDeclarationDetails()
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
      _id: ['', Validators.required],
      component_code: ['', Validators.required],
      component_name: ['', Validators.required],
      maximum_limit: ['', Validators.required]
    });
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxDeclarationFormGroup.invalid)
        return
      const result: any = await this.taxDecSer.updatetaxdeclarationDetail(this.taxDeclarationFormGroup.value)
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

  async getTaxDeclarationDetails() {
    try {
      const result: any = await this.taxDecSer.singletaxdeclarationDetail(this.taxId)
      console.log(result);

      if (result.status === true) {
        this.taxDeclarationFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
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
