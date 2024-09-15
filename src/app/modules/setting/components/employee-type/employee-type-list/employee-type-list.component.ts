import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmployeeTypeService } from '../../../services/employee-type/employee-type.service';

@Component({
  selector: 'app-employee-type-list',
  templateUrl: './employee-type-list.component.html',
  styleUrls: ['./employee-type-list.component.css']
})
export class EmployeeTypeListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  employeeTypeDetail: any = []
  selectAll: any = false
  allemployeeTypeDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = false;

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private employeeTypeSer: EmployeeTypeService,
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
    this.getAllemployeeTypeDetail()
  }


  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAllemployeeTypeDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllemployeeTypeDetail() {
    try {
      const result: any = await this.employeeTypeSer.getAllEmployeeTypeDetail()
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.employeeTypeDetail = result.data
        this.allemployeeTypeDetail = result.data
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
      // Swal.fire({
      //   title: "Are you sure?",
      //   text: "Do you really want to" + " " + (data.isActive === 'O' ? 'Inactive' : 'Active') + " this record?",
      //   icon: "error",
      //   showCancelButton: true,
      //   confirmButtonColor: "#d33",
      //   cancelButtonColor: "#3085d6",
      //   confirmButtonText: "Yes",
      //   cancelButtonText: 'No'
      // }).then(async (result) => {
      //   if (result.isConfirmed) {
      //     data.isActive = data.isActive === 'O' ? 'C' : 'O'
      //     data.disable = true
      //     const result: any = await this.reasonSer.updatereason(data);
      //     if (result.status === '1') {
      //       this._snackBar.open("Updated Successfully", '', {
      //         duration: 5 * 1000, horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //         panelClass: 'app-notification-success',
      //       });
      //       this.getAllemployeeTypeDetail(this.filterText, this.records, this.itemsPerPage)
      //       return;
      //     }
      //     if (result.status === '0') {
      //       this.getAllemployeeTypeDetail(this.filterText, this.records, this.itemsPerPage)
      //       this._snackBar.open(result.message, '', {
      //         duration: 5 * 1000, horizontalPosition: 'center',
      //         verticalPosition: 'top',
      //         panelClass: 'app-notification-error',
      //       });
      //     }
      //   } else {
      //     this.getAllemployeeTypeDetail(this.filterText, this.records, this.itemsPerPage)
      //   }
      // });


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
      this.employeeTypeDetail = this.allemployeeTypeDetail;
      return;
    }

    this.employeeTypeDetail = this.allemployeeTypeDetail.filter((obj: any) =>
      ((obj.employeeType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.employeeTypeDetail = this.allemployeeTypeDetail.filter((obj: any) =>
      ((obj.employeeType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }

}
