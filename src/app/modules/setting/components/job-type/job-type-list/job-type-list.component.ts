import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobTypeService } from '../../../services/job-type/job-type.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ViewJobTypeComponent } from '../view-job-type/view-job-type.component';

@Component({
  selector: 'app-job-type-list',
  templateUrl: './job-type-list.component.html',
  styleUrls: ['./job-type-list.component.css']
})
export class JobTypeListComponent {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  jobTypeDetail: any = []
  selectAll: any = false
  alljobTypeDetail: any = []
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
    private jobTypeSer: JobTypeService,
    private cd : ChangeDetectorRef,
    private dialog:MatDialog
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAlljobTypeDetail()
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAlljobTypeDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAlljobTypeDetail() {
    try {
      const result: any = await this.jobTypeSer.getAllJobTypeDetail()
      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.jobTypeDetail = result.data
        this.alljobTypeDetail = result.data
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
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to" + " " + (data.isActive === 'true' ? 'Inactive' : 'Active') + " this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.isActive = data.isActive === 'true' ? 'false' : 'true'
          data.disable = true
          const result: any = await this.jobTypeSer.deleteJobTypeDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlljobTypeDetail()
            return;
          }
          if (result.status === false) {
            this.getAlljobTypeDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlljobTypeDetail()
        }
      });
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.jobTypeDetail = this.alljobTypeDetail;
      return;
    }

    this.jobTypeDetail = this.alljobTypeDetail.filter((obj: any) =>
      ((obj.jobType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.jobTypeDetail = this.alljobTypeDetail.filter((obj: any) =>
      ((obj.jobType.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }


  viewJobDetails(data: any) {
    const dialogRef = this.dialog.open(ViewJobTypeComponent, {
      data: data._id,
      width:'500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
     
    });
  }

}
