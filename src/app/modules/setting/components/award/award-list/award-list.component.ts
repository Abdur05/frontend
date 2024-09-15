import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AwardService } from '../../../services/award/award.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.css']
})
export class AwardListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  awardDetail: any = []
  isShowScreenMenu: any = true;
  rolesView: any = false;
  allawardDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  records: any = 0

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private awardSer: AwardService
  ) { }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllAwardDetail(this.page, this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllAwardDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.awardSer.getAllAwardMasterDetail(page, itemsPerPage)
      if (result.status === true) {
        this.awardDetail = result.data
        this.allawardDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

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
          const result: any = await this.awardSer.deleteAwardMasterDetail(data);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllAwardDetail(this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllAwardDetail(this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllAwardDetail(this.records, this.itemsPerPage)
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
      this.awardDetail = this.allawardDetail;
      return;
    }

    this.awardDetail = this.allawardDetail.filter((obj: any) =>
      ((obj.awardName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.awardDetail = this.allawardDetail.filter((obj: any) =>
      ((obj.awardName.toUpperCase()).includes(filterValue)))

  }

}
