import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoanRequestService } from '../../../services/loan-request/loan-request.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-loan-request-list',
  templateUrl: './loan-request-list.component.html',
  styleUrls: ['./loan-request-list.component.css']
})
export class LoanRequestListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef


  isShowPadding: any = false
  loanRequestDetail: any = []
  selectAll: any = false
  allloanRequestDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    status: "Pending",
    type: 'Request'
  };
  employee: any = ''
  role: any = ''
  isShowScreenMenu: any = true;
  rolesView: any = ''
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private loanRequestSer: LoanRequestService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
  }


  handleFilterList(event: any) {
    this.filterText.status = event.target.value
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  handleFilterDetails() {
    this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemsPerPage;
    this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllloanRequestDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.loanRequestSer.getAllLoanRequestDetailFilter(filter, page, itemsPerPage)
      if (result) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.role = localStorage.getItem('roleId')
        this.employee = localStorage.getItem('userName')
        console.log(this.role, this.employee);

        this.loanRequestDetail = result.data
        this.allloanRequestDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }



  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    try {
      // Swal.fire({
      //   title: "Are you sure?",
      //   text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
      //   icon: "error",
      //   showCancelButton: true,
      //   confirmButtonColor: "#d33",
      //   cancelButtonColor: "#3085d6",
      //   confirmButtonText: "Yes",
      //   cancelButtonText: 'No'
      // }).then(async (result) => {
      //   if (result.isConfirmed) {
      //     data.isActive = data.isActive === 'O' ? 'C' : 'O'
      //     data.disable = true
      //     const result: any = await this.reasonSer.updatereason(data);
      //     if (result.status === '1') {
      //       this._snackBar.open("Updated Successfully", '', {
      //         duration: 5 * 1000, horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //         panelClass: 'app-notification-success',
      //       });
      //       this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
      //       return;
      //     }
      //     if (result.status === '0') {
      //       this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
      //       this._snackBar.open(result.message, '', {
      //         duration: 5 * 1000, horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //         panelClass: 'app-notification-error',
      //       });
      //     }
      //   } else {
      //     this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
      //   }
      // });


    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.loanRequestDetail = this.allloanRequestDetail;
      return;
    }

    this.loanRequestDetail = this.allloanRequestDetail.filter((obj: any) =>
      ((obj.loanRequest.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.loanRequestDetail = this.allloanRequestDetail.filter((obj: any) =>
      ((obj.loanRequest.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }


  onTabClick(event: MatTabChangeEvent): void {
    console.log('Selected tab index: ', event.index);
    console.log('Selected tab label: ', event.tab.textLabel);
    if (event.index === 1) {
      this.filterText.type = 'Approval'
      this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)

    } else {
      this.filterText.type = 'Request'
      this.getAllloanRequestDetail(this.filterText, this.records, this.itemsPerPage)
    }
    // You can perform additional actions based on the selected tab
  }

  nextPageNew(data:any){
    console.log(data)
    if(data.status === 'Approved'){
      return;
    }
    this.router.navigate([`/employee/edit-loan-request/${data._id}`])

  }

}
