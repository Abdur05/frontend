import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdvancePaymentService } from '../../../services/advancePayment/advance-payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-advance-payment-list',
  templateUrl: './advance-payment-list.component.html',
  styleUrls: ['./advance-payment-list.component.css']
})
export class AdvancePaymentListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  advancePaymentDetail: any = []
  selectAll: any = false
  alladvancePaymentDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedDate: String = ''
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  rolesDetails: any = [];
  rolesView: any = [];
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private advancePaySer: AdvancePaymentService
  ) {
    var rolesLists: any = localStorage.getItem('roles');
    rolesLists = JSON.parse(rolesLists);
    var roleId: any = localStorage.getItem('roleId')
    this.rolesDetails = rolesLists.find((el: any) => el.roleId === roleId);
    this.rolesView = this.rolesDetails.rolesAccess.find((el: any) => el.screenId === 'My Profile');
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAlladvancePaymentDetail(this.filterText, this.page, this.itemsPerPage)
  }


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAlladvancePaymentDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.advancePaySer.getAlladvancePaymentDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        this.advancePaymentDetail = result.data
        this.alladvancePaymentDetail = result.data
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
          data.isActive = data.isActive === 'O' ? 'C' : 'O'
          data.disable = true
          const result: any = await this.advancePaySer.updatadvancePaymentDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
        }
      });


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
    if (!filterValue && !this.selectedDate) {
      this.advancePaymentDetail = this.alladvancePaymentDetail;
      return;
    }

    this.advancePaymentDetail = this.alladvancePaymentDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.department.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.advancePaymentDetail = this.alladvancePaymentDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue) || (obj.department.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))

  }


  handleDate(event: any) {
    this.selectedDate = event.target.value;
    this.filterData();
  }



  async handleDeleteMuliple() {
    try {
      const filterData = this.advancePaymentDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.advancePaySer.updatedManyadvancePaymentDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAlladvancePaymentDetail(this.filterText, this.page, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }


  }

}
