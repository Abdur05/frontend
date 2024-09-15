import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobService } from '../../../services/jobs/-job.service';
import Swal from 'sweetalert2';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { MatDialog } from '@angular/material/dialog';
import { ViewJobComponent } from '../view-job/view-job.component';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  jobDetail: any = []
  alljobDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: '',
    jobStatus: 'open'
  };
  filteredJobDetail: any = [];
  isShowScreenMenu: any = true;
  rolesView: any = '';
  roleId: any = '';
  totalItem: any = 0;
  currentPage: any = 1;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private jobSer: JobService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.roleId = localStorage.getItem('roleId')
  }

  currentDate = new Date();

  isExpiryDateGreaterThanCurrentDate(expiryDate: string): boolean {
    return new Date(expiryDate) > this.currentDate;
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  filterJobsByExpiry() {

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const fullDate: any = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;
    console.log(fullDate);

    const jobsWithId = this.jobDetail.filter((job: any) => {
      return job._id != null && job._id !== undefined;
    });
    this.filteredJobDetail = jobsWithId.filter((job: any) => {
      const expiryDate = new Date(job.expirayDate);
      return expiryDate >= currentDate;
    });

    // console.log('Filtered Jobs:', this.filteredJobDetail);



  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllJobDetailPage(this.filterText, this.page, this.itemsPerPage)
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemsPerPage;
    this.getAllJobDetailPage(this.filterText, this.records, this.itemsPerPage)
  }



  handleFilterList(event: any) {
    this.filterText.jobStatus = event.target.value
  }

  handleFilterDetails() {
    this.getAllJobDetailPage(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllJobDetailPage(filter: any, page: any, itemPerPage: any) {
    try {
      const result: any = await this.jobSer.getAllJobDetailsPageFilter1(filter, page, itemPerPage)
      if (result.status) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.jobDetail = result.data
        this.alljobDetail = result.data
        this.filterJobsByExpiry()

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
          const result: any = await this.jobSer.updatJobDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllJobDetailPage(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllJobDetailPage(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllJobDetailPage(this.filterText, this.records, this.itemsPerPage)
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
      this.jobDetail = this.alljobDetail;
      return;
    }

    this.jobDetail = this.alljobDetail.filter((obj: any) =>
      ((obj.jobName.toUpperCase()).includes(filterValue) || (obj.experience.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.jobDetail = this.alljobDetail.filter((obj: any) =>
      ((obj.jobName.toUpperCase()).includes(filterValue) || (obj.experience.toUpperCase()).includes(filterValue)))

  }

  edit(object: any) {
    console.log((object.jobStatus === 'hold' || object.jobStatus === 'close') && (this.roleId !== 'HR' && this.roleId !== 'Admin' && this.roleId !== 'CEO'), this.roleId)
    if (object.jobStatus === 'hold' && (this.roleId !== 'HR' && this.roleId !== 'Admin' && this.roleId !== 'CEO')) {
      return
    }
    this.router.navigate([`/recruitment/edit-job/${object._id}`])
  }


  viewJobDetails(data: any) {
    const dialogRef = this.dialog.open(ViewJobComponent, {
      data: data._id,
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
     
    });
  }


}
