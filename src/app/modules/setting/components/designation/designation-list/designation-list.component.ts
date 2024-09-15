import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DesignationService } from '../../../services/designation/designation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.css']
})
export class DesignationListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;



  isShowPadding: any = false
  designationDetail: any = []
  selectAll: any = false
  alldesignationDetail: any = []
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
    private designationSer: DesignationService,
    private cd: ChangeDetectorRef
  ) { }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDepartmentDetail(this.filterText, this.page, this.itemsPerPage)
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
    this.designationDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.designationDetail[index].check = event.target.checked
    const findSelect = this.designationDetail.find((el: any) => el.check === false)

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
    this.getAllDepartmentDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllDepartmentDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.designationSer.getAllDesignationDetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.designationDetail = result.data
        this.alldesignationDetail = result.data
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
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to ${data.isActive === 'O' ? 'Inactive' : 'Active'} this record?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      });
  
      if (confirmation.isConfirmed) {
        data.isActive = data.isActive === 'O' ? 'C' : 'O';
        data.disable = true;
  
        try {
          const result: any = await this.designationSer.updateDesignation(data);
  
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
          } else {
            this._snackBar.open(result.message, '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
  
          this.getAllDepartmentDetail(this.filterText, this.records, this.itemsPerPage);
        } catch (error: any) {
          this.getAllDepartmentDetail(this.filterText, this.records, this.itemsPerPage);
          this._snackBar.open(error.error.message || 'Something went wrong', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
        }
      } else {
        this.getAllDepartmentDetail(this.filterText, this.records, this.itemsPerPage);
      }
    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }  

  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.designationDetail = this.alldesignationDetail;
      return;
    }

    this.designationDetail = this.alldesignationDetail.filter((obj: any) =>
      ((obj.designationName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.designationDetail = this.alldesignationDetail.filter((obj: any) =>
      ((obj.designationName.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }
  // async handleDeleteMuliple() {
  //   try {
  //     const filterData = this.designationDetail.filter((el: any) => el.check === true)
  //     filterData.map((el: any) => {
  //       el.isActive = "C"
  //     })
  //     const result: any = await this.designationSer.updatedesignationDetailMany(filterData);
  //     if (result.status === '1') {
  //       this._snackBar.open("Deleted Successfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllDepartmentDetail(this.page, this.itemsPerPage)
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
