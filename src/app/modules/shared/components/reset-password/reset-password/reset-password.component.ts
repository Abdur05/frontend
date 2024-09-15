import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  loginFormGroup: any = FormGroup
  isSubmitted: any = false;
  isLoader: any = false;
  @Output() isShowSide = new EventEmitter<any>();
  text: any = false;
  text1: any = false;
  text2: any = false;

  @Output() closeMatMenu = new EventEmitter<any>()

  constructor(private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.createLogInFormFields()
  }

  createLogInFormFields() {
    this.loginFormGroup = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
    })
  }

  async loginHandle() {
    this.isSubmitted = true
    try {
      if (this.loginFormGroup.invalid) {
        return
      }
      this.isLoader = true;
      const username: any = localStorage.getItem('userName')
      const code: any = localStorage.getItem('isCode')
      this.loginFormGroup.value.userName = username;
      this.loginFormGroup.value.isCode = code;
      const result: any = await this.userSer.newPasswordWithCode(this.loginFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.loginFormGroup.reset()
        this.logout()
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

  async logout() {
    try {
      const userName = localStorage.getItem('userName')
      const result: any = await this.userSer.logoutUser({ userName: userName })
      if (result.status === '1') {
        this.closeMatMenu.emit(true)
        localStorage.clear();
        this.router.navigate(['/'])

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handlePassword(event: any) {
    if (event.target.value) {
      console.log(event.target.value !== this.loginFormGroup.value.newPassword)
      if (event.target.value !== this.loginFormGroup.value.newPassword) {
        this.loginFormGroup.get('confirmPassword').setErrors({ customError: true })
      }
    }
  }

  handleNewPassword(event: any) {
    if (event.target.value) {
      if (event.target.value === this.loginFormGroup.value.oldPassword) {
        this.loginFormGroup.get('newPassword').setErrors({ customError: true })
      } else {
        this.loginFormGroup.get('newPassword').setErrors(null)
      }
      if (this.loginFormGroup.value.confirmPassword) {
        if (event.target.value !== this.loginFormGroup.value.confirmPassword) {
          this.loginFormGroup.get('confirmPassword').setErrors({ customError: true })
        } else {
          this.loginFormGroup.get('confirmPassword').setErrors(null)
        }
      }
    }
  }

  handleOldPassword(event: any) {
    if (event.target.value) {
      if (event.target.value === this.loginFormGroup.value.newPassword) {
        this.loginFormGroup.get('newPassword').setErrors({ customError: true })
      }
    }
  }

  back() {
    this.closeMatMenu.emit(true)
  }
}
