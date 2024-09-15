import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExtraEarningService } from '../../services/extra-earning/extra-earning.service';

@Component({
  selector: 'app-extra-earnings',
  templateUrl: './extra-earnings.component.html',
  styleUrls: ['./extra-earnings.component.css']
})
export class ExtraEarningsComponent implements OnInit {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  earningDetail: any = []
  fiscal_year: any = ''
  dateRangeDate: any = []
  year: any = [];
  selectedFiscalYear: string = '';
  showNoRecordsMessage: boolean = false;
  isShowScreenMenu:any = true;
  rolesView:any = ''
  selectedMonthYear: string = '';
  monthYearOptions: string[] = [];
 
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private extraErnSer: ExtraEarningService,
    private cd:ChangeDetectorRef

  ) {
    this.year = this.generateYearRange();
    this.generateMonthYearOptions();
    this.setDefaultMonth();
  }

  generateMonthYearOptions() {
    const currentDate = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

    this.selectedFiscalYear = event.target.value;
    this.getAllEarning();
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  generateYearRange(): string[] {
    const startYear = new Date().getFullYear();
    const endYear = startYear + 9; // Generate 10 years starting from current year
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(`${year}-${year + 1}`);
    }
    return years;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    // this.getAllEarning()
  }

  async getAllEarning() {
    try {
      if (!this.selectedFiscalYear) {
        // Display message and return if no fiscal year is selected
        this.showNoRecordsMessage = true;
        this.earningDetail = []; // Clear any previous data
        return;
      }
      const result: any = await this.extraErnSer.getAllExtraEarningDetail(this.selectedFiscalYear)
      if (result.status === true) {
        this.earningDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
      this.earningDetail = [];
    }
  }

  onFiscalYearChange(event: any): void {
    this.selectedFiscalYear = event.target.value;
    this.getAllEarning();
  }


}
