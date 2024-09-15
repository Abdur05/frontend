import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthrService } from '../../../services/authr/authr.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {

  loginFormGroup: any = FormGroup
  isSubmitted: any = false;
  isLoader:any = false;
  @Output() isShowSide = new EventEmitter<any>();
  text:any = false;
  text1:any = false;

  constructor(private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.createLogInFormFields()
  }

  createLogInFormFields() {
    this.loginFormGroup = this.fb.group({
      newPassword: ['', [Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      confirmPassword:['', [Validators.required,Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
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
      const result: any = await this.userSer.newPassword(this.loginFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
      
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.loginFormGroup.reset()
        this.isShowSide.emit(true)
        // this.router.navigate(['/setting/location-list'])
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

  handlePassword(event:any){
    if(event.target.value){
      console.log(event.target.value !== this.loginFormGroup.value.newPassword)
      if(event.target.value !== this.loginFormGroup.value.newPassword){
        this.loginFormGroup.get('confirmPassword').setErrors({ customError: true })
      }
    }
  }
}
