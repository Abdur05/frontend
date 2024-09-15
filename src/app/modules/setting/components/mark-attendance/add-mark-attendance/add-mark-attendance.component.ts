import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MarkAttendanceService } from '../../../services/attendance/mark-attendance.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-mark-attendance',
  templateUrl: './add-mark-attendance.component.html',
  styleUrls: ['./add-mark-attendance.component.css']
})
export class AddMarkAttendanceComponent {


  @ViewChild('checkinButton', { static: true }) checkinButton: ElementRef | undefined;
  markAttendanceFormGroup: any = FormGroup
  buttonText = 'Check In';
  dynamicTime: string = '';
  today: Date = new Date();
  isShowPadding: any = false
  reasonDetail: any = []
  selectAll: any = false
  allreasondetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  currentRange: any;
  weekDays: Date[] = [];
  singleAttendenceId: any = ''
  buttonDisable: any = false;
  perviousDate: any = new Date();
  isNextButton: any = false;
  weekDate: any = '';
  isShowScreenMenu: any = true;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private attendenceSer: MarkAttendanceService,
    private datePipe: DatePipe
  ) {
    this.createFormField();



  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getEmpDetails()

    this.updateTime()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormField(data?: any) {
    if (data) {
      const fullDate = this.changeDateFromate(data.date);
      this.markAttendanceFormGroup = this.fb.group({
        action: [data.action],
        date: [fullDate],
        notes: [data.notes],
        totalHours: [data.totalHours],
        events: this.fb.array(data.events.map((el: any) => this.createEventControllers(el)))
      })
      return
    }
    const fullDate = this.changeDateFromate(new Date());
    this.markAttendanceFormGroup = this.fb.group({
      action: ['checkOut'],
      date: [fullDate],
      notes: [''],
      totalHours: [''],
      events: this.fb.array([this.createEventControllers()])
    })
  }

  get eventControllers() {
    return this.markAttendanceFormGroup.get('events') as FormArray
  }

  createEventControllers(data?: any) {
    if (data) {
      const checkinFormate = this.datePipe.transform(data.check_in, 'medium')
      const checkOutFormate = this.datePipe.transform(data.check_out, 'medium')
      return this.fb.group({
        sequence: [data.sequence],
        check_in: [data.check_in],
        check_out: [data.check_out],
        check_in_View: [checkinFormate],
        check_out_View: [checkOutFormate]
      })
    }
    return this.fb.group({
      sequence: [''],
      check_in: [''],
      check_out: [''],
      check_in_View: [''],
      check_out_View: ['']
    })
  }

  async checkLocation() {
    try {
      if (this.markAttendanceFormGroup.value.action !== 'checkIn') {

        const reqBody = this.markAttendanceFormGroup.value.events[this.markAttendanceFormGroup.value.events.length - 1];
        const request = {
          employee_id: localStorage.getItem('userName'),
          date: this.markAttendanceFormGroup.value.date,
          check_in_time: new Date()
        }
        const result = await this.attendenceSer.createattendance(request);
        console.log(result, 'checkin')
        this.getEmpDetails()
      } else {
        const formArray = this.markAttendanceFormGroup.get('events') as FormArray;
        const formGroup = formArray.at(this.markAttendanceFormGroup.value.events.length - 1) as FormGroup;
        formGroup.patchValue({
          check_out: new Date()
        })
        const reqBody = this.markAttendanceFormGroup.value.events[this.markAttendanceFormGroup.value.events.length - 1];
        console.log(reqBody, 'reqBody')
        const request = {
          employee_id: localStorage.getItem('userName'),
          date: this.markAttendanceFormGroup.value.date,
          check_out_time: reqBody.check_out
        }
        const result = await this.attendenceSer.updateattendance(request);
        console.log(result, 'checkin')
        this.getEmpDetails()
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getEmpDetails(date?: any) {
    try {
      const emplyId = localStorage.getItem('userName')
      if (date) {
        this.perviousDate.setDate(this.perviousDate.getDate() + 1)
      }
      const result: any = await this.attendenceSer.getAttendenceDetailsByEmpId(emplyId, this.perviousDate);
      if (result.status) {

        this.createFormField(result.data)
      }
      // if (result.status === '1') {


      // }
    } catch (error: any) {
      console.error(error);
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  changeDateFromate(date: any) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = currentDate.getDate();
    // Format the date and time
    const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fullDate;
  }


  updateTime() {
    setInterval(() => {
      const now = new Date();
      this.dynamicTime = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0') + ':' + now.getSeconds().toString().padStart(2, '0');
    }, 1000); // Update every second
  }

}