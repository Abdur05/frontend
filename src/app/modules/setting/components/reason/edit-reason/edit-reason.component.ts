import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReasonService } from '../../../services/reason/reason.service';

@Component({
  selector: 'app-edit-reason',
  templateUrl: './edit-reason.component.html',
  styleUrls: ['./edit-reason.component.css']
})
export class EditReasonComponent {

  reasonFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  reasonId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private reasonSer: ReasonService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.reasonId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.singleReasonDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.reasonFormGroup = this.fb.group({
      _id: ['', Validators.required],
      reasonId: ['', Validators.required],
      description: [''],
    });
  }



  async singleReasonDetail() {
    try {
      const result: any = await this.reasonSer.singlereasonDetails(this.reasonId)
      if (result.status === '1') {
        this.reasonFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.reasonFormGroup.invalid)
        return
      const result: any = await this.reasonSer.updatereason(this.reasonFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/reason-list/'])
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

}
