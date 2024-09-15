import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CourseService } from '../../../services/course/course.service';
import { AssementCoursesLevelService } from '../../../services/assement-courses-level/assement-courses-level.service';
import { MatDialog } from '@angular/material/dialog';
import { PreviewAssessmentContentDetailsComponent } from '../preview-assessment-content-details/preview-assessment-content-details.component';

@Component({
  selector: 'app-assessment-content-launch',
  templateUrl: './assessment-content-launch.component.html',
  styleUrls: ['./assessment-content-launch.component.css']
})
export class AssessmentContentLaunchComponent {
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
    courseId: ""
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

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private assessmentSer: AssementCoursesLevelService,
    private activateRouter: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private dialogBox: MatDialog
  ) {
    this.filterText.courseId = this.activateRouter.snapshot.paramMap.get('id');

  }

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
      const result: any = await this.assessmentSer.getAllAssesmentDetailsPageFilter(filter, page, itemsPerPage)
      console.log(result, 'seet allocation');

      if (result.status === true) {
        this.isLoader = false;
        this.assetDetails = result.data[0]

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


  handleInstructionBox(data: any) {
    const dialogRef = this.dialogBox.open(PreviewAssessmentContentDetailsComponent, {
      data: data,
      width: '1000px',
      height: '1000px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }



}
