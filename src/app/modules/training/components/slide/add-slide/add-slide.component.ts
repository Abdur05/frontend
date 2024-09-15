import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';
import { SlideService } from '../../../services/slide/slide.service';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { PreviewSlideComponent } from '../preview-slide/preview-slide.component';
import Swal from 'sweetalert2';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-slide',
  templateUrl: './add-slide.component.html',
  styleUrls: ['./add-slide.component.css']
})
export class AddSlideComponent {

  courseDetailFormGroup: any = FormGroup
  isSubmitted: any = false
  isShowPadding: any = false
  categoryDetail: any = []
  courseId: any = ''
  selectedModule: string | null = null;
  selectedSlide: string | null = null;
  courseDetail: any = ''
  courseModuleId: any = '';
  slideId: any = '';
  isShowScreenMenu: any = true;
  selectedType: any = '';
  previewSlide: any = '';
  safeUrl!: SafeResourceUrl;
  isLoader: any = false;
  isEdit: any = false;
  selecteSlider:any = '';

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private courseSer: CourseService,
    private activateRouter: ActivatedRoute,
    private slideSer: SlideService,
    private courseModSer: CourseModuleService,
    private sanitizer: DomSanitizer,
    private dialogBox: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseId = this.activateRouter.snapshot.paramMap.get('id')
    this.createFormField()
    this.getSingleCourseById()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  createFormField(data?: any) {
    if (data) {
      this.courseDetailFormGroup = this.fb.group({
        _id: [data._id],
        course_title: [this.courseDetailFormGroup.value.course_title, Validators.required],
        title: [data.title, Validators.required],
        heading: [data.heading, Validators.required],
        file_path: [data.file_path],
        courseModuleId: [data.courseModuleId, Validators.required],
        courseId: [data.courseId, Validators.required],
        sequence: [data.sequence, Validators.required],
        type: [''],
        content: this.fb.array(data.slide_json.content.map((el: any) => this.createFormArray(el)))
      })
      return
    }
    this.courseDetailFormGroup = this.fb.group({
      course_title: ['', Validators.required],
      title: ['', Validators.required],
      heading: ['', Validators.required],
      file_path: [''],
      courseModuleId: ['', Validators.required],
      courseId: [this.courseId],
      sequence: ['', Validators.required],
      content: this.fb.array([this.createFormArray()]),
      type: ['']
    })
  }

  get contentArrayDetail() {
    return this.courseDetailFormGroup.get('content') as FormArray
  }

  createFormArray(data?: any) {
    if (data) {
      return this.fb.group({
        type: [data.type],
        value: [data.value]
      })
    }
    return this.fb.group({
      type: [''],
      value: ['']
    })
  }

