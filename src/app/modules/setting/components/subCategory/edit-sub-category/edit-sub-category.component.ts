import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SubCategoryService } from '../../../services/subCategory/sub-category.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.css']
})
export class EditSubCategoryComponent {


  subcategoryMasterFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;
  subcategoryId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private subcategorySer: SubCategoryService,
    private activateRouter: ActivatedRoute
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
    this.subcategoryId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormData()
    this.getSubCategoryDetailById()
  }

  createFormData() {
    this.subcategoryMasterFormGroup = this.fb.group({
      _id: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      subcategoryDiscription: ['', Validators.required],
    })
  }

  async getSubCategoryDetailById() {
    try {
      const result: any = await this.subcategorySer.singleSubCategoryDetail(this.subcategoryId)
      if (result.status === true) {
        this.subcategoryMasterFormGroup.patchValue(result.data)
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async submitSubCategory() {
    try {
      this.isSubmitted = true
      if (this.subcategoryMasterFormGroup.invalid) {
        return
      }
      const result: any = await this.subcategorySer.updateSubCategoryDetail(this.subcategoryMasterFormGroup.value)
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
