import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmailNotificationService } from '../../../services/email-notificcation/email-notification.service';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';

@Component({
  selector: 'app-email-notification-list',
  templateUrl: './email-notification-list.component.html',
  styleUrls: ['./email-notification-list.component.css']
})
export class EmailNotificationListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  reasonDetail: any = []
  selectAll: any = false
  allreasondetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  selectedScreen: String = ''
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private emailSer: EmailNotificationService,
    private authrSer: AuthrService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllEmailDetail(this.filterText, this.page, this.itemsPerPage)
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
    this.reasonDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.reasonDetail[index].check = event.target.checked
    const findSelect = this.reasonDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllEmailDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllEmailDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.emailSer.getAllemailNotificationDetailsPage(page, itemsPerPage)
      console.log(result);

      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.reasonDetail = result.data
        this.allreasondetail = result.data
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
          //data.isActive = data.isActive === 'O' ? 'C' : 'O'
          //data.disable = true
          // const result: any = await this.reasonSer.updatereason(data);
          // if (result.status === '1') {
          //   this._snackBar.open("Updated Successfully", '', {
          //     duration: 5 * 1000, horizontalPosition: 'center',
          //     verticalPosition: 'top',
          //     panelClass: 'app-notification-success',
          //   });
          //   this.getAllEmailDetail(this.filterText, this.records, this.itemsPerPage)
          //   return;
          // }
          // if (result.status === '0') {
          //   this.getAllEmailDetail(this.filterText, this.records, this.itemsPerPage)
          //   this._snackBar.open(result.message, '', {
          //     duration: 5 * 1000, horizontalPosition: 'center',
          //     verticalPosition: 'top',
          //     panelClass: 'app-notification-error',
          //   });
          // }
        } else {
          this.getAllEmailDetail(this.filterText, this.records, this.itemsPerPage)
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
  // handleFilter(event: any) {
  //   const filterValue = event.target.value.toUpperCase();
  //   if (!filterValue) {
  //     this.reasonDetail = this.allreasondetail;
  //     return;
  //   }

  //   this.reasonDetail = this.allreasondetail.filter((obj: any) =>
  //     ((obj.notificationId.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  // }
  // filterData() {
  //   const filterValue = this.searchInput.nativeElement.value.toUpperCase();
  //   this.reasonDetail = this.allreasondetail.filter((obj: any) =>
  //     ((obj.notificationId.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  // }

  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    this.applyFilters(filterValue, this.selectedScreen);
  }

  handleDate(event: any) {
    this.selectedScreen = event.target.value;
    this.applyFilters(this.searchInput.nativeElement.value.toUpperCase(), this.selectedScreen);
  }

  applyFilters(filterValue: any, selectedScreen: any) {
    if (!filterValue && !selectedScreen) {
      this.reasonDetail = this.allreasondetail;
      return;
    }

    this.reasonDetail = this.allreasondetail.filter((obj: any) =>
      (obj.notificationId.toUpperCase().includes(filterValue) ||
        obj.description.toUpperCase().includes(filterValue)) &&
      (!selectedScreen || obj.fromScreen === selectedScreen)
    );
  }

  async handleDeleteMuliple() {
    try {
      // const filterData = this.reasonDetail.filter((el: any) => el.check === true)
      // filterData.map((el: any) => {
      //   el.isActive = "C"
      // })
      // const result: any = await this.reasonSer.updatereasonDetailMany(filterData);
      // if (result.status === '1') {
      //   this._snackBar.open("Deleted Successfully", '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-success',
      //   });
      //   this.getAllEmailDetail(this.page, this.itemsPerPage)
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
