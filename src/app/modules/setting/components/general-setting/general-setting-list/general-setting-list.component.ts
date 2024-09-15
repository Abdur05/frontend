import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralSettingService } from '../../../services/general/general-setting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-setting-list',
  templateUrl: './general-setting-list.component.html',
  styleUrls: ['./general-setting-list.component.css']
})
export class GeneralSettingListComponent {

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
  isShowScreenMenu:any = true;
  rolesView:any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private generalSettingSer: GeneralSettingService,
    private cd:ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllReasonDetail(this.filterText, this.page, this.itemsPerPage)
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
    this.getAllReasonDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllReasonDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.generalSettingSer.getAllgeneralSettingDetailsPage(page, itemsPerPage)
      console.log(result);

      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.reasonDetail = result.data
        this.allreasondetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error:any) {

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
          const result: any = await this.generalSettingSer.updategeneralSetting(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllReasonDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllReasonDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllReasonDetail(this.filterText, this.records, this.itemsPerPage)
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
      this.reasonDetail = this.allreasondetail;
      return;
    }

    this.reasonDetail = this.allreasondetail.filter((obj: any) =>
      ((obj.reasonId.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.reasonDetail = this.allreasondetail.filter((obj: any) =>
      ((obj.reasonId.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

  // async handleDeleteMuliple() {
  //   try {
  //     const filterData = this.reasonDetail.filter((el: any) => el.check === true)
  //     filterData.map((el: any) => {
  //       el.isActive = "C"
  //     })
  //     const result: any = await this.reasonSer.updatereasonDetailMany(filterData);
  //     if (result.status === '1') {
  //       this._snackBar.open("Deleted Successfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllReasonDetail(this.page, this.itemsPerPage)
  //       return;
  //     }
  //     if (result.status === '0') {
  //       this._snackBar.open("Deleted Unsuccessfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-error',
  //       });
  //     }

  //   } catch (error: any) {
  //     console.error(error)
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }


  // }

}
