import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';

@Component({
  selector: 'app-clear-user',
  templateUrl: './clear-user.component.html',
  styleUrls: ['./clear-user.component.css']
})
export class ClearUserComponent {

  loginFormGroup: any = FormGroup
  isSubmitted: any = false;
  isLoader: any = false;
  @Output() isShowSide = new EventEmitter<any>();
  verfiyCode: any = false;
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
      userName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    })
  }



  async loginHandle() {
    try {
      this.isSubmitted = true
      console.log(this.loginFormGroup)
      if (this.loginFormGroup.invalid) {
        return
      }
      const userName = localStorage.getItem('userName')
      if (userName === this.loginFormGroup.value.userName) {
        this._snackBar.open('You cannot clear your details while logged in.', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear() + 1;
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;
      this.loginFormGroup.value.todayDate = fullDate
      this.isLoader = true
      const result: any = await this.userSer.loginDetailsUpdated(this.loginFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.loginFormGroup.reset();
        this.closeMatMenu.emit(true)
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


  async findUser(event: any) {
    if (event.target.value) {
      try {

        this.isLoader = true;
        const result: any = await this.userSer.getSingleUserdetails(event.target.value)
        this.isSubmitted = false
        if (result.status === '1') {

          this.loginFormGroup.patchValue(result.data)
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
        this._snackBar.open('Something Went Wrong', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    }
  }

  back() {
    this.closeMatMenu.emit(true)
  }

  onTabKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent default tab behavior
    }
  }
}
