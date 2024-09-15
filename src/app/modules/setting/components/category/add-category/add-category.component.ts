import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryMasterFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;

  constructor(
    private fb: FormBuilder,
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

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.createFormData()
  }

  createFormData() {
    this.categoryMasterFormGroup = this.fb.group({
      rewardCategoryList: this.fb.array([this.createFormArray()])
    })
  }

  createFormArray() {
    return this.fb.group({
      categoryName: ['', Validators.required],
      categoryDiscription: ['', Validators.required],
    })
  }

  get categoryArrayDetail() {
    return this.categoryMasterFormGroup.get('rewardCategoryList') as FormArray
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
      if (this.categoryMasterFormGroup.invalid) {
        return
      }
      const result: any = await this.categorySer.createCategoryDetail(this.categoryMasterFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/category-list/'])
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
