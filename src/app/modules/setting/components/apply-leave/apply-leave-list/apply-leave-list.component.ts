import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyLeaveService } from '../../../services/apply-leave/apply-leave.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-leave-list',
  templateUrl: './apply-leave-list.component.html',
  styleUrls: ['./apply-leave-list.component.css']
})
export class ApplyLeaveListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  applyLeaveDetail: any = []
  selectAll: any = false
  page?: number = 0;
  itemsPerPage = 10;
  allapplyLeaveDetail: any = [];
  selectedFilter: any = 'I'
  records: any = 0
  appleLeaveId: any = ''

  filterText: any = {
    status: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';
  employeeId: any = ''

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private applyLeaveSer: ApplyLeaveService,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef

  ) {
    this.employeeId = localStorage.getItem('userName')
  }
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
    this.appleLeaveId = this.activateRouter.snapshot.paramMap.get('id')

    this.getAllapplyLeaveDetail(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.applyLeaveDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.applyLeaveDetail[index].check = event.target.checked
    const findSelect = this.applyLeaveDetail.find((el: any) => el.check === false)

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
    this.getAllapplyLeaveDetailFilter(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllapplyLeaveDetail(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.applyLeaveSer.getManyApplyLeaveDetailPage(page, itemsPerPage)
      console.log(result);

      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.applyLeaveDetail = result.data
        this.allapplyLeaveDetail = result.data
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
  async getAllapplyLeaveDetailFilter(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.applyLeaveSer.getAllApplyLeaveDetailsPageFilter(filter, page, itemsPerPage)
      console.log(result);

      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.applyLeaveDetail = result.data
        this.allapplyLeaveDetail = result.data
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
    // alert('Hi')
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to permanently delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {

          const result: any = await this.applyLeaveSer.deleteHardDeleteApplyLeaveDetail(data._id);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllapplyLeaveDetail(this.filterText, this.records, this.itemsPerPage)
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
      this.applyLeaveDetail = this.allapplyLeaveDetail;
      return;
    }

    this.applyLeaveDetail = this.allapplyLeaveDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.applyLeaveDetail = this.allapplyLeaveDetail.filter((obj: any) =>
      ((obj.employeeId.toUpperCase()).includes(filterValue)))

  }


}
