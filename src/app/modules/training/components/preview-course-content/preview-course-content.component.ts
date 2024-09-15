import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course/course.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-preview-course-content',
  templateUrl: './preview-course-content.component.html',
  styleUrls: ['./preview-course-content.component.css']
})
export class PreviewCourseContentComponent {
  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  assetDetails: any = []
  selectAll: any = false
  allassetDetails: any = ''
  page?: number = 0;
  itemsPerPage = 10;
  selectedFilter: any = 'O'
  records: any = 0
  filterText: any = {
    active: 'O',
    text: ""
  };
  isShowScreenMenu: any = true;
  rolesView: any = '';
  isLoader: any = false;
  courseId: any = '';
  previewSlide: any = '';
  safeUrl!: SafeResourceUrl;
  progress: any = 0;
  mainIndex: any = 0;
  subIndex: any = 0;
  isCollopose = false;
  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private courseSer: CourseService,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {
    this.courseId = this.activateRouter.snapshot.paramMap.get('id');

  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllassetDetails(this.courseId, this.page, this.itemsPerPage)
  }


  handleFilterDetails() {
    this.getAllassetDetails(this.courseId, this.records, this.itemsPerPage)
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllassetDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      this.isLoader = true
      const result: any = await this.courseSer.getAllCourseDetailInprogressByCourseId(filter)
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.isLoader = false;
        this.assetDetails = result.data
        this.allassetDetails = result.data
        this.progress = this.assetDetails?.courseDetails?.percentageCompletion;
        const lastSlide: any = {
          "title": "Conclusion",
          "description": "Conclusion",
          "isActive": true,
          "courseSlideList": [
            {
              "title": "Thank You",
              "slide_json": {
                "title": "Thank You",
                "content": [
                  {
                    "type": "Text",
                    "value": "To return to the course menu, please click on the Exit button in the top right corner"
                  }
                ]
              },
              "isActive": true,
              "courseId": "66a1f68331e1cf455784f704",
              "courseModuleId": "66c7314576c17de8153853cc",
              "createdBy": "C002",
              "sequence": 2,
              "createdAt": "2024-08-23T09:45:03.186Z",
              "updatedAt": "2024-08-23T09:48:54.819Z",
              "__v": 0,
              "accessStatus": false,
              "selectedSlide": false
            }
          ]
        }
        this.assetDetails.courseDetails?.courseModuleList.push(lastSlide)
        this.assetDetails.courseDetails?.courseModuleList.map((ele: any) => {
          
          ele.courseSlideList.map((el: any) => {
            if (el.accessStatus) {
              el.selectedSlide = true
            } else {
              el.selectedSlide = false
            }
          })
        })

        for (let i = 0; i < this.assetDetails.courseDetails?.courseModuleList.length; i++) {
          const findIndex = this.assetDetails.courseDetails?.courseModuleList[i].courseSlideList.findIndex((ele: any) => ele.accessStatus === false);
          console.log(findIndex, 'findIndex', i)
          if (findIndex !== -1) {
            this.handleCourseDetails(result.data.courseDetails?.courseModuleList[i].courseSlideList[findIndex], i, findIndex, 'next');
            break;
          } else {
            result.data.courseDetails.courseModuleList[this.assetDetails.courseDetails.courseModuleList.length - 1].courseSlideList[0].accessStatus = true;
            this.handleCourseDetails(result.data.courseDetails?.courseModuleList[0].courseSlideList[0], 0, 0, 'next');

          }
        }

      }
    } catch (error: any) {
      console.log(error)
      this.isLoader = false;
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  async getRefreshCouresDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      const result: any = await this.courseSer.getAllCourseDetailInprogressByCourseId(filter)
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.progress = result?.data?.courseDetails?.percentageCompletion;
        console.log(this.progress, ' this.progress')
      }
    } catch (error: any) {
      console.log(error)
      this.isLoader = false;
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  //Read the Slide to going to update the access table

  async updateScreenAccessTable(data: any) {
    try {
      const result: any = await this.courseSer.createSlideAccessLog(data);
      if (result.status === true) {

        this.getRefreshCouresDetails(this.courseId, this.records, this.itemsPerPage)
        return;
      }
      if (result.status === false) {
        this.getRefreshCouresDetails(this.courseId, this.records, this.itemsPerPage)
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



  handleFilter(event: any) {
    const filterValue = event.target.value.toUpperCase();
    if (!filterValue) {
      this.assetDetails = this.allassetDetails;
      return;
    }
    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.course_title.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.course_title.toUpperCase()).includes(filterValue)))
  }



  handleCourseDetails(data: any, mainIndex: any, subIndex: any, type?: any) {
    this.mainIndex = mainIndex;
    this.subIndex = subIndex
    console.log(data)
    this.previewSlide = data.slide_json;
    if (type === 'next') {
      data.selectedSlide = true;
    }
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

  handleNextContent() {
    const findModeuleLength = this.assetDetails.courseDetails?.courseModuleList.length
    const findIndex = this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList.length;
    const reqBody = {
      courseId: this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex].courseId,
      courseModuleId: this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex].courseModuleId,
      slideId: this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex]._id,

    }
    console.log(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex])
    if(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex].title !== 'Thank You'){
    this.updateScreenAccessTable(reqBody)
    }
    if (findModeuleLength - 1 === this.mainIndex && findIndex === (this.subIndex + 1)) {
      return
    }
    if (findIndex === (this.subIndex + 1)) {
      this.mainIndex = this.mainIndex + 1;
      this.subIndex = 0
      this.handleCourseDetails(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex], this.mainIndex, this.subIndex, 'next')
    } else {
      this.mainIndex = this.mainIndex;
      this.subIndex = this.subIndex + 1
      this.handleCourseDetails(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex], this.mainIndex, this.subIndex, 'next')
    }

    console.log(findIndex, 'findIndex', this.subIndex, 'lll', this.mainIndex)
  }

  handlePreviewContent() {
    const findIndex = this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList.length;
    if (0 === this.mainIndex && 0 === (this.subIndex)) {
      return
    }
    if (0 === (this.subIndex)) {
      this.assetDetails.courseDetails.courseModuleList[this.mainIndex].courseSlideList[this.subIndex].selectedSlide = false;

      this.mainIndex = this.mainIndex - 1;

      this.subIndex = this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList.length - 1;

      this.handleCourseDetails(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex], this.mainIndex, this.subIndex, '')
    } else {
      this.assetDetails.courseDetails.courseModuleList[this.mainIndex].courseSlideList[this.subIndex].selectedSlide = false;

      this.mainIndex = this.mainIndex;
      this.subIndex = this.subIndex - 1
      this.handleCourseDetails(this.assetDetails.courseDetails?.courseModuleList[this.mainIndex].courseSlideList[this.subIndex], this.mainIndex, this.subIndex, '')
    }
    console.log(findIndex, 'findIndex', this.subIndex, 'lll', this.mainIndex)
  }

  collaposeMenu() {
    this.isCollopose = !this.isCollopose
  }


  backCourse() {
    this.router.navigate([`/training/view-course/${this.courseId}`])
  }
}
