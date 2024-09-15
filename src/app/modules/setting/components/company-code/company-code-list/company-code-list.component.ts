import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../services/companyCode/company-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-code-list',
  templateUrl: './company-code-list.component.html',
  styleUrls: ['./company-code-list.component.css']
})
export class CompanyCodeListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  rtoStateDetail: any = []
  selectAll: any = false
  allRtoDetails: any = []
  companyCodeDetails: any = []
  selectedFile: any = '';
  allCompanyDetails: any = []
  totalItem: any = 0;
  records: any = 0
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu:any =  true;
  rolesView:any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private companyCodeSer: CompanyCodeService,
    private cd:ChangeDetectorRef

  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllCompanyCodeDetails(this.filterText, this.page, this.itemsPerPage)
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
    this.rtoStateDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.rtoStateDetail[index].check = event.target.checked
    const findSelect = this.rtoStateDetail.find((el: any) => el.check === false)

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
    this.getAllCompanyCodeDetailsFilter(this.filterText, this.records, this.itemsPerPage)
  }

  //get data into list
  async getAllCompanyCodeDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.companyCodeSer.getAllcompanyCodeDetailsPage(page, itemsPerPage)
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allCompanyDetails = result.data
        this.companyCodeDetails = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllCompanyCodeDetailsFilter(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetailsPageFilter(filter, page, itemsPerPage)
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allCompanyDetails = result.data
        this.companyCodeDetails = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error: any) {
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
          const result: any = await this.companyCodeSer.updateCompanyCodeDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllCompanyCodeDetails(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllCompanyCodeDetails(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllCompanyCodeDetails(this.filterText, this.records, this.itemsPerPage)
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
    if (!filterValue) {
      this.companyCodeDetails = this.allCompanyDetails;
      return;
    }

    this.companyCodeDetails = this.allCompanyDetails.filter((obj: any) =>
      ((obj.companyCode.toUpperCase()).includes(filterValue) || (obj.companyName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.companyCodeDetails = this.allCompanyDetails.filter((obj: any) =>
      ((obj.companyCode.toUpperCase()).includes(filterValue) || (obj.companyName.toUpperCase()).includes(filterValue)))

  }
  // async handleDeleteMuliple() {
  //   try {
  //     const filterData = this.companyCodeDetails.filter((el: any) => el.check === true)
  //     filterData.map((el: any) => {
  //       el.isActive = "C"
  //     })
  //     const result: any = await this.companyCodeSer.updatedManyCompanyCodeDetails(filterData);
  //     if (result.status === '1') {
  //       this._snackBar.open("Deleted Successfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllCompanyCodeDetails(this.page, this.itemsPerPage)
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
