import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecognitionService } from '../../../services/recognition/recognition.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AwardService } from '../../../services/award/award.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-add-recognition',
  templateUrl: './add-recognition.component.html',
  styleUrls: ['./add-recognition.component.css']
})
export class AddRecognitionComponent implements OnInit {

  recognitionFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  isShowScreenMenu: any = true;
  rolesView: any = false;
  awardDetail: any = [];
  emloyeeDetail: any = [];
  page?: number = 0;
  itemsPerPage = 10;
  today: string = '';

  private searchTerms = new Subject<string>();
  searchResults: any = [];
  searchTerm: any;

  search(term: string): void {
    this.searchTerms.next(term);
  }




  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private recognitionSer: RecognitionService,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private awardSer: AwardService,
    private emloyeeSer: MyProfileService,
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.createFormData()
    this.getAllAwardDetail(this.page, this.itemsPerPage)
    this.getAllEmloyeeDetail()
    this.searchTerms.pipe(
      debounceTime(400) // Adjust debounce time as needed
    ).subscribe(term => {
      const data = {
        employeeId: term,
        employeeName: term
      };
      this.getAllEmloyeeQueryarams(data)
        .then(results => {
          this.searchResults = results;
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    });
  }

  createFormData() {
    this.recognitionFormGroup = this.fb.group({
      nominatoreEmpId: ['', Validators.required],
      nominatoreEmpName: ['', Validators.required],
      awardMasterId: ['', Validators.required],
      expiredDate: ['', Validators.required],
      nominationDetails: this.fb.array([this.createFormArrayData()])
    })
  }
  createFormArrayData() {
    return this.fb.group({
      AchievementSummeryForCongratulatoryEmail: [''],
      ContributionToOrganization: [''],
      ContributionToBusinessSupport: [''],
      ContributionToCreationOfAssets: [''],
      AdditionalRemarks: ['']
    })
  }

  get recognitionFormArrayDetail() {
    return this.recognitionFormGroup.get('nominationDetails') as FormArray
  }

  addFormArray() {
    this.recognitionFormArrayDetail.push(this.createFormArrayData())
  }

  deleteFormArray(index: any) {
    this.recognitionFormArrayDetail.removeAt(index)
  }

  async submitAward() {
    try {
      this.isSubmitted = true
      if (this.recognitionFormGroup.invalid) {
        return
      }
      const result: any = await this.recognitionSer.createAwardNominatorDetail(this.recognitionFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/recognition-list/'])
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
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllEmloyeeQueryarams(data: any) {
    try {
      const result: any = await this.recognitionSer.getAllEmployeeListByQuesryarams(data)
      if (result.status === true) {

      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllAwardDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.awardSer.getAllAwardMasterDetail(page, itemsPerPage)
      if (result.status === true) {
        this.awardDetail = result.data.awardMasterList
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllEmloyeeDetail() {
    try {
      const result: any = await this.emloyeeSer.getAllMyProfileDetails()
      if (result.status === true) {
        this.emloyeeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  changeEmloyeeName(event: any) {
    const chooseEmployee: any = this.emloyeeDetail.find((el: any) => el.employeeId === event.target.value)
    const fullName = `${chooseEmployee.firstName} ${chooseEmployee.lastName}`;
    console.log(fullName);
    this.recognitionFormGroup.patchValue({
      nominatoreEmpName: fullName
    })

  }

}
