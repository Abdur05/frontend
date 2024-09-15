import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxDecEmployeeService } from '../../../services/tax-dec-employee/tax-dec-employee.service';
import Swal from 'sweetalert2';
import { TaxSettingService } from 'src/app/modules/setting/services/tax-setting/tax-setting.service';

@Component({
  selector: 'app-tax-dec-employee-list',
  templateUrl: './tax-dec-employee-list.component.html',
  styleUrls: ['./tax-dec-employee-list.component.css']
})
export class TaxDecEmployeeListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef

  isShowPadding: any = false
  taxDeclarationDetail: any = []
  selectAll: any = false
  alltaxDeclarationDetail: any = []
  taxSettingDetail: any = []
  fiscalYear: any = '';
  isShowScreenMenu: any = true;
  rolesView: any = '';
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private taxDecEmployeeSer: TaxDecEmployeeService,
    private taxSettingSer: TaxSettingService,
    private cd: ChangeDetectorRef
  ) {
    // this.getAllTaxSetting()

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
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    this.getAlltaxDeclarationEmployeeDetail()
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


  async getAlltaxDeclarationEmployeeDetail() {
    try {
      const result: any = await this.taxDecEmployeeSer.getAllTaxDeclarationEmployeeDetail(this.fiscalYear)
      console.log(result, 'mmm')
      if (result.status === true) {
        this.taxDeclarationDetail = result.data
        this.alltaxDeclarationDetail = result.data
      }
    } catch (error:any) {
      console.log(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.taxDeclarationDetail = this.alltaxDeclarationDetail;
      return;
    }

    this.taxDeclarationDetail = this.alltaxDeclarationDetail.filter((obj: any) =>
      ((obj.component_code.toUpperCase()).includes(filterValue) || (obj.component_name.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.taxDeclarationDetail = this.alltaxDeclarationDetail.filter((obj: any) =>
      ((obj.component_code.toUpperCase()).includes(filterValue) || (obj.component_name.toUpperCase()).includes(filterValue)))

  }

  async getAllTaxSetting() {
    try {
      const result: any = await this.taxSettingSer.getAllTaxSettingDetail()
      if (result.status === true) {
        this.taxSettingDetail = result.data
        this.fiscalYear = this.taxSettingDetail[0].fiscal_year
        console.log(this.fiscalYear);

      }
    } catch (error: any) {
      console.log(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



}
