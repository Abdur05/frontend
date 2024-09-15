import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppreciateNoteService } from '../../../services/appreciateNote/appreciate-note.service';

@Component({
  selector: 'app-add-appreciation-note',
  templateUrl: './add-appreciation-note.component.html',
  styleUrls: ['./add-appreciation-note.component.css']
})
export class AddAppreciationNoteComponent {

  appreciationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private appreciationSer: AppreciateNoteService
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
    this.createFormData()
  }

  createFormData() {
    this.appreciationFormGroup = this.fb.group({
      apprecationNoteTemplate: this.fb.array([this.createFormArray()])
    })
  }

  createFormArray() {
    return this.fb.group({
      templateName: ['', Validators.required],
      note: ['', Validators.required],
    })
  }

  get formArrayDetail() {
    return this.appreciationFormGroup.get('apprecationNoteTemplate') as FormArray
  }

  addNote() {
    this.formArrayDetail.push(this.createFormArray())
  }
  deleteNote(index: any) {
    this.formArrayDetail.removeAt(index)
  }


  async submitCategory() {
    try {
      this.isSubmitted = true
      if (this.appreciationFormGroup.invalid) {
        return
      }
      const result: any = await this.appreciationSer.createAppreciationDetail(this.appreciationFormGroup.value)
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
