import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobService } from '../../../services/jobs/-job.service';

@Component({
  selector: 'app-apply-job-list',
  templateUrl: './apply-job-list.component.html',
  styleUrls: ['./apply-job-list.component.css']
})
export class ApplyJobListComponent implements OnInit {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  selectAll: any = false
  jobDetail: any = []
  alljobDetail: any = []
  selectedFilter: any = 'O'
  records: any = 0
  page?: number = 0;
  itemPerPage = 10;
  filteredJobDetail: any = [];

  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = ''

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private jobSer: JobService,
    private cd: ChangeDetectorRef,
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    this.selectAll = event.target.checked;
    this.jobDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }
  particularcheck(event: any, index: any) {
    this.jobDetail[index].check = event.target.checked
    const findSelect = this.jobDetail.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
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

    console.log('Filtered Jobs:', this.filteredJobDetail);



  }



  ngOnInit(): void {
    this.getAllJobDetail()
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllJobDetail()
  }

  async getAllJobDetail() {
    try {
      const result: any = await this.jobSer.getAllJobDetail()
      console.log(result.data[0])
      if (result.status) {
        this.jobDetail = result.data
        this.alljobDetail = result.data
        // this.filterJobsByExpiry()
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.jobDetail = this.alljobDetail;
      return;
    }

    this.jobDetail = this.alljobDetail.filter((obj: any) =>
      ((obj.jobName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.jobDetail = this.alljobDetail.filter((obj: any) =>
      ((obj.jobName.toUpperCase()).includes(filterValue)))

  }

  handleCandite(id:any){
    this.jobSer.dataTransfer.next({id:id})
    localStorage.setItem('subMenu', 'Candidate')
    this.router.navigate([`/recruitment/add-candidate`])
  }

}
