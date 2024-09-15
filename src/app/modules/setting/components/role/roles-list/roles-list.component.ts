import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;



  isShowPadding: any = false
  roleDetail: any = []
  selectAll: any = false
  allroleDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu:any = true;
  rolesView:any = true;
  
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private roleSer: RoleService,
    private cd:ChangeDetectorRef
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
    this.getAllRolesDetails(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.roleDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.roleDetail[index].check = event.target.checked
    const findSelect = this.roleDetail.find((el: any) => el.check === false)

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
    this.getAllRolesDetails(this.filterText, this.records, this.itemsPerPage)
  }


  async getAllRolesDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.roleSer.getAllRolesAccessDetails(page, itemsPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.roleDetail = result.data
        this.allroleDetail = result.data
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
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to ${data.isActive === 'O' ? 'Deactivate' : 'Activate'} this record?`,
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
          const result: any = await this.roleSer.updateroles(data);
  
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
  
          this.getAllRolesDetails(this.filterText, this.records, this.itemsPerPage);
        } catch (error: any) {
          this.getAllRolesDetails(this.filterText, this.records, this.itemsPerPage);
          this._snackBar.open(error.error.message || 'Something went wrong', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-error',
          });
        }
      } else {
        this.getAllRolesDetails(this.filterText, this.records, this.itemsPerPage);
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
      this.roleDetail = this.allroleDetail;
      return;
    }

    this.roleDetail = this.allroleDetail.filter((obj: any) =>
      ((obj.roleId.toUpperCase()).includes(filterValue) || (obj.roleName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.roleDetail = this.allroleDetail.filter((obj: any) =>
      ((obj.roleId.toUpperCase()).includes(filterValue) || (obj.roleName.toUpperCase()).includes(filterValue)))

  }
  async handleDeleteMuliple() {
    try {
      const filterData = this.roleDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.roleSer.updaterolesDetailMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllRolesDetails(this.filterText, this.records, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

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
