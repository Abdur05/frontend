import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyRequestService } from '../../../services/my-request/my-request.service';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-my-request-list',
  templateUrl: './my-request-list.component.html',
  styleUrls: ['./my-request-list.component.css']
})
export class MyRequestListComponent implements OnInit {

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
    text: 'All',
    month: '',
    year: '',
    type: 'request'
  };
  isShowScreenMenu: any = true;
  rolesView: any = ''
  selectedMonthYear: string = '';
  monthYearOptions: string[] = [];

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private myRequestSer: MyRequestService,
    private cd: ChangeDetectorRef
  ) {
    this.generateMonthYearOptions();
    this.setDefaultMonth();
   }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllMyRequestDetailFilter(this.filterText, this.page, this.itemsPerPage)
  }

  generateMonthYearOptions() {
    const currentYear = new Date().getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Populate options for the current year only
    for (let month of months) {
      this.monthYearOptions.push(`${month} ${currentYear}`);
    }
  }

  setDefaultMonth() {
    const currentMonthIndex = new Date().getMonth(); // Get the current month index (0-11)
    this.selectedMonthYear = this.monthYearOptions[currentMonthIndex]; // Select current month
    this.handleMonth({ target: { value: this.selectedMonthYear } }); // Call API with current month-year
  }

  handleMonth(event: any) {
    const selectedMonthYear = event.target.value;
    console.log(selectedMonthYear);

    const [month, year] = selectedMonthYear.split(' '); // Assuming the format is "Jan 2024"
    this.filterText.month = month;
    this.filterText.year = year;

  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  handleFilterList(event: any) {
    this.filterText.text = event.target.value
  }

  handleFilterDetails() {
    this.getAllMyRequestDetailFilter(this.filterText, this.records, this.itemsPerPage)
  }

  // async getAllMyRequestDetail(filter: any,page: any, itemsPerPage: any) {
  //   try {
  //     const result: any = await this.myRequestSer.getAllmyRequestDetailsPageUserId(filter, page, itemsPerPage, 'request')
  //     console.log(result.data, 'data');

  //     if (result.status === '1') {
  //       result.data.map((el: any) => {
  //         el.check = false
  //       })
  //       this.myRequestDetail = result.data
  //       this.allmyRequestDetail = result.data
  //       if (result.data.length === 0) {
  //         this.selectAll = false
  //       }
  //     }
  //   } catch (error) {

  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });;
  //   }
  // }

  async getAllMyRequestDetailFilter(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.myRequestSer.getAllMyRequestDetailsPageFilter(filter, page, itemsPerPage)
      console.log(result.data, 'data');

      if (result.status === true) {
        this.myRequestDetail = result.data.data
        this.allmyRequestDetail = result.data.data
        this.totalItem = result.data.totalRecords;
      } else {
        this.myRequestDetail = [];
        this.allmyRequestDetail = []
        this.totalItem = 0;
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
    this.getAllMyRequestDetailFilter(this.filterText, this.records, this.itemsPerPage)
  }


  // async getAllMyRequestDetail(filter: any, page: any, itemsPerPage: any) {
  //   try {
  //     const result: any = await this.myRequestSer.getAllMyRequestDetailsPageFilter(filter, page, itemsPerPage)
  //     console.log(result.data, 'data');

  //     if (result.status === '1') {
  //       result.data.map((el: any) => {
  //         el.check = false
  //       })
  //       this.myRequestDetail = result.data
  //       this.allmyRequestDetail = result.data
  //       if (result.data.length === 0) {
  //         this.selectAll = false
  //       }
  //     }
  //   } catch (error) {

  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });;
  //   }
  // }


  mapStatus(status: string): string {
    if (status.trim() === 'w') {
      return 'waiting';
    }
    return status; // Return original status if not 'w'
  }

  //delete single or particular record by the delete icon in every row of data
  async deleteRecords(data: any) {
    // try {
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
    //     icon: "error",
    //     showCancelButton: true,
    //     confirmButtonColor: "#d33",
    //     cancelButtonColor: "#3085d6",
    //     confirmButtonText: "Yes",
    //     cancelButtonText: 'No'
    //   }).then(async (result) => {
    //     if (result.isConfirmed) {
    //       data.isActive = data.isActive === 'O' ? 'C' : 'O'
    //       data.disable = true
    //       const result: any = await this.myRequestSer.updatemyRequest(data);
    //       if (result.status === '1') {
    //         this._snackBar.open("Updated Successfully", '', {
    //           duration: 5 * 1000, horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //           panelClass: 'app-notification-success',
    //         });
    //         this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
    //         return;
    //       }
    //       if (result.status === '0') {
    //         this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
    //         this._snackBar.open(result.message, '', {
    //           duration: 5 * 1000, horizontalPosition: 'center',
    //           verticalPosition: 'top',
    //           panelClass: 'app-notification-error',
    //         });
    //       }
    //     } else {
    //       this.getAllMyRequestDetail(this.filterText, this.records, this.itemsPerPage)
    //     }
    //   });


    // } catch (error: any) {

    //   this._snackBar.open('Something went wrong', '', {
    //     duration: 5 * 1000, horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     panelClass: 'app-notification-error',
    //   });
    // }
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
