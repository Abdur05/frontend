import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';
import { GetPayslipComponent } from './get-payslip/get-payslip/get-payslip.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PayslipService } from '../../services/payslips/payslip.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-payslips',
  templateUrl: './payslips.component.html',
  styleUrls: ['./payslips.component.css']
})
export class PayslipsComponent {

  isShowPadding: any = false
  paySlipDetail: any = []
  dateRangeDate: any = []
  page?: number = 0;
  itemsPerPage = 10;
  totalItem: any = 0;
  currentPage = 1;
  records: any = 0
  year: any = [];
  isShowScreenMenu: any = true;
  rolesView: any = '';
  selectedMonthYear: string = '';
  monthYearOptions: string[] = [];
  isLoader: any = false;
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private payslipSer: PayslipService,
    private cd: ChangeDetectorRef
  ) {
    this.year = this.generateYearRange()
    this.generateMonthYearOptions();
    this.setDefaultMonth();
  }

  ngOnInit(): void {
    // this.getAllPayslipDetail(this.page, this.itemsPerPage)
  }

  generateMonthYearOptions() {
    const currentDate = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Populate options for the last 12 months
    for (let i = 0; i < 12; i++) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      const year = currentDate.getFullYear() - (i > currentDate.getMonth() ? 1 : 0);
      this.monthYearOptions.push(`${months[monthIndex]} ${year}`);
    }
  }

  setDefaultMonth() {
    this.selectedMonthYear = this.monthYearOptions[0]; // Select the most recent month
    this.handleMonth({ target: { value: this.selectedMonthYear } }); // Call API with the selected month-year
  }

  handleMonth(event: any) {
    const selectedMonthYear = event.target.value;
    console.log(selectedMonthYear);

    const [month, year] = selectedMonthYear.split(' ');

    this.selectedMonthYear = event.target.value;
    this.getAllPayslipDetail(this.page, this.itemsPerPage);
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  onFiscalYearChange(event: any): void {
    // this.selectedFiscalYear = event.target.value;
    this.getAllPayslipDetail(this.page, this.itemsPerPage);
  }

  generateYearRange(): string[] {
    const today = new Date();
    const currentYear = today.getFullYear();
    const startMonth = 3; // April (0-indexed)
    const startYear = today.getMonth() >= startMonth ? currentYear : currentYear - 1;
    const endYear = startYear + 9; // Generate 10 years starting from current fiscal year
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const nextYear = year + 1;
      const fiscalYear = `${this.getMonthName(startMonth)} ${year} - ${this.getMonthName(startMonth + 11)} ${nextYear}`;
      years.push(fiscalYear);
    }
    return years;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex % 12]; // Use modulo 12 to wrap around for December
  }

  pageChanged(event: PageChangedEvent): void {
    console.log("event-----", event)
    this.page = event.page;
    this.records = (this.page - 1) * this.itemsPerPage;
    this.getAllPayslipDetail(this.records, this.itemsPerPage);
  }

  async getAllPayslipDetail(page: any, itemsPerPage: any) {
    try {
      this.isLoader = true;
      const result: any = await this.payslipSer.getAllPayslipDetail(page, itemsPerPage, this.selectedMonthYear, false)
      if (result.status === true) {
        this.isLoader = false;
        this.paySlipDetail = result.data.data
        this.totalItem = result.data.totalRecords;
      }
      this.isLoader = false;
    } catch (error: any) {
      this.isLoader = false;
      this.paySlipDetail = [];
      this.totalItem = 0;
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  exportExcel() {
    this.payslipSer.exportAttendance(this.records, this.itemsPerPage, this.selectedMonthYear, true)
      .then(() => console.log('Download initiated'))
      .catch(error => console.error('Error exporting attendance:', error));
  }

  handleUpdate(id: any) {
    const dialogRef = this.dialog.open(ViewPdfFileComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  createForm() {
    const dialogRef = this.dialog.open(GetPayslipComponent, {
      width: '500px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result)
      this.getAllPayslipDetail(this.records, this.itemsPerPage);
    });
  }

}
