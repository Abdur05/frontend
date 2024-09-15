import { ChangeDetectorRef, Component } from '@angular/core';
import { ViewReviewTaxSubComponent } from '../view-review-tax-sub/view-review-tax-sub.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaxSubmissionEmployeeService } from '../../../services/tax-submission-employee/tax-submission-employee.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-review-tax-sub-list',
  templateUrl: './review-tax-sub-list.component.html',
  styleUrls: ['./review-tax-sub-list.component.css']
})
export class ReviewTaxSubListComponent {


  isShowPadding: any = false
  taxDeclarationDetail: any = []
  selectAll: any = false
  alltaxDeclarationDetail: any = []
  year: any = [];
  selectedFiscalYear: string = '';

  fiscalYear: any = '';
  isShowScreenMenu: any = true;
  rolesView: any = ''
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private taxSubEmployeeSer: TaxSubmissionEmployeeService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.year = this.generateYearRange()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    // this.getAlltaxSubmissionEmployeeDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  getFormattedFinancialYear(date: Date): string {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    let startYear: number;
    let endYear: number;

    // Financial year starts from April (month index 3)
    if (currentMonth >= 3) {
      startYear = currentYear;
      endYear = currentYear + 1;
    } else {
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    return `April ${startYear} - March ${endYear}`;
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
    return monthNames[monthIndex % 12];
  }

  onFiscalYearChange(event: any): void {
    this.selectedFiscalYear = event.target.value;
    console.log(this.selectedFiscalYear)
    this.getAlltaxSubmissionEmployeeDetail(this.selectedFiscalYear);
  }

  async getAlltaxSubmissionEmployeeDetail(year:any) {
    try {
      const data = {
        "fiscal_year": year
      }
      const result: any = await this.taxSubEmployeeSer.getAllTaxDeclarationEmployeeDetail(year)
      if (result.status === true) {
        this.taxDeclarationDetail = result.data
        this.alltaxDeclarationDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }



  handleEdit(empId: any) {
    const dialogRef = this.dialog.open(ViewReviewTaxSubComponent, {
      data: empId,
      width: '100vw',
      height: '700px',
      panelClass : 'full-screen-dialog',

      autoFocus:false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // if (result) {
        this.getAlltaxSubmissionEmployeeDetail(this.selectedFiscalYear)
      // }
    });
  }

}
