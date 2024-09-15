import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MarkAttendanceService } from '../../../services/attendance/mark-attendance.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mark-attendance-list',
  templateUrl: './mark-attendance-list.component.html',
  styleUrls: ['./mark-attendance-list.component.css']
})
export class MarkAttendanceListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef


  isShowPadding: any = false
  markAttendanceDetail: any = []
  selectAll: any = false
  allmarkAttendanceDetail: any = [];

  filterText: any = {
    start_date: '',
    end_date: '',
    employee_id: '',
    exportToExcel: false
  }
  dateRangeDate: any = [];
  isShowScreenMenu: any = true;
  rolesView: any = '';

  selectedMonthYear: string = '';
  monthYearOptions: string[] = [];
  filterTextByMonthYear: any = {
    month: '',
    year: '',
    employee_id: ''
  }

  today: Date = new Date(); 

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private markAttendSer: MarkAttendanceService,
    private cd: ChangeDetectorRef
  ) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Today
    const today = new Date(currentDate);
    const formattedToday = this.changeDateFromate(today);
    this.filterText.end_date = formattedToday;
    this.dateRangeDate.push(today);

    // Start of the month (day 1)
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formattedStartOfMonth = this.changeDateFromate(startOfMonth);
    this.dateRangeDate.unshift(startOfMonth);
    this.filterText.start_date = formattedStartOfMonth;

    const employeeId = localStorage.getItem('userName');
    this.filterText.employee_id = this.filterTextByMonthYear.employee_id = employeeId;
    this.generateMonthYearOptions();
    this.setDefaultMonth();
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

  generateMonthYearOptions() {
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Populate options for the current year only
    for (let month of months) {
      this.monthYearOptions.push(`${month} ${currentYear}`);
    }
  }

  setDefaultMonth() {
    const currentMonthIndex = new Date().getMonth(); // Get the current month index (0-11)
    this.selectedMonthYear = this.monthYearOptions[currentMonthIndex]; // Select current month
    this.handleMonth({ target: { value: this.selectedMonthYear } }); // Call API with current month-year
  }

  handleMonth(event: any) {
    const selectedMonthYear = event.target.value;
    console.log(selectedMonthYear);

    const [month, year] = selectedMonthYear.split(' '); // Assuming the format is "Jan 2024"
    this.filterTextByMonthYear.month = month;
    this.filterTextByMonthYear.year = year;
    //this.getAllAttendanceDetailByMonthYear(this.filterTextByMonthYear)

  }

  async getAllAttendanceDetailByMonthYear(data: any) {
    try {
      const result: any = await this.markAttendSer.getAllattendanceDetailsByMonthYear(data);
      if (result.status === true) {

      this.markAttendanceDetail = result.data;
      this.markAttendanceDetail.map((el:any) =>{
        if(el.totalHours !== 0){
          const hoursFormate = this.formatTime(el.totalHours);
          el.hoursFormate = hoursFormate
        }else{
          el.hoursFormate = 0
        }
       
      })
      this.allmarkAttendanceDetail = result.data

      }
    } catch (error: any) {
      console.log(error);
    }
  }

  exportExcel() {
    this.filterText.exportToExcel = true;

    this.markAttendSer.exportAttendance(this.filterText)
      .then(() => console.log('Download initiated'))
      .catch(error => console.error('Error exporting attendance:', error));
  }

  async getAllmarkAttendanceDetail(data: any) {
    try {
      this.filterText.exportToExcel = false;
      const result: any = await this.markAttendSer.getAllattendanceDetails(data);
      if (result.status === true) {

      this.markAttendanceDetail = result.data;
      this.markAttendanceDetail.map((el:any) =>{
        if(el.totalHours !== 0){
          const hoursFormate = this.formatTime(el.totalHours);
          el.hoursFormate = hoursFormate
        }else{
          el.hoursFormate = 0
        }
       
      })
      this.allmarkAttendanceDetail = result.data

      }
    } catch (error: any) {
      console.log(error);
      // this._snackBar.open(error.error.message, '', {
      //   duration: 5 * 1000, horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   panelClass: 'app-notification-error',
      // });;
    }
  }


  onValueChange(event: any) {
    const formdate = this.changeDateFromate(event[0])
    this.filterText.start_date = formdate;
    const todate = this.changeDateFromate(event[1]);
    this.filterText.end_date = todate;
    this.filterText.exportToExcel = false;
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

    // Format each part to be two digits (e.g., 01, 09)
    const formattedHours = hoursPart.toString().padStart(2, '0');
    const formattedMinutes = minutesPart.toString().padStart(2, '0');
    //const formattedSeconds = secondsPart.toString().padStart(2, '0');

    // Return the formatted time in hh:mm:ss format
    return `${formattedHours}:${formattedMinutes}`;
  }

}
