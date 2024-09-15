import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthrService } from '../../../services/authr/authr.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  loginFormGroup: any = FormGroup;
  verfiyCodeFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isLoader: any = false;
  @Output() isShowSide = new EventEmitter<any>();
  verfiyCode: any = false;
  constructor(private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.createLogInFormFields()
    this.createVerfiyFormFields()
  }

  createLogInFormFields() {
    this.loginFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
    })
  }

  createVerfiyFormFields() {
    this.verfiyCodeFormGroup = this.fb.group({
      isCode: ['', [Validators.required]]
    })
  }

  async loginHandle() {
    this.isSubmitted = true
    try {
      if (this.loginFormGroup.invalid) {
        return
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear()+1;
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;
      this.loginFormGroup.value.todayDate = fullDate
      this.isLoader = true
      const result: any = await this.userSer.forgotPasswordUser(this.loginFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        localStorage.setItem('userName', this.loginFormGroup.value.userName)
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.loginFormGroup.reset();
        this.verfiyCode = true
        // this.router.navigate(['/authr/new-password'])
        this.isLoader = false
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        this.isLoader = false

      }
    } catch (error: any) {
      this.isLoader = false
      this.isSubmitted = false
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async verfiyCodeHandle() {
    this.isSubmitted = true
    try {
      if (this.verfiyCodeFormGroup.invalid) {
        return
      }
      this.isLoader = true;
      const username: any = localStorage.getItem('userName')
      this.verfiyCodeFormGroup.value.userName = username;
      const result: any = await this.userSer.verifyCodeUser(this.verfiyCodeFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        localStorage.setItem('isCode', this.verfiyCodeFormGroup.value.isCode)
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.verfiyCodeFormGroup.reset()
        this.router.navigate(['/authr/new-password'])
        this.isLoader = false
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        this.isLoader = false

      }
    } catch (error: any) {
      this.isLoader = false
      this.isSubmitted = false
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
