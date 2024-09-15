import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AssetService } from '../../../services/asset/asset.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  assetDetails: any = []
  selectAll: any = false
  allassetDetails: any = []
  page?: number = 0;
  itemsPerPage = 10;
  assetMaintananceDetail: any = []
  selectedStatus: String = ''
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  employeeId: any = 0
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private assetAllocateSer: AssetService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllassetDetails(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.assetDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  particularcheck(event: any, index: any) {
    this.assetDetails[index].check = event.target.checked
    const findSelect = this.assetDetails.find((el: any) => el.check === false)

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
    this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllassetDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.assetAllocateSer.getAllassetAllocationDetailsPage(page, itemsPerPage)
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.assetDetails = result.data
        this.allassetDetails = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  //release reccord

  async releaseRocord(data: any) {
    try {

      Swal.fire({
        title: "Are you sure?",
        // text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
        text: "Do you really want to release this asset?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = false
          data.isAvailable = 'Y'
          const result: any = await this.assetAllocateSer.updateassetReleaseDetail(data);
          if (result.status === true) {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
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
          const result: any = await this.assetAllocateSer.updateassetAllocation(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
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
    if (!filterValue && !this.selectedStatus) {
      this.assetDetails = this.allassetDetails;
      return;
    }

    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.assetId.toUpperCase()).includes(filterValue) || (obj.assetType.toUpperCase()).includes(filterValue) || (obj.employeeId.toUpperCase()).includes(filterValue) && (!this.selectedStatus || obj.isAvailable.toLowerCase() === this.selectedStatus.toLowerCase())))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.assetId.toUpperCase()).includes(filterValue) || (obj.assetType.toUpperCase()).includes(filterValue) || (obj.employeeId.toUpperCase()).includes(filterValue) && (!this.selectedStatus || obj.isAvailable.toLowerCase() === this.selectedStatus.toLowerCase())))

  }
  handleStatus(event: any) {
    this.selectedStatus = event.target.value;
    this.filterData();
  }



}
