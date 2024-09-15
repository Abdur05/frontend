import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthrService } from '../../../services/authr/authr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  registerFormGroup: any = FormGroup
  isSubmitted: any = false
  text:any = false;

  constructor(private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar) {
    this.createSignUpFormFields()
  }

  createSignUpFormFields() {
    this.registerFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/)]],
      termsConditions: ['', [Validators.required]]
    })
  }

  async signupHandle() {
    this.isSubmitted = true
    try {
      if (this.registerFormGroup.invalid) {
        return
      }
      const result: any = await this.userSer.createUser(this.registerFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        this.registerFormGroup.reset();
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/authr/login'])
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this.isSubmitted = false
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error'
      });
    }
  }


}
