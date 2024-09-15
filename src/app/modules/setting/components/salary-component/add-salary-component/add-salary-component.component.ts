import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SalaryComponentService } from '../../../services/salary-component/salary-component.service';

@Component({
  selector: 'app-add-salary-component',
  templateUrl: './add-salary-component.component.html',
  styleUrls: ['./add-salary-component.component.css']
})
export class AddSalaryComponentComponent {

  salaryComponentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private salaryCompSer: SalaryComponentService
  ) { }

  ngOnInit(): void {
    this.createFormdata()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata() {
    this.salaryComponentFormGroup = this.fb.group({
      componentList: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup() {
    return this.fb.group({
      component_type: ['', Validators.required],
      component_name: [''],
    })
  }

  get taxDeclarationDetail() {
    return this.salaryComponentFormGroup.get('componentList') as FormArray
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
      if (this.salaryComponentFormGroup.invalid)
        return
      const result: any = await this.salaryCompSer.createSalaryComponent(this.salaryComponentFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/salary-component-list/'])
        return
      }
      if (result.status === 'false') {
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
