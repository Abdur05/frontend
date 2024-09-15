import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {


  categoryDetailFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  categoryId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private categorySer: CategoryService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormField()
    this.getCategoryDetailById()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormField() {
    this.categoryDetailFormGroup = this.fb.group({
      _id: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  async getCategoryDetailById() {
    try {
      const result: any = await this.categorySer.getSingleCategoryDetail(this.categoryId)
      if (result) {
        this.categoryDetailFormGroup.patchValue(result.data)
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async submitData() {
    try {
      console.log(this.categoryDetailFormGroup.value);

      this.isSubmitted = true
      if (this.categoryDetailFormGroup.invalid)
        return

      const result: any = await this.categorySer.updateCategoryDetail(this.categoryDetailFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/training/category-list/'])
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
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }

}
