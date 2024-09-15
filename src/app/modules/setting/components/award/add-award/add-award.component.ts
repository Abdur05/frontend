import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AwardService } from '../../../services/award/award.service';
import { CategoryService } from '../../../services/category/category.service';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';

@Component({
  selector: 'app-add-award',
  templateUrl: './add-award.component.html',
  styleUrls: ['./add-award.component.css']
})
export class AddAwardComponent {

  awardFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;
  categoryDetail: any = []
  subCategoryDetail: any = []
  page?: number = 0;
  itemsPerPage = 10;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private awardSer: AwardService,
    private categorySer: CategoryService,
    private subCategorySer: SubCategoryService,
  ) { }


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
    this.createFormData()
    this.getAllCategoryDetail(this.page, this.itemsPerPage)
    this.getAllSubCategoryDetail(this.page, this.itemsPerPage)
  }

  createFormData() {
    this.awardFormGroup = this.fb.group({
      awardName: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      gemsPoint: ['', Validators.required],
      awardDiscription: ['', Validators.required],
    })
  }


  async submitCategory() {
    try {
      this.isSubmitted = true
      if (this.awardFormGroup.invalid) {
        return
      }
      const result: any = await this.awardSer.createAwardMasterDetail(this.awardFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/award-list/'])
        return
      }
      if (result.status === false) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllCategoryDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.categorySer.getAllCategoryDetail(page, itemsPerPage)
      if (result.status === true) {
        this.categoryDetail = result.data.rewardCategoryList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllSubCategoryDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.subCategorySer.getAllSubCategoryDetail(page, itemsPerPage)
      if (result.status === true) {
        this.subCategoryDetail = result.data.rewardSubCategoryList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
