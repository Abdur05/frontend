import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseService } from '../../../services/course/course.service';

@Component({
  selector: 'app-slide-list',
  templateUrl: './slide-list.component.html',
  styleUrls: ['./slide-list.component.css']
})
export class SlideListComponent implements OnInit {


  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;
  isShowPadding: any = false
  assetDetails: any = []
  allassetDetails: any = []
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
    this.getAllassetDetails()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  async getAllassetDetails() {
    try {
      this.isLoader = true;
      const result: any = await this.courseSer.getAllCourseDetail()
      console.log(result);
      if (result.status === true) {
        this.isLoader = false;
        this.assetDetails = result.data
        this.allassetDetails = result.data
      }
    } catch (error) {
      this.isLoader = false;
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
      ((obj.course_title.toUpperCase()).includes(filterValue)))
  }
  filterData() {
    const filterValue = this.searchInput.nativeElement.value.toUpperCase();
    this.assetDetails = this.allassetDetails.filter((obj: any) =>
      ((obj.course_title.toUpperCase()).includes(filterValue)))

  }

  addSlide(data?:any){
    if(data.moduleCount === 0){
      this._snackBar.open('Please Create the Module', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
      return
    }
    this.router.navigate([`/training/add-slide/${data._id}`])
  }


}
