import { ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';
import { OnBoardingProfileDetailsComponent } from '../on-boarding-profile-details/on-boarding-profile-details.component';

@Component({
  selector: 'app-on-boarding-list',
  templateUrl: './on-boarding-list.component.html',
  styleUrls: ['./on-boarding-list.component.css']
})
export class OnBoardingListComponent {

  // @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  selectAll: any = false
  candidateDetail: any = []
  allcandidateDetail: any = []
  page?: number = 0
  itemPerPage = 10
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: true,
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';
  currentPage: any = 1;
  totalItem: any = 0;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private candidateSer: CandidateService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private preOnboardSer: PreOnboardingService
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





  // handleFilterList(event: any) {
  //   this.filterText.active = event.target.value
  // }

  // handleFilterDetails() {
  //   this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  // }

  async getAllJobDetailPage(filterText: any, page: any, itemPerPage: any) {
    try {
      const result: any = await this.candidateSer.getAllcandidateSelectedDetails(filterText, page, itemPerPage)
      if (result) {

        this.candidateDetail = result.data.data

        this.allcandidateDetail = result.data.data
        this.totalItem = result.data.totalRecords

      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemPerPage;
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)
  }


  handleFilter(event: any) {
    this.filterText.text = event.target.value;
    this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)

  }


  async onBoarding(list: any, status: any) {
    if (status === 'A') {
      const dialogRef = this.dialog.open(OnBoardingProfileDetailsComponent, {
        position: { top: '0px' },
        data: { employeeDetails: list, status: status },
        height: '400px'
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.getAllJobDetailPage(this.filterText, this.page, this.itemPerPage)
        }
      });
      return
    }
    try {
      const result: any = await this.preOnboardSer.createEmployeeDetailsbyCandiate('',list.candidateId, status);
      if (result.status) {
        this.getAllJobDetailPage(this.filterText, this.records, this.itemPerPage)

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });

      }
    } catch (error: any) {
      console.error(error);
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
