import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent {

  modulesDetailFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  courseDetail: any = []
  courseModuleId: any = ''
  isShowScreenMenu: any = true;
  courseId:any = ''
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private courseModSer: CourseModuleService,
    private courseSer: CourseService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.courseModuleId = this.activateRouter.snapshot.paramMap.get('id');
    this.courseId = this.activateRouter.snapshot.paramMap.get('courseId')
    this.createFormField()
    this.getCourseDetail()
    this.getCourseModuleDetailById()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  createFormField() {
    this.modulesDetailFormGroup = this.fb.group({
      _id: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      courseId: ['', Validators.required]
    })
  }

  async getCourseModuleDetailById() {
    try {
      const result: any = await this.courseModSer.singleCourseModuleDetail(this.courseId, this.courseModuleId)
      if (result) {
        this.modulesDetailFormGroup.patchValue(result.data)
        this.modulesDetailFormGroup.controls.courseId.setValue(result.data.courseId._id)
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
      console.log(this.modulesDetailFormGroup.value);
      this.isSubmitted = true
      if (this.modulesDetailFormGroup.invalid)
        return
      const result: any = await this.courseModSer.updateCourseModuleDetail(this.modulesDetailFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/training/module-list/'])
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

  async getCourseDetail() {
    try {
      const result: any = await this.courseSer.getAllCourseDetail()
      if (result.status === true) {
        this.courseDetail = result.data
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
