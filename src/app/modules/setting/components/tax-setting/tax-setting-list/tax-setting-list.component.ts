import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TaxSettingService } from '../../../services/tax-setting/tax-setting.service';

@Component({
  selector: 'app-tax-setting-list',
  templateUrl: './tax-setting-list.component.html',
  styleUrls: ['./tax-setting-list.component.css']
})
export class TaxSettingListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef

  isShowPadding: any = false
  taxSettingDetail: any = []
  selectAll: any = false
  alltaxSettingDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private taxSettingSer: TaxSettingService,
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
    this.getAlltaxSettingDetail()
  }


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAlltaxSettingDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAlltaxSettingDetail() {
    try {
      const result: any = await this.taxSettingSer.getAllTaxSettingDetail()
      if (result.status === true) {
        this.taxSettingDetail = result.data
        this.alltaxSettingDetail = result.data
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
          const result: any = await this.taxSettingSer.deleteTaxSettingDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlltaxSettingDetail()
            return;
          }
          if (result.status === '0') {
            this.getAlltaxSettingDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlltaxSettingDetail()
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
      this.taxSettingDetail = this.alltaxSettingDetail;
      return;
    }

    this.taxSettingDetail = this.alltaxSettingDetail.filter((obj: any) =>
      ((obj.fiscal_year.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.taxSettingDetail = this.alltaxSettingDetail.filter((obj: any) =>
      ((obj.fiscal_year.toUpperCase()).includes(filterValue)))

  }

}
