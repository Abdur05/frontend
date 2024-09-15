import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppreciateNoteService } from '../../../services/appreciateNote/appreciate-note.service';

@Component({
  selector: 'app-edit-appreciation-note',
  templateUrl: './edit-appreciation-note.component.html',
  styleUrls: ['./edit-appreciation-note.component.css']
})
export class EditAppreciationNoteComponent {

  appreciationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;
  appreciationId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private appreciationSer: AppreciateNoteService,
    private activateRouter: ActivatedRoute
  ) { }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.appreciationId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormData()
    this.getAppreciationDetailById()
  }

  createFormData() {
    this.appreciationFormGroup = this.fb.group({
      _id: ['', Validators.required],
      templateName: ['', Validators.required],
      note: ['', Validators.required],
    })
  }

  async getAppreciationDetailById() {
    try {
      const result: any = await this.appreciationSer.singleAppreciationDetail(this.appreciationId)
      if (result.status === true) {
        this.appreciationFormGroup.patchValue(result.data)
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async submitCategory() {
    try {
      this.isSubmitted = true
      if (this.appreciationFormGroup.invalid) {
        return
      }
      const result: any = await this.appreciationSer.updateAppreciationDetail(this.appreciationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/appreciation-list/'])
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
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
