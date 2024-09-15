import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TaxSubmissionEmployeeService } from '../../../services/tax-submission-employee/tax-submission-employee.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaxSubmissionEmployeeComponent } from '../edit-tax-submission-employee/edit-tax-submission-employee.component';

@Component({
  selector: 'app-tax-submission-employee-list',
  templateUrl: './tax-submission-employee-list.component.html',
  styleUrls: ['./tax-submission-employee-list.component.css']
})
export class TaxSubmissionEmployeeListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef

  isShowPadding: any = false
  taxDeclarationDetail: any = []
  selectAll: any = false
  alltaxDeclarationDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  fiscalYear: any = '';
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private taxSubEmployeeSer: TaxSubmissionEmployeeService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    this.getAlltaxSubmissionEmployeeDetail()
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


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  async getAlltaxSubmissionEmployeeDetail() {
    try {
      const result: any = await this.taxSubEmployeeSer.getAllTaxDeclarationEmployeeDetail(this.fiscalYear)
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



  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === true ? false : true
          data.disable = true
          const result: any = await this.taxSubEmployeeSer.deletetaxDeclarationEmployeeDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlltaxSubmissionEmployeeDetail()
            return;
          }
          if (result.status === '0') {
            this.getAlltaxSubmissionEmployeeDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlltaxSubmissionEmployeeDetail()
        }
      });


    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
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


  handleEdit(id: any) {
    const dialogRef = this.dialog.open(EditTaxSubmissionEmployeeComponent, {
      data: id,
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getAlltaxSubmissionEmployeeDetail()
      }
    });
  }

}
