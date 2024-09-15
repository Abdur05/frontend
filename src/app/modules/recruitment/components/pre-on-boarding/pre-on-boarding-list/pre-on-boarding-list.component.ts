import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { VerfiedPerOnBoardingComponent } from '../verfied-per-on-boarding/verfied-per-on-boarding.component';
import { SalaryPreOnBoardingComponent } from '../salary-pre-on-boarding/salary-pre-on-boarding.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-pre-on-boarding-list',
  templateUrl: './pre-on-boarding-list.component.html',
  styleUrls: ['./pre-on-boarding-list.component.css']
})
export class PreOnBoardingListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  selectAll: any = false
  candidateDetail: any = []
  allcandidateDetail: any = []
  page?: number = 0
  itemPerPage = 10
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    candiateText: '',
    status: '',
    type: 'pre'
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';
  currentPage: any = 1;
  totalItem: any = 0;
  isLoader: any = false;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private candidateSer: CandidateService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllJobDetailPage(this.filterText, this.page, this.itemPerPage)
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
    this.candidateDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.candidateDetail[index].check = event.target.checked
    const findSelect = this.candidateDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }


  handleFilterList(event: any) {
    this.filterText.status = event.target.value
  }

  handleFilterDetails() {
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }

  async getAllJobDetailPage(filter: any, page: any, itemPerPage: any) {
    try {
      this.isLoader = true;
      const result: any = await this.candidateSer.getAllcandidateDetailPage(filter, page, itemPerPage)
      if (result.status) {
        this.isLoader = false;
        this.candidateDetail = result.data.data.filter((el: any) => el.status === 'Selected' || el.status === 'Offer Released' || el.status === 'Accepted')

        this.allcandidateDetail = result.data.data;
        this.totalItem = result.data.totalRecords


      }
      this.isLoader = false;

    } catch (error: any) {
      this.isLoader = false;

      this._snackBar.open(error?.error?.message, '', {
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
          const result: any = await this.candidateSer.updatcandidateDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
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
    this.filterText.candiateText = event.target.value;
    // const filterValue = event.target.value.toUpperCase();
    // if (!filterValue) {
    //   this.candidateDetail = this.allcandidateDetail;
    //   return;
    // }

    // this.candidateDetail = this.allcandidateDetail.filter((obj: any) =>
    //   ((obj.candidateId.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.candidateDetail = this.allcandidateDetail.filter((obj: any) =>
      ((obj.candidateId.toUpperCase()).includes(filterValue)))

  }


  handleUpdate(id: any) {
    const dialogRef = this.dialog.open(VerfiedPerOnBoardingComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getAllJobDetailPage(this.filterText, this.page, this.itemPerPage)
      }
    });
  }


  handleSalaryUpdate(id: any) {
    const dialogRef = this.dialog.open(SalaryPreOnBoardingComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.getAllJobDetailPage(this.filterText, this.page, this.itemPerPage)
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemPerPage;
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }


}
