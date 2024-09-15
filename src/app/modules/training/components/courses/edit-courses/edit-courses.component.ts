import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent {


  courseDetailFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  categoryDetail: any = []
  courseId: any = ''
  durations: number[] = Array.from({ length: 100 }, (_, i) => i + 1);
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private categorySer: CategoryService,
    private courseSer: CourseService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormField()
    this.getAllCategoryDetail()
    this.getCourseDetailById()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  createFormField() {
    this.courseDetailFormGroup = this.fb.group({
      _id: ['', Validators.required],
      course_title: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required],
      categoryId: ['', Validators.required]
    })
  }

  async getCourseDetailById() {
    try {
      const result: any = await this.courseSer.singleCourseDetail(this.courseId)
      if (result) {
        this.courseDetailFormGroup.patchValue(result.data)
        this.courseDetailFormGroup.controls['categoryId'].setValue(result.data.categoryId._id);

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
      console.log(this.courseDetailFormGroup.value);

      this.isSubmitted = true
      if (this.courseDetailFormGroup.invalid)
        return

      const result: any = await this.courseSer.updateCourseDetail(this.courseDetailFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/training/courses-list/'])
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

  async getAllCategoryDetail() {
    try {
      const result: any = await this.categorySer.getAllCategoryDetail()
      console.log(result);

      if (result) {
        this.categoryDetail = result.data
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
