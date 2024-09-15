import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyCalenderService } from '../../../services/company-calender/company-calender.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-calendar-list',
  templateUrl: './company-calendar-list.component.html',
  styleUrls: ['./company-calendar-list.component.css']
})
export class CompanyCalendarListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef


  isShowPadding: any = false
  eventTypeDetail: any = []
  selectAll: any = false
  alleventTypeDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  years: number[] = [];


  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private companyCalenderSer: CompanyCalenderService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAlleventTypeDetail()
    this.generateYears()
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    const futureYearsCount = 15; // Change this to the number of future years you want
    for (let i = 0; i <= futureYearsCount; i++) {
      this.years.push(currentYear + i);
    }
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAlleventTypeDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAlleventTypeDetail() {
    try {
      const date = new Date()
      const year = date.getFullYear();
      const result: any = await this.companyCalenderSer.getAllCompanyCalenderDetail(year)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.eventTypeDetail = result.data
        this.alleventTypeDetail = result.data
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
          const result: any = await this.companyCalenderSer.deleteCompanyCalenderDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlleventTypeDetail()
            return;
          }
          if (result.status === '0') {
            this.getAlleventTypeDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlleventTypeDetail()
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
      this.eventTypeDetail = this.alleventTypeDetail;
      return;
    }

    this.eventTypeDetail = this.alleventTypeDetail.filter((obj: any) =>
      ((obj.eventType.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.eventTypeDetail = this.alleventTypeDetail.filter((obj: any) =>
      ((obj.eventType.toUpperCase()).includes(filterValue)))

  }

}
