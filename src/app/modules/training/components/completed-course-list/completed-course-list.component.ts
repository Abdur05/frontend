import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-completed-course-list',
  templateUrl: './completed-course-list.component.html',
  styleUrls: ['./completed-course-list.component.css']
})
export class CompletedCourseListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  assetDetails: any = []
  selectAll: any = false
  allassetDetails: any = []
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

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private courseSer: CourseService,
    private cd: ChangeDetectorRef
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllassetDetails(this.filterText, this.page, this.itemsPerPage)
  }


  handleFilterDetails() {
    this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
  }


  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllassetDetails(filter: any, page: any, itemsPerPage: any) {
    try {
      this.isLoader = true
      const result: any = await this.courseSer.getAllCourseDetailInprogress()
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.isLoader = false;
        this.assetDetails = result.data.filter((el: any) => (el.courseEnrolledStatus === 'Enrolled' && el.courseDetails.percentageCompletion === 100 && ((el.courseDetails.questionBank.length !== 0 && (el.courseDetails.assessmentDetails !== null || el.courseDetails.assessmentDetails?.status === 'Completed')) || (el.courseDetails.questionBank.length === 0 && el.courseDetails.assessmentDetails === null))))
        // result.data.map((el: any) => {
        //   console.log(el?.courseEnrolledStatus === 'Enrolled' ,'llll', el.courseDetails.percentageCompletion === 0, 'lllllhjhghg', (el.courseDetails.questionBank.length !== 0 && el.courseDetails.assessmentDetailsstatus === 'Completed'), 'kkkkugut76',el.courseDetails.questionBank.length === 0 ,'last', el.courseDetails.assessmentDetails === null)
        //   // console.log((el.courseEnrolledStatus === 'Enrolled' ,'llll', el.courseDetails.percentageCompletion, 'lllllhjhghg' , ((el.courseDetails.questionBank.length !== 0 && el.courseDetails.assessmentDetailsstatus === 'Completed') || (el.courseDetails.questionBank.length === 0 && el.courseDetails.assessmentDetailsstatus === null))))
        // })
        this.allassetDetails = result.data
      }
    } catch (error: any) {
      console.log(error);
      this.isLoader = false;
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  //delete single or particular record by the delete icon in every row of data

  async publishCourse(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to" + " " + (data.publishStatus === true ? 'unPublished' : 'Published') + " this " + data.course_title + " course?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          data.categoryId = data.categoryId._id
          data.publishStatus = data.publishStatus === true ? false : true
          const result: any = await this.courseSer.updateCourseDetail(data);
          if (result.status === true) {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            return;
          }
          if (result.status === false) {
            this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
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
}
