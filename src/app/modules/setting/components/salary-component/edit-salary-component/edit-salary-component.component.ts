import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryComponentService } from '../../../services/salary-component/salary-component.service';

@Component({
  selector: 'app-edit-salary-component',
  templateUrl: './edit-salary-component.component.html',
  styleUrls: ['./edit-salary-component.component.css']
})
export class EditSalaryComponentComponent {
  salaryComponentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  salaryCompId: any = ''
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private salaryCompSer: SalaryComponentService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.salaryCompId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getSalaryComponentDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata() {
    this.salaryComponentFormGroup = this.fb.group({
      _id: ['', Validators.required],
      component_type: ['', Validators.required],
      component_name: [''],
    });
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.salaryComponentFormGroup.invalid)
        return
      const result: any = await this.salaryCompSer.updateSalaryComponent(this.salaryComponentFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/salary-component-list/'])
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

  async getSalaryComponentDetail() {
    try {
      const result: any = await this.salaryCompSer.singleSalaryComponent(this.salaryCompId)
      console.log(result);
      if (result.status === true) {
        this.salaryComponentFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

}
