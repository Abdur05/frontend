import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppraisalCycleService } from '../../../services/appraisal-cycle/appraisal-cycle.service';

@Component({
  selector: 'app-appraisal-cycle-list',
  templateUrl: './appraisal-cycle-list.component.html',
  styleUrls: ['./appraisal-cycle-list.component.css']
})
export class AppraisalCycleListComponent {
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
  isShowScreenMenu:any = true;
  rolesView:any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private appcycleSer: AppraisalCycleService,
    private cd :ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAlladvancePaymentDetail(this.filterText, this.page, this.itemsPerPage)
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
    this.advancePaymentDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
  }

  particularcheck(event: any, index: any) {
    this.advancePaymentDetail[index].check = event.target.checked
    const findSelect = this.advancePaymentDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  async getAlladvancePaymentDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.appcycleSer.getAllAppraisalCycleDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.advancePaymentDetail = result.data
        this.alladvancePaymentDetail = result.data
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
          data.isActive = data.isActive === 'O' ? 'C' : 'O'
          data.disable = true
          const result: any = await this.appcycleSer.updateAppraisalCycleDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlladvancePaymentDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
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
      ((obj.appraisalName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.advancePaymentDetail = this.alladvancePaymentDetail.filter((obj: any) =>
      ((obj.appraisalName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))

  }


  handleDate(event: any) {
    this.selectedDate = event.target.value;
    this.filterData();
  }



  async handleDeleteMuliple() {
    // try {
    //   const filterData = this.advancePaymentDetail.filter((el: any) => el.check === true)
    //   filterData.map((el: any) => {
    //     el.isActive = "C"
    //   })
    //   const result: any = await this.advancePaySer.updatedManyadvancePaymentDetails(filterData);
    //   if (result.status === true) {
    //     this._snackBar.open("Deleted Successfully", '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-success',
    //     });
    //     this.getAlladvancePaymentDetail(this.page, this.itemsPerPage)
    //     return;
    //   }
    //   if (result.status === '0') {
    //     this._snackBar.open("Deleted Unsuccessfully", '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-error',
    //     });
    //   }

    // } catch (error: any) {
    //   console.error(error)
    //   this._snackBar.open('Something went wrong', '', {
    //     duration: 5 * 1000, horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     panelClass: 'app-notification-error',
    //   });
    // }


  }
}
