import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LeaveTypeService } from '../../../services/leaveType/leave-type.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.css']
})
export class AddLeaveTypeComponent {


  locationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  maxlimitValue: any = 0;
  isShowScreenMenu:any = true

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private leaveTypeSer: LeaveTypeService

  ) { }

  ngOnInit(): void {
    this.data()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  toggleCheckbox(event: MouseEvent) {
    const checkbox = event.target as HTMLInputElement;
    console.log(checkbox);

    if (checkbox.checked) {
      const currentValue = this.locationFormGroup.get('documentUpload').value;
      const newValue = currentValue === 'Y' ? '' : 'Y';
      this.locationFormGroup.get('documentUpload').setValue('Y');
    } else {
      this.locationFormGroup.get('documentUpload').setValue('');
    }
  }

  handleCheck(event: any) {
    // console.log(event);

    // if (event.target.checked) {
    //   this.locationFormGroup.controls.documentUpload.setValue('Y')
    // } else {
    //   // event.target.value = false
    //   this.locationFormGroup.controls.documentUpload.setValue('N')
    //   event.target.checked = false;
    // }
    const isChecked = event.target.checked;
    const maxLimitControl = this.locationFormGroup.get('minNoOfDays');
    if (isChecked) {
      maxLimitControl.enable();
      this.locationFormGroup.controls.documentUpload.setValue('Y')
    } else {
      maxLimitControl.disable();
      // this.locationFormGroup.controls.documentUpload.setValue('N')
      event.target.checked = false;
    }
  }



  data() {
    this.locationFormGroup = this.fb.group({
      leaveType: ['', [Validators.required]],
      description: [''],
      type: [''],
      accrual: [''],
      noOfDays: [''],
      carryForwardAllowed: [],
      maxLimit: ['', [Validators.minLength(2), Validators.maxLength(2)]],
      echasmentAllowed: [],
      maxLimit1: ['', [Validators.minLength(2), Validators.maxLength(2)]],
      documentUpload: [''],
      applicableTo: ['Both'],
      minNoOfDays: ['']
    });


  }

  onCheckboxChange(event: any) {
    const isChecked = event.target.checked;
    const maxLimitControl = this.locationFormGroup.get('maxLimit');
    if (isChecked) {
      maxLimitControl.enable();
    } else {
      maxLimitControl.disable();
    }
  }
  onCheckboxChange1(event: any) {
    const isChecked = event.target.checked;
    const maxLimitControl = this.locationFormGroup.get('maxLimit1');
    if (isChecked) {
      maxLimitControl.enable();
    } else {
      maxLimitControl.disable();
    }
  }

  async submitData() {
    try {
      console.log(this.locationFormGroup.value);

      this.isSubmitted = true
      if (this.locationFormGroup.invalid)
        return
      const result: any = await this.leaveTypeSer.createleaveType(this.locationFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/leave-type-list/'])
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

  handleAccrual() {
    this.handleMaxlimit(this.locationFormGroup.value.maxLimit)
    this.handleMaxlimitEncashment(this.locationFormGroup.value.maxLimit1)
  }

  handleMaxlimit(event: any) {
    if (event) {
      console.log(event, this.locationFormGroup.value.noOfDays)
      if (this.locationFormGroup.value.accrual === 'Yearly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays
        if (Number(event) > this.locationFormGroup.value.noOfDays) {
          this.locationFormGroup.get('maxLimit').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Half-Yearly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 2
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 2)) {
          this.locationFormGroup.get('maxLimit').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Quaterly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 4
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 4)) {
          this.locationFormGroup.get('maxLimit').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Monthly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 12
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 12)) {
          this.locationFormGroup.get('maxLimit').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit').setErrors(null)
        }
      }
    }
  }

  handleMaxlimitEncashment(event: any) {
    if (event) {
      console.log(event, this.locationFormGroup.value.noOfDays)
      if (this.locationFormGroup.value.accrual === 'Yearly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays
        if (Number(event) > this.locationFormGroup.value.noOfDays) {
          this.locationFormGroup.get('maxLimit1').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit1').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Half-Yearly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 2
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 2)) {
          this.locationFormGroup.get('maxLimit1').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit1').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Quaterly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 4
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 4)) {
          this.locationFormGroup.get('maxLimit1').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit1').setErrors(null)
        }
      }
      if (this.locationFormGroup.value.accrual === 'Monthly') {
        this.maxlimitValue = this.locationFormGroup.value.noOfDays * 12
        if (Number(event) > (this.locationFormGroup.value.noOfDays * 12)) {
          this.locationFormGroup.get('maxLimit1').setErrors({ customError: true })
        } else {
          this.locationFormGroup.get('maxLimit1').setErrors(null)
        }
      }
    }
  }


}
