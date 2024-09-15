import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventTypeService } from '../../../services/event-type/event-type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-event-type',
  templateUrl: './edit-event-type.component.html',
  styleUrls: ['./edit-event-type.component.css']
})
export class EditEventTypeComponent {

  eventTypeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  eventTypeId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private eventTypeSer: EventTypeService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventTypeId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormdata()
    this.getEventTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata(data?: any) {
    if (data) {
      this.eventTypeFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        eventType: [data.eventType],
        description: [data.description],

      });
    }
    this.eventTypeFormGroup = this.fb.group({
      _id: ['', Validators.required],
      eventType: [''],
      description: [''],

    });
  }

  async getEventTypeDetail() {
    try {
      const result: any = await this.eventTypeSer.singleEventTypeDetail(this.eventTypeId)
      console.log(result);

      if (result.status === true) {
        this.eventTypeFormGroup.patchValue(result.data)
        // this.createFormdata(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.eventTypeFormGroup.invalid)
        return
      const result: any = await this.eventTypeSer.updateEventTypeDetail(this.eventTypeFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/event-type-list/'])
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

}
