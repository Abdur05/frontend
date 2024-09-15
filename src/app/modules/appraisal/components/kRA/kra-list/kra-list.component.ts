import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { KraService } from '../../../services/kra/kra.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kra-list',
  templateUrl: './kra-list.component.html',
  styleUrls: ['./kra-list.component.css']
})
export class KRAListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;


  isShowPadding: any = false
  kraDetails: any = []
  selectAll: any = false
  allkraDetails: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedDate: String = ''
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
    private kraSer: KraService,
    private cd:ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllkraDetails(this.filterText, this.page, this.itemsPerPage)
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.kraDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }


  particularcheck(event: any, index: any) {
    this.kraDetails[index].check = event.target.checked
    const findSelect = this.kraDetails.find((el: any) => el.check === false)

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
    this.getAllkraDetailsFilter(this.filterText, this.records, this.itemsPerPage)
  }

  async getAllkraDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.kraSer.getAllKRADetailPage(page, itemsPerPage)
      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.kraDetails = result.data
        this.allkraDetails = result.data
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


  async getAllkraDetailsFilter(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.kraSer.getAllKRADetailsPageFilter(filter, page, itemsPerPage)
      if (result.status === true) {
        result.data.map((el: any) => {
          el.check = false
        })
        this.kraDetails = result.data
        this.allkraDetails = result.data
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
          // data.isActive = data.isActive === 'O' ? 'C' : 'O'
          // data.disable = true
          const result: any = await this.kraSer.updateKRADetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllkraDetails(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllkraDetails(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllkraDetails(this.filterText, this.records, this.itemsPerPage)
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
    if (!filterValue && !this.selectedDate) {
      this.kraDetails = this.allkraDetails;
      return;
    }

    this.kraDetails = this.allkraDetails.filter((obj: any) =>
      ((obj.KRA_name.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.kraDetails = this.allkraDetails.filter((obj: any) =>
      ((obj.KRA_name.toUpperCase()).includes(filterValue) || (obj.description.toUpperCase()).includes(filterValue)) && (!this.selectedDate || obj.payment_date.toLowerCase() === this.selectedDate.toLowerCase()))

  }


  handleDate(event: any) {
    this.selectedDate = event.target.value;
    this.filterData();
  }



  async handleDeleteMuliple() {
    // try {
    //   const filterData = this.kraDetails.filter((el: any) => el.check === true)
    //   filterData.map((el: any) => {
    //     el.isActive = "C"
    //   })
    //   const result: any = await this.advancePaySer.updatedManykraDetailss(filterData);
    //   if (result.status === '1') {
    //     this._snackBar.open("Deleted Successfully", '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-success',
    //     });
    //     this.getAllkraDetails(this.page, this.itemsPerPage)
    //     return;
    //   }
    //   if (result.status === '0') {
    //     this._snackBar.open("Deleted Unsuccessfully", '', {
    //       duration: 5 * 1000, horizontalPosition: 'center',
    //       verticalPosition: 'top',
    //       panelClass: 'app-notification-error',
    //     });
    //   }

    // } catch (error: any) {
    //   console.error(error)
    //   this._snackBar.open('Something went wrong', '', {
    //     duration: 5 * 1000, horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     panelClass: 'app-notification-error',
    //   });
    // }


  }

}
