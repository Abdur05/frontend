import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyRequestService } from '../../../services/my-request/my-request.service';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-my-approval-list',
  templateUrl: './my-approval-list.component.html',
  styleUrls: ['./my-approval-list.component.css']
})
export class MyApprovalListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  myRequestDetail: any = []
  selectAll: any = false
  allmyRequestDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  totalItem: any = 0;
  currentPage = 1;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: 'waiting for approve',
    type:'Approval'
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private myRequestSer: MyRequestService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllMyRequestDetail(this.filterText, this.page, this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.myRequestDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.myRequestDetail[index].check = event.target.checked
    const findSelect = this.myRequestDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  handleFilterList(event: any) {
    this.filterText.text = event.target.value
  }

  handleFilterDetails() {
    this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllMyRequestDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myRequestSer.getAllMyRequestDetailsPageFilter(filter, page, itemsPerPage, )
      console.log(result.data, 'data');

      if (result.status === true) {
        result.data.data.map((el: any) => {
          el.check = false
        })
        this.myRequestDetail = result.data.data
        this.allmyRequestDetail = result.data.data
        this.totalItem = result.data.totalRecords;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemsPerPage;
    this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllMyRequestDetailManyById(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myRequestSer.getAllmyRequestDetailsPageUserId(page, itemsPerPage)
      console.log(result.data, 'data');

      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.myRequestDetail = result.data
        this.allmyRequestDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
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
          const result: any = await this.myRequestSer.updatemyRequest(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
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

  async handleDeleteMuliple() {
    try {
      // const filterData = this.myRequestDetail.filter((el: any) => el.check === true)
      // filterData.map((el: any) => {
      //   el.isActive = "C"
      // })
      // const result: any = await this.myRequestSer.updatemyRequestDetailMany(filterData);
      // if (result.status === '1') {
      //   this._snackBar.open("Deleted Successfully", '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-success',
      //   });
      //   this.getAllMyRequestDetail(this.page, this.itemsPerPage)
      //   return;
      // }
      // if (result.status === '0') {
      //   this._snackBar.open("Deleted Unsuccessfully", '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-error',
      //   });
      // }
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
