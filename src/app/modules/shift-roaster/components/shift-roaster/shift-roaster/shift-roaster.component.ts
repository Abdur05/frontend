import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { ShiftMaintenanceService } from 'src/app/modules/setting/services/shift/shift-maintenance.service';
import Swal from 'sweetalert2';
import { ShiftRoasterService } from '../../../services/shift-roaster/shift-roaster.service';

@Component({
  selector: 'app-shift-roaster',
  templateUrl: './shift-roaster.component.html',
  styleUrls: ['./shift-roaster.component.css']
})
export class ShiftRoasterComponent {



  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  shiftRoasterFormgroup: any = FormGroup
  months: string[] = [];
  isShowPadding: any = false
  employeeDetail: any = []
  shiftMaintenanceDetail: any = []
  shiftRoasterDetail: any = []
  shiftInfoColumns: string[] = []; // Add this
  monthYear: any = ''
  ELEMENT_DATA: any[] = [];
  token: any = ''
  isShowScreenMenu: any = true;
  selectedMonthYear:any = '';
  roleName:any = '';
  selectedMonth:any = '';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private myProfileSer: MyProfileService,
    private shiftMainSer: ShiftMaintenanceService,
    private fb: FormBuilder,
    private shiftRoasterSer: ShiftRoasterService
  ) {
    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth()+1;
    this.selectedMonth = `${this.getMonthName(month)} ${currentYear}`;
    console.log(this.selectedMonth, 'this.selectedMonth');
    this.getAllShiftRoasterDetail(this.selectedMonth);
    for (let month = 1; month <= 12; month++) {
      this.monthYear = `${this.getMonthName(month)} ${currentYear}`;
      this.months.push(this.monthYear);
    }
    this.token = localStorage.getItem('token');
    this.roleName = localStorage.getItem('roleId')

  }

  getMonthName(month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month - 1];
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllShiftMaintenanceDetail()
    this.createFormGroup()
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormGroup(data?: any): void {
    if (data) {
      this.shiftRoasterFormgroup = this.fb.group({

        shiftInfoDetail: this.fb.array(data.map((el: any) => this.createShiftFromGroup(el)))
      });
      return
    }
    this.shiftRoasterFormgroup = this.fb.group({

      shiftInfoDetail: this.fb.array([this.createShiftFromGroup()])
    });
  }

  get shiftInfoController() {
    return this.shiftRoasterFormgroup.get('shiftInfoDetail') as FormArray
  }

  createShiftFromGroup(data?: any) {
    if (data) {
      return this.fb.group({
        _id: [data._id],
        email: [data.email],
        employeeId: [data.employeeId],
        firstName: [data.firstName],
        lastName: [data.lastName],
        mobile: [data.mobile],
        monthYear: [data.monthYear],
        shiftInfo: this.fb.array(data.shiftInfo.map((el: any) => this.createShiftInfoFormGroup(el)))
      })
    }
    return this.fb.group({
      _id: [''],
      email: [''],
      employeeId: [''],
      firstName: [''],
      lastName: [''],
      mobile: [''],
      monthYear: [''],
      shiftInfo: this.fb.array([this.createShiftInfoFormGroup()])
    })
  }

  createShiftInfoFormGroup(data?: any) {
    if (data) {
      return this.fb.group({
        date: [data.date],
        day: [data.day],
        shift: [data.shift]
      })
    }
    return this.fb.group({
      date: [''],
      day: [''],
      shift: ['']

    })
  }

  updateFormWithDetail(): void {
    this.shiftRoasterDetail.forEach((detail: any, i: any) => {
      const shiftInfoArray = this.fb.array([]);
      detail.shiftInfo.forEach((shift: any, j: any) => {
        const shiftFormGroup: any = this.fb.group({
          date: shift.date,
          day: shift.day,
          shift: ''
        });
        shiftInfoArray.push(shiftFormGroup);
      });
      (this.shiftRoasterFormgroup.get('shiftInfo') as FormArray).push(shiftInfoArray);
    });
    console.log(this.shiftRoasterFormgroup.value, 'shiftRoaster')
  }

  createShiftInfo() {
    return this.fb.group({
      shift: ['']
    })
  }

  async submitData() {
    try {
      console.log(this.shiftRoasterFormgroup.value);
      const result: any = await this.shiftRoasterSer.updateShiftRoasterDetail(this.shiftRoasterFormgroup.value.shiftInfoDetail)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        const [month, year] = this.selectedMonthYear.split(' '); // Assuming the format is "Jan 2024"
        console.log(month, "---", year)
        if (month && year) {
          this.getAllShiftRoasterDetail(month + " " + year);
        }
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

  handleMonth(event: any) {
    this.selectedMonthYear = event.target.value;
    console.log(this.selectedMonthYear);

    const [month, year] = this.selectedMonthYear.split(' '); // Assuming the format is "Jan 2024"
    console.log(month, "---", year)
    if (month && year) {
      this.getAllShiftRoasterDetail(month + " " + year);
    }

  }


  handleFilterDetails() {
    // this.getAllReasonDetail(this.filterText, this.records, this.itemsPerPage)
  }


  async getAllShiftMaintenanceDetail() {
    try {
      const result: any = await this.shiftMainSer.getAllShiftMaintenanceDetail()
      if (result) {
        this.shiftMaintenanceDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      })
    }
  }

  async getAllShiftRoasterDetail(month: any) {
    try {
      const result: any = await this.shiftRoasterSer.getAllNewShiftRoasterDetails(month)
      if (result) {
        this.shiftRoasterDetail = result.data
        this.createFormGroup(result.data)
        console.log(this.shiftRoasterFormgroup.value)
      }
    } catch (error: any) {
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      })
    }
  }
}

