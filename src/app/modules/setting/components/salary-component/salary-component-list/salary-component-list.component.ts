import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SalaryComponentService } from '../../../services/salary-component/salary-component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-component-list',
  templateUrl: './salary-component-list.component.html',
  styleUrls: ['./salary-component-list.component.css']
})
export class SalaryComponentListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef


  isShowPadding: any = false
  salaryCompDetail: any = []
  selectAll: any = false
  allsalaryCompDetail: any = []
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private salaryComponetSer: SalaryComponentService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllsalaryCompDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllsalaryCompDetail() {
    try {
      const result: any = await this.salaryComponetSer.getAllSalaryComponent()
      if (result.status === true) {

        this.salaryCompDetail = result.data
        this.allsalaryCompDetail = result.data

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
          const result: any = await this.salaryComponetSer.deleteSalaryComponent(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllsalaryCompDetail()
            return;
          }
          if (result.status === false) {
            this.getAllsalaryCompDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllsalaryCompDetail()
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
      this.salaryCompDetail = this.allsalaryCompDetail;
      return;
    }

    this.salaryCompDetail = this.allsalaryCompDetail.filter((obj: any) =>
      ((obj.component_name.toUpperCase()).includes(filterValue) || (obj.component_type.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.salaryCompDetail = this.allsalaryCompDetail.filter((obj: any) =>
      ((obj.component_name.toUpperCase()).includes(filterValue) || (obj.component_type.toUpperCase()).includes(filterValue)))

  }

}
