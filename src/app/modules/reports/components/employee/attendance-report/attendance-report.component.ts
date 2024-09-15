import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AttendanceReportService } from '../../../services/employee/attendance-report.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef


  isShowPadding: any = false
  markAttendanceDetail: any = []
  selectAll: any = false
  allmarkAttendanceDetail: any = [];

  filterText: any = {
    start_date: '',
    end_date: '',
    employee_id: ''
  }
  dateRangeDate: any = [];
  isShowScreenMenu: any = true;
  rolesView: any = '';
  isLoader: any = false;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private markAttendSer: AttendanceReportService,
    private cd: ChangeDetectorRef
  ) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(currentDate.getDate() + 1);
    const formdate = this.changeDateFromate(currentDate)
    this.filterText.start_date = formdate;
    this.dateRangeDate.push(currentDate)
    const todate = this.changeDateFromate(tomorrow);
    this.dateRangeDate.push(tomorrow)
    this.filterText.end_date = todate;
    const employeeId = localStorage.getItem('userName');
    this.filterText.employee_id = employeeId;
  }

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
    // this.getAllmarkAttendanceDetail(this.filterText)
  }



  async getAllmarkAttendanceDetail(data: any) {
    try {
      this.isLoader = true;
      const result: any = await this.markAttendSer.getAllAttandance(data);
      console.log(result, 'result')
      this.isLoader = false
      if (result.status === true) {

        this.markAttendanceDetail = result.data;
        this.markAttendanceDetail.map((el: any) => {
          if (el.totalHours !== 0) {
            const hoursFormate = this.formatTime(el.totalHours);
            el.hoursFormate = hoursFormate
          } else {
            el.hoursFormate = 0
          }

        })
        this.allmarkAttendanceDetail = result

      }
    } catch (error: any) {
      this.isLoader = false

      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  onValueChange(event: any) {
    const formdate = this.changeDateFromate(event[0])
    this.filterText.start_date = formdate;
    const todate = this.changeDateFromate(event[1]);
    this.filterText.end_date = todate;
    this.getAllmarkAttendanceDetail(this.filterText)
  }



  changeDateFromate(date: any, type?: any) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = currentDate.getDate();
    if (type === 'to') {
      day = currentDate.getDate() + 1;
    }
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    // Format the date and time
    const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fullDate;
  }


  formatTime(hours: any) {
    // Convert hours to total seconds
    let totalSeconds = Math.round(hours * 3600);

    // Calculate hours, minutes, and seconds
    const hoursPart = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutesPart = Math.floor(totalSeconds / 60);
    const secondsPart = totalSeconds % 60;

    // Create an array to hold the time parts
    const timeParts = [];

    // Add each part to the array if it is non-zero
    if (hoursPart > 0) timeParts.push(`${hoursPart} hour${hoursPart !== 1 ? 's' : ''}`);
    if (minutesPart > 0) timeParts.push(`${minutesPart} minute${minutesPart !== 1 ? 's' : ''}`);
    if (secondsPart > 0) timeParts.push(`${secondsPart} second${secondsPart !== 1 ? 's' : ''}`);

    // Join the time parts with commas
    return timeParts.join(', ');
  }

}