  async getSingleCourseById() {
    try {
      this.isLoader = true;
      const result: any = await this.slideSer.singleSlideDetail(this.courseId)
      console.log(result);
      this.isLoader = false;
      if (result) {
        result.data.courseModuleList.map((el: any) => {
          console.log(el);
          el.courseSlideList = el.courseSlideList.sort((a: any, b: any) => a.sequence - b.sequence);
        })
        this.courseDetailFormGroup.patchValue(result.data)
        this.courseDetail = [result.data]
        console.log(this.courseDetail);
        this.courseModuleId = [result.data.courseModuleList[0]._id]
        console.log("this.courseModuleId =", [result.data.courseModuleList[0]._id])
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
      if (this.isEdit) {
        this.updateHandle()
        return
      }
      console.log(this.courseDetailFormGroup.value);

      this.isSubmitted = true
      if (this.courseDetailFormGroup.invalid)
        return
      this.courseDetailFormGroup.value.slide_json = {
        content: this.courseDetailFormGroup.value.content,
        title: this.courseDetailFormGroup.value.title,
        heading: this.courseDetailFormGroup.value.heading

      }
      console.log(this.courseDetailFormGroup.value, 'kkkk')
      this.isLoader = true;
      const result: any = await this.slideSer.createSlideDetail(this.courseDetailFormGroup.value)
      this.isLoader = false;
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.selectedModule = '';
        this.openSliderPreview(this.courseDetailFormGroup.value.slide_json);
        // this.router.navigate(['/training/slide-list/'])
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
      this.isLoader = false;

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


  async updateHandle() {
    try {
      console.log(this.courseDetailFormGroup.value);

      this.isSubmitted = true
      if (this.courseDetailFormGroup.invalid)
        return
      this.courseDetailFormGroup.value.slide_json = {
        content: this.courseDetailFormGroup.value.content,
        title: this.courseDetailFormGroup.value.title,
        heading: this.courseDetailFormGroup.value.heading

      }
      console.log(this.courseDetailFormGroup.value, 'kkkk')
      this.isLoader = true;
      const result: any = await this.slideSer.updateCourseSlideDetail(this.courseDetailFormGroup.value)
      this.isLoader = false;
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.selectedModule = '';
        this.isEdit = true;
        this.openSliderPreview(this.courseDetailFormGroup.value.slide_json);
        this.createFormField()

        // this.router.navigate(['/training/slide-list/'])
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
      this.isLoader = false;
      console.log(error);
      if (error?.error?.message) {
        this._snackBar.open(error?.error?.message, '', {
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
  openSliderPreview(data: any) {
    const dialogRef = this.dialogBox.open(PreviewSlideComponent, {
      data: data,
      width: '1000px',
      height: '1000px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.getSingleCourseById()
    });
  }

  handleFilterDetails(event: any) {
    const selectedModuleTitle = event.target.value;
    console.log(selectedModuleTitle);
    this.selectedModule = null;

    for (let course of this.courseDetail) {
      const module = course.courseModuleList.find((mod: any) => mod._id === selectedModuleTitle);
      if (module) {
        console.log(module, 'module')
        this.selectedModule = module;
        this.courseDetailFormGroup.patchValue({
          title: '',
          content: []
        });
        break;
      }
    }
  }

  handleUploadFile(event: any, inputAccess: any, controlName: any) {
    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      console.log(splitValue, 'splitValue')
      if (['png', 'jpg', 'jpeg', 'pdf'].includes(splitValue[splitValue.length - 1])) {
        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(file, 'file');

        reader.onload = () => {
          // Create FormData object to send file data
          const formData = new FormData();
          formData.append('file_path', file);
          formData.append('courseId', this.courseId);
          formData.append('courseModuleId', this.courseModuleId);

          this.fileUpload(formData)
        };
        reader.readAsDataURL(file);
        // inputAccess.value = '';
      } else {
        this._snackBar.open('Only support image and PDF', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    }
  }

  async fileUpload(data: any) {
    try {
      const result: any = await this.slideSer.uploadSlideFilePath(data)
      console.log(result.src);


      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        const formArray = this.courseDetailFormGroup.get('content') as FormArray;
        const formGroup = formArray.at(0) as FormGroup;

        formGroup.patchValue({
          value: result.data
        })
        // this.courseDetailFormGroup.controls.file_path.setValue(result.data)
        // this.courseDetailFormGroup.get('content.value').setValue(result.src)
      }
      else {
        this._snackBar.open('Something went wrong', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error) {
      console.log(error);
      this._snackBar.open('Something went wrong Catch Block', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleSidle(data: any, index: any) {
    this.previewSlide = '';
    this.selecteSlider = ''
    this.isEdit = false;
    this.selectedModule = data;
    this.createFormField()
    this.courseDetailFormGroup.controls.courseModuleId.setValue(data._id);
    this.courseDetailFormGroup.controls.course_title.setValue(this.courseDetail[0].course_title);

    this.courseDetailFormGroup.controls.sequence.setValue(index);

  }

  selectType(text: any) {
    const formArray = this.courseDetailFormGroup.get('content') as FormArray;
    const formGroup = formArray.at(0) as FormGroup;
    this.selectedType = text;
    this.courseDetailFormGroup.controls.type.setValue(text)
    formGroup.patchValue({
      type: text
    })


  }


  previewSlider(data: any) {
    this.selecteSlider = data.title 
    this.previewSlide = data.slide_json;
    if (this.previewSlide.content[0].type === 'PDF / Image') {
      const url = 'http://localhost:4000/file?path=' + this.previewSlide.content[0].value;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    } else if (this.previewSlide.content[0].type === 'Text') {
      this.previewSlide.content[0].value = this.previewSlide.content[0].value.replace(/\n/g, '<br>');
    } else if (this.previewSlide.content[0].type === 'YouTube Url') {
      const splitValue = this.previewSlide.content[0].value.split('=');
      const youtubeUrl: any = `https://www.youtube.com/embed/${splitValue[splitValue.length - 1]}`;
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeUrl);

    }
    else if (this.previewSlide.content[0].type === 'External Url') {
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.previewSlide.content[0].value);
    }
  }



  // File Upload
  deleteSliderVerfiy(data: any) {
    Swal.fire({
      title: "Are you sure you want to delete the slider?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteSlider(data)
      }
    });

  }


  async deleteSlider(data: any) {
    try {

      this.isLoader = true;
      const result: any = await this.slideSer.deleteSlideDetail(data._id, data)
      this.isLoader = false;
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.previewSlide = '';
        this.selectedModule = ''
        this.getSingleCourseById()
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
      this.isLoader = false;

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


  editSlider(data: any) {
    console.log(data);
    this.selecteSlider = data.title 
    this.selectedModule = data;
    this.previewSlide = ''
    this.isEdit = true;
    this.selectedType = data.slide_json.content[0].type
    this.createFormField(data)
    this.courseDetailFormGroup.controls.type.setValue(data.slide_json.content[0].type)
    this.courseDetailFormGroup.controls.heading.setValue(data.slide_json.heading)


  }
  drop(event: CdkDragDrop<string[]>, data: any) {
    moveItemInArray(data, event.previousIndex, event.currentIndex);
    for (let i = 0; i < data.length; i++) {
      data[i].sequence = i + 1
    }
    this.updateSequence(data)
    console.log(data, 'sup-icon')
  }

  async updateSequence(data: any) {
    try {

      this.isLoader = true;
      const result: any = await this.slideSer.updateCourseSlideSeqDetail(data)
      this.isLoader = false;
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.previewSlide = '';
        this.selectedModule = ''
        this.getSingleCourseById()
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
      this.isLoader = false;

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
