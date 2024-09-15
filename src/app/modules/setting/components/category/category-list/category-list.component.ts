import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
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
    private categorySer: CategoryService
  ) { }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  ngOnInit(): void {
    this.getAllCategoryDetail(this.page, this.itemsPerPage)
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllCategoryDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.categorySer.getAllCategoryDetail(page, itemsPerPage)
      if (result.status === true) {
        this.categoryMasterDetail = result.data.rewardCategoryList
        this.allcategoryMasterDetail = result.data.rewardCategoryList
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
          const result: any = await this.categorySer.deleteCategoryDetail(data);
          if (result.status === true) {
            this._snackBar.open("Deleted Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllCategoryDetail(this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllCategoryDetail(this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllCategoryDetail(this.records, this.itemsPerPage)
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
      ((obj.categoryName.toUpperCase()).includes(filterValue) || (obj.categoryDiscription.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.categoryMasterDetail = this.allcategoryMasterDetail.filter((obj: any) =>
      ((obj.categoryName.toUpperCase()).includes(filterValue) || (obj.categoryDiscription.toUpperCase()).includes(filterValue)))

  }


}
