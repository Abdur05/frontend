import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SalaryTemplateService } from '../../../services/salary-template/salary-template.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salary-template-list',
  templateUrl: './salary-template-list.component.html',
  styleUrls: ['./salary-template-list.component.css']
})
export class SalaryTemplateListComponent implements OnInit{
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  selectAll: any = false
  salaryTempDetail: any = []
  allsalaryTempDetail: any = []
  page?: number = 0
  itemPerPage = 10
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private salaryTempSer: SalaryTemplateService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    this.selectAll = event.target.checked;
    this.salaryTempDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.salaryTempDetail[index].check = event.target.checked
    const findSelect = this.salaryTempDetail.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  ngOnInit(): void {
    this.getAllSalaryDetail(this.filterText, this.page, this.itemPerPage)
  }

  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    this.getAllSalaryDetail(this.filterText, this.records, this.itemPerPage)
  }

  async getAllSalaryDetail(filter: any, page: any, itemPerPage: any) {
    try {
      const result: any = await this.salaryTempSer.getAllSalaryTemplateDetailsPageFilter(filter, page, itemPerPage)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.salaryTempDetail = result.data
        this.allsalaryTempDetail = result.data
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
          const result: any = await this.salaryTempSer.updatesalaryTemplateDetail(data);
          if (result.status === '1') {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllSalaryDetail(this.filterText, this.records, this.itemPerPage)
            return;
          }
          if (result.status === '0') {
            this.getAllSalaryDetail(this.filterText, this.records, this.itemPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllSalaryDetail(this.filterText, this.records, this.itemPerPage)
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
      this.salaryTempDetail = this.allsalaryTempDetail;
      return;
    }

    this.salaryTempDetail = this.allsalaryTempDetail.filter((obj: any) =>
      ((obj.templateID.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.salaryTempDetail = this.allsalaryTempDetail.filter((obj: any) =>
      ((obj.templateID.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)))

  }



  async handleDeleteMuliple() {
    try {
      const filterData = this.salaryTempDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.salaryTempSer.updatesalaryTemplateDetailMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllSalaryDetail(this.filterText, this.page, this.itemPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }


  }

}
