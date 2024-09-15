import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course/course.service';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-enroll-course-list',
  templateUrl: './enroll-course-list.component.html',
  styleUrls: ['./enroll-course-list.component.css']
})
export class EnrollCourseListComponent {

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
  selectedIndex: any = 0
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
      const result: any = await this.courseSer.getAllCourseDetailEnroll()
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.assetDetails = result.data
        this.allassetDetails = result.data
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

  async enrolledCourse(id: any) {
    try {
      const result: any = await this.courseSer.createCourseEnrollDetail({ courseId: id });
      if (result.status) {
        this.getAllassetDetails(this.filterText, this.records, this.itemsPerPage)
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
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

  onTabClick(event: MatTabChangeEvent): void {
    console.log('Selected tab index: ', event.index);
    console.log('Selected tab label: ', event.tab.textLabel);
    this.selectedIndex = event.index
    // You can perform additional actions based on the selected tab
  }

}
