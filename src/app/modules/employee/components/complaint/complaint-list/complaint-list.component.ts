import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ComplaintService } from '../../../services/complaint/complaint.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.css']
})
export class ComplaintListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  complaintDetails: any = []
  selectAll: any = false
  allcomplaintDetails: any = []
  page?: number = 0;
  itemPerPage = 10;
  selectedDate: String = ''
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  rolesDetails: any = [];
  rolesView: any = [];
  isShowScreenMenu: any = true;
  employeeId:any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private complaintSer: ComplaintService,
    private cd: ChangeDetectorRef
  ) {
    var rolesLists: any = localStorage.getItem('roles');
    rolesLists = JSON.parse(rolesLists);
    var roleId: any = localStorage.getItem('roleId')
    this.employeeId = localStorage.getItem('userName')
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllcomplaintDetails(this.filterText, this.page, this.itemPerPage)
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
    this.complaintDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.complaintDetails[index].check = event.target.checked
    const findSelect = this.complaintDetails.find((el: any) => el.check === false)

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
    this.getAllcomplaintDetails(this.filterText, this.records, this.itemPerPage)
  }


  async getAllcomplaintDetails(filter: any, page: any, itemPerPage: any) {
    try {
      const result: any = await this.complaintSer.getAllComplaintDetailsPageFilter(filter, page, itemPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.complaintDetails = result.data
        this.allcomplaintDetails = result.data
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
          const result: any = await this.complaintSer.updatComplaintDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllcomplaintDetails(this.filterText, this.records, this.itemPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllcomplaintDetails(this.filterText, this.records, this.itemPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllcomplaintDetails(this.filterText, this.records, this.itemPerPage)
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
    this.applyFilters(filterValue, this.selectedDate);
  }

  handleDate(event: any) {
    this.selectedDate = event.target.value;
    this.applyFilters(this.searchInput.nativeElement.value.toUpperCase(), this.selectedDate);
  }

  applyFilters(filterValue: any, selectedDate: any) {
    if (!filterValue && !selectedDate) {
      this.complaintDetails = this.allcomplaintDetails;
      return;
    }

    this.complaintDetails = this.allcomplaintDetails.filter((obj: any) =>
      (obj.complaintName.toUpperCase().includes(filterValue) ||
        obj.employeeId.toUpperCase().includes(filterValue) ||
        obj.complaintAgainst.toUpperCase().includes(filterValue)) &&
      (!selectedDate || obj.complaintDate === selectedDate)
    );
  }

  // async handleDeleteMuliple() {
  //   try {
  //     const filterData = this.complaintDetails.filter((el: any) => el.check === true)
  //     filterData.map((el: any) => {
  //       el.isActive = "C"
  //     })
  //     const result: any = await this.complaintSer.updatedManyComplaintDetails(filterData);
  //     if (result.status === '1') {
  //       this._snackBar.open("Deleted Successfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-success',
  //       });
  //       this.getAllcomplaintDetails(this.page, this.itemPerPage)
  //       return;
  //     }
  //     if (result.status === '0') {
  //       this._snackBar.open("Deleted Unsuccessfully", '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-error',
  //       });
  //     }

  //   } catch (error: any) {
  //     console.error(error)
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }


  // }


}
