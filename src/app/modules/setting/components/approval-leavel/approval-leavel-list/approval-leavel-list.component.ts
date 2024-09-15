import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyRequestService } from 'src/app/modules/regularization/services/my-request/my-request.service';
import { ApplyLeaveService } from '../../../services/apply-leave/apply-leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-approval-leavel-list',
  templateUrl: './approval-leavel-list.component.html',
  styleUrls: ['./approval-leavel-list.component.css']
})
export class ApprovalLeavelListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  myRequestDetail: any = []
  selectAll: any = false
  allmyRequestDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private myRequestSer: ApplyLeaveService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllapplyLeaveDetail(this.filterText, this.page, this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllapplyLeaveDetailFilter(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllapplyLeaveDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myRequestSer.getAllApprovalList(page, itemsPerPage)
      console.log(result);

      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.myRequestDetail = result.data
        this.allmyRequestDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
      else if (result.status === false) {
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
      });;
    }
  }


  async getAllapplyLeaveDetailFilter(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myRequestSer.getAllApplyLeaveDetailsPageFilter(filter, page, itemsPerPage)
      console.log(result);

      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.myRequestDetail = result.data
        this.allmyRequestDetail = result.data
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
          data.isActive = data.isActive === true ? false : true
          data.disable = true
          const result: any = await this.myRequestSer.updatApplyLeaveDetail(data);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
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
      this.myRequestDetail = this.allmyRequestDetail;
      return;
    }

    this.myRequestDetail = this.allmyRequestDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.employeeName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.myRequestDetail = this.allmyRequestDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.employeeName.toUpperCase()).includes(filterValue)))

  }

}
