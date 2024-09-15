import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseModuleService } from '../../../services/courseModule/course-module.service';
import { CourseService } from '../../../services/course/course.service';
import Swal from 'sweetalert2';
import { QuestionBankService } from '../../../services/questionBank/question-bank.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewAssementCoursesLevelComponent } from '../view-assement-courses-level/view-assement-courses-level.component';

@Component({
  selector: 'app-assement-courses-level-list',
  templateUrl: './assement-courses-level-list.component.html',
  styleUrls: ['./assement-courses-level-list.component.css']
})
export class AssementCoursesLevelListComponent {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  assetDetails: any = []
  allassetDetails: any = []
  data: any = ''
  courseDetail: any = ''
  isShowScreenMenu: any = true;
  rolesView: any = '';
  page?: number = 0
  itemPerPage = 10
  records: any = 0
  currentPage: any = 1;
  totalItem: any = 0;
  filter: any = {
    courseId: '',
    isActive: true
  }

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private courseModSer: CourseModuleService,
    private courseSer: CourseService,
    private cd: ChangeDetectorRef,
    private assesmentSer: AssementCoursesLevelService,
    private dialogBox: MatDialog
  ) {
    this.getAllCourseDetails();
    this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)

  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    // this.getAllassetDetails()
    // this.getAllCourseDetails()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }



  handleFilterDetails(event: any) {
    this.filter.courseId = event.target.value;
    this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)

  }

  async getAllQuestionBankDetails(filter: any, skip: any, itemPerPage: any) {
    try {
      const result: any = await this.assesmentSer.getAllAssesmentDetailsPageFilter(filter, skip, itemPerPage)
      if (result.status === true) {
        this.assetDetails = result.data
        this.allassetDetails = result.data
        this.totalItem = result.data.totalCount
      } else if (!result.status) {
        this.assetDetails = result.data
        this.totalItem = 0

        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      console.log(error);
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }
  async getAllCourseDetails() {
    try {
      const result: any = await this.courseSer.getAllCourseDetail()
      console.log(result.data[0]._id, 'Course');

      if (result.status === true) {
        this.courseDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  //delete single or particular record by the delete icon in every row of data

  async deleteRecords(data: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to delete this record?",
        icon: "error",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes",
        cancelButtonText: 'No'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result: any = await this.courseModSer.deleteCourseModuleDetail(data);
          console.log(result, data)
          if (result.status === true) {
            this._snackBar.open("Updated Successfully", '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)

            return;
          }
          if (result.status === false) {
            this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)

            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)

        }
      });


    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
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
      ((obj.title.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.title.toUpperCase()).includes(filterValue)))

  }


  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    this.records = (this.page - 1) * this.itemPerPage;
    this.getAllQuestionBankDetails(this.filter, this.records, this.itemPerPage)
  }


  view(id: any) {
    const dialogRef = this.dialogBox.open(ViewAssementCoursesLevelComponent, {
      data: id,
      width: '1000px',
      height: '1000px',
      autoFocus:false
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

}
