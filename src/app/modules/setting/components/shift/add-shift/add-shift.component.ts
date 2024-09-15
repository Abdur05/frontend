import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ShiftMaintenanceService } from '../../../services/shift/shift-maintenance.service';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css']
})
export class AddShiftComponent {

  shiftDetailFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private shiftMaintenanceSer: ShiftMaintenanceService

  ) { }

  ngOnInit(): void {
    this.data()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.shiftDetailFormGroup = this.fb.group({
      shiftCode: ['', [Validators.required]],
      shiftName: ['', [Validators.required]],
      description: [''],
      shiftStartTime: [''],
      shiftEndTime: [''],
      breakStartTime: [''],
      breakEndTime: [''],
      totalWorkingHour: [''],
      holidayHours: ['']
    });
    this.subscribeToFormChanges();

  }

  getCurrentTime(): string {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
  }


  calculateTotalWorking() {
    const shiftStartTime = this.shiftDetailFormGroup.get('shiftStartTime').value;
    const shiftEndTime = this.shiftDetailFormGroup.get('shiftEndTime').value;
    const breakStartTime = this.shiftDetailFormGroup.get('breakStartTime').value;
    const breakEndTime = this.shiftDetailFormGroup.get('breakEndTime').value;

    if (shiftStartTime && shiftEndTime && breakStartTime && breakEndTime) {
      const shiftStart = new Date(`1970-01-01T${shiftStartTime}`);
      const shiftEnd = new Date(`1970-01-01T${shiftEndTime}`);
      const breakStart = new Date(`1970-01-01T${breakStartTime}`);
      const breakEnd = new Date(`1970-01-01T${breakEndTime}`);

      if (shiftEnd > shiftStart && breakEnd > breakStart) {
        const shiftDuration = (shiftEnd.getTime() - shiftStart.getTime()) / (1000 * 60 * 60);
        const breakDuration = (breakEnd.getTime() - breakStart.getTime()) / (1000 * 60 * 60);

        const totalWorkingHours = shiftDuration - breakDuration;
        this.shiftDetailFormGroup.patchValue({
          totalWorkingHour: totalWorkingHours.toFixed(2)
        });
      }
    }
  }

  async submitData() {
    try {
      console.log(this.shiftDetailFormGroup.value);

      this.isSubmitted = true
      if (this.shiftDetailFormGroup.invalid)
        return
      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.shiftDetailFormGroup.value.createdOn = fullDate
      this.shiftDetailFormGroup.value.createdBy = username
      this.shiftDetailFormGroup.value.changedOn = fullDate
      this.shiftDetailFormGroup.value.changedBy = username


      const result: any = await this.shiftMaintenanceSer.createShiftMaintenanceDetail(this.shiftDetailFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/shift-list/'])
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

  subscribeToFormChanges() {
    this.shiftDetailFormGroup.valueChanges.subscribe(() => {
      this.calculateTotalWorkingHours();
    });
  }

  calculateTotalWorkingHours() {
    const shiftStartTime = this.shiftDetailFormGroup.get('shiftStartTime').value;
    const shiftEndTime = this.shiftDetailFormGroup.get('shiftEndTime').value;
    const breakStartTime = this.shiftDetailFormGroup.get('breakStartTime').value;
    const breakEndTime = this.shiftDetailFormGroup.get('breakEndTime').value;

    if (shiftStartTime && shiftEndTime && breakStartTime && breakEndTime) {
      const shiftDuration = this.calculateDuration(shiftStartTime, shiftEndTime);
      const breakDuration = this.calculateDuration(breakStartTime, breakEndTime);

      const totalWorkingHours = shiftDuration - breakDuration;
      this.shiftDetailFormGroup.patchValue({
        totalWorkingHour: totalWorkingHours.toFixed(2)
      });
    }
  }

  calculateDuration(startTime: string, endTime: string): number {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;

    return (endTotalMinutes - startTotalMinutes) / 60;
  }

}
