import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxDeclarationService } from '../../../services/tax-declaration/tax-declaration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tax-declaration-list',
  templateUrl: './tax-declaration-list.component.html',
  styleUrls: ['./tax-declaration-list.component.css']
})
export class TaxDeclarationListComponent implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  taxDeclarationDetail: any = []
  selectAll: any = false
  alltaxDeclarationDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private taxDeclarationSer: TaxDeclarationService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAlltaxDeclarationDetail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }



  handleFilterList(event: any) {
    this.filterText.active = event.target.value
  }

  handleFilterDetails() {
    // this.getAlltaxDeclarationDetail(this.filterText, this.records, this.itemsPerPage)
  }

  async getAlltaxDeclarationDetail() {
    try {
      const result: any = await this.taxDeclarationSer.getAllTaxDeclarationDetail()
      if (result.status === true) {
        this.taxDeclarationDetail = result.data
        this.alltaxDeclarationDetail = result.data
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
          const result: any = await this.taxDeclarationSer.deleteEventTypeDetail(data);
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAlltaxDeclarationDetail()
            return;
          }
          if (result.status === '0') {
            this.getAlltaxDeclarationDetail()
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAlltaxDeclarationDetail()
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
      this.taxDeclarationDetail = this.alltaxDeclarationDetail;
      return;
    }

    this.taxDeclarationDetail = this.alltaxDeclarationDetail.filter((obj: any) =>
      ((obj.component_code.toUpperCase()).includes(filterValue) || (obj.component_name.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.taxDeclarationDetail = this.alltaxDeclarationDetail.filter((obj: any) =>
      ((obj.component_code.toUpperCase()).includes(filterValue) || (obj.component_name.toUpperCase()).includes(filterValue)))

  }

}
