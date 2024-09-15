import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TaxSlabService } from '../../../services/tax-slab/tax-slab.service';

@Component({
  selector: 'app-edit-tax-slab',
  templateUrl: './edit-tax-slab.component.html',
  styleUrls: ['./edit-tax-slab.component.css']
})
export class EditTaxSlabComponent {
  taxSlabFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;
  regimeId:any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tasSlabSer: TaxSlabService,
    private activateRouter: ActivatedRoute
  ) {
    this.regimeId = this.activateRouter.snapshot.paramMap.get('id');
    this.getSingleTaxSlabs()
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

  createFormdata(data?:any) {
    if(data){
      this.taxSlabFormGroup = this.fb.group({
        _id:[''],
        tax_type: ['', Validators.required],
        slabs: this.fb.array(data.slabs.map((el:any) => this.createEmployeeGroup()))
      });
      this.taxSlabFormGroup.patchValue(data)
      return
    }
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
      const result: any = await this.tasSlabSer.updateTaxSlabDetail(this.taxSlabFormGroup.value)
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


  async getSingleTaxSlabs() {
    try {
      const result: any = await this.tasSlabSer.singleTaxSlabDetail(this.regimeId)
      console.log(result);

      if (result.status === true) {
        this.createFormdata(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
