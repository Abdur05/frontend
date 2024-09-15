import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanApproveConfigService } from '../../../services/loan-approve-config/loan-approve-config.service';
import Swal from 'sweetalert2';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';

@Component({
  selector: 'app-loan-approval-list',
  templateUrl: './loan-approval-list.component.html',
  styleUrls: ['./loan-approval-list.component.css']
})
export class LoanApprovalListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  loanApprovalConfigDetail: any = []
  selectAll: any = false
  allloanApprovalConfigDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  empTypeDetail: any = []
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private loanAppStageSer: LoanApproveConfigService,
    private empTypeSer: EmployeeTypeService,
    private cd: ChangeDetectorRef
  ) { }

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
    this.getAllloanApprovalConfigDetail(this.page, this.itemsPerPage)
  }


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAllloanApprovalConfigDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllloanApprovalConfigDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.loanAppStageSer.getAllLoanApprovalStageDetailsPage(page, itemsPerPage)
      if (result.status) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.loanApprovalConfigDetail = result.data
        this.allloanApprovalConfigDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
        // if (this.loanApprovalConfigDetail.length > 0) {
        //   await this.getAllEmployeeType();
        //   this.mapEmployeeType();
        // }
      }else{
        this.loanApprovalConfigDetail = []
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }
  async getAllEmployeeType() {
    try {
      const result: any = await this.empTypeSer.getAllEmployeeTypeDetail()
      if (result) {
        this.empTypeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  mapEmployeeType() {
    this.loanApprovalConfigDetail.forEach((config: any) => {
      const empType = this.empTypeDetail.find((emp: any) => emp.employeeTypeId === config.employeeTypeId);
      console.log(empType);

      config.employeeType = empType ? empType.employeeType : 'Unknown';
    });
  }


  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === 'O' ? 'C' : 'O'
          data.disable = true
          const result: any = await this.loanAppStageSer.deleteloanApprovalstageDetail(data._id);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllloanApprovalConfigDetail(this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllloanApprovalConfigDetail(this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllloanApprovalConfigDetail(this.records, this.itemsPerPage)
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
      this.loanApprovalConfigDetail = this.allloanApprovalConfigDetail;
      return;
    }

    this.loanApprovalConfigDetail = this.allloanApprovalConfigDetail.filter((obj: any) =>
      ((obj.loanApprovalConfig.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.loanApprovalConfigDetail = this.allloanApprovalConfigDetail.filter((obj: any) =>
      ((obj.loanApprovalConfig.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

}
