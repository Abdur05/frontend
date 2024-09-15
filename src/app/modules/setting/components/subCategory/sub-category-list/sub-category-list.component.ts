import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.css']
})
export class SubCategoryListComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  categoryMasterDetail: any = []
  isShowScreenMenu: any = true;
  rolesView: any = false;
  allcategoryMasterDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;
  records: any = 0

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private subcategorySer: SubCategoryService
  ) { }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllSubCategoryDetail(this.page,this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllSubCategoryDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.subcategorySer.getAllSubCategoryDetail(page,itemsPerPage)
      if (result.status === true) {
        this.categoryMasterDetail = result.data.rewardSubCategoryList
        this.allcategoryMasterDetail = result.data.rewardSubCategoryList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

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
          const result: any = await this.subcategorySer.deleteSubCategoryDetail(data);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllSubCategoryDetail(this.records,this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllSubCategoryDetail(this.records,this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllSubCategoryDetail(this.records,this.itemsPerPage)
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
      this.categoryMasterDetail = this.allcategoryMasterDetail;
      return;
    }
    this.categoryMasterDetail = this.allcategoryMasterDetail.filter((obj: any) =>
      ((obj.subCategoryName.toUpperCase()).includes(filterValue) || (obj.subcategoryDiscription.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.categoryMasterDetail = this.allcategoryMasterDetail.filter((obj: any) =>
      ((obj.subCategoryName.toUpperCase()).includes(filterValue) || (obj.subcategoryDiscription.toUpperCase()).includes(filterValue)))

  }

}
