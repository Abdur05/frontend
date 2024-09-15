import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JobService } from '../../../services/jobs/-job.service';
import { CandidateService } from '../../../services/candidate/candidate.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ViewCandidateComponent } from '../view-candidate/view-candidate.component';
import { UpdateStatusCandidateComponent } from '../update-status-candidate/update-status-candidate.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-cadidate-list',
  templateUrl: './cadidate-list.component.html',
  styleUrls: ['./cadidate-list.component.css']
})
export class CadidateListComponent implements OnInit {
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
    type: 'can'

  };
  isShowScreenMenu: any = true;
  rolesView: any = '';
  currentPage: any = 1;
  totalItem: any = 0;
  isLoader: any = false;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private jobSer: JobService,
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
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  handleFilterDetails() {
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }

  handleFilterList(event: any) {
    this.filterText.status = event.target.value
  }

  async getAllJobDetailPage(filter: any, skip: any, itemPerPage: any) {
    try {
      this.isLoader = false;
      const result: any = await this.candidateSer.getAllcandidateDetailPage(filter, skip, itemPerPage)
      if (result.status) {
        this.isLoader = true;
        this.candidateDetail = result.data.data
        this.allcandidateDetail = result.data.data
        this.totalItem = result.data.totalRecords

      }
      this.isLoader = false;
    } catch (error: any) {
      this.isLoader = false;
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
    //   ((obj.candidateId.toUpperCase()).includes(filterValue) || (obj.firstName.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.candidateDetail = this.allcandidateDetail.filter((obj: any) =>
      ((obj.candidateId.toUpperCase()).includes(filterValue) || (obj.firstName.toUpperCase()).includes(filterValue)))

  }


  openDialog(id: any) {
    console.log(this.candidateDetail);

    const dialogRef = this.dialog.open(ViewCandidateComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
      }
    });
  }


  openDialog1(id: any) {
    console.log(this.candidateDetail.value);

    const dialogRef = this.dialog.open(UpdateStatusCandidateComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemPerPage;
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }


}
