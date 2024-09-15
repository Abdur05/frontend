import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.css']
})
export class AddSubCategoryComponent {

  subcategoryMasterFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;

  constructor(
    private fb: FormBuilder,
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

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.createFormData()
  }

  createFormData() {
    this.subcategoryMasterFormGroup = this.fb.group({
      rewardCategoryList: this.fb.array([this.createFormArray()])
    })
  }

  createFormArray() {
    return this.fb.group({
      subCategoryName: ['', Validators.required],
      subcategoryDiscription: ['', Validators.required],
    })
  }

  get categoryArrayDetail() {
    return this.subcategoryMasterFormGroup.get('rewardCategoryList') as FormArray
  }

  addCategoryArray() {
    this.categoryArrayDetail.push(this.createFormArray())
  }

  deleteCategory(index: any) {
    this.categoryArrayDetail.removeAt(index)
  }

  async submitCategory() {
    try {
      this.isSubmitted = true
      if (this.subcategoryMasterFormGroup.invalid) {
        return
      }
      const result: any = await this.subcategorySer.createSubCategoryDetail(this.subcategoryMasterFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/sub-category-list/'])
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

}
