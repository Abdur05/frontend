import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecognitionService } from '../../../services/recognition/recognition.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AwardService } from '../../../services/award/award.service';
import { MyProfileService } from 'src/app/modules/employee/services/my-profile/my-profile.service';

@Component({
  selector: 'app-edit-recognition',
  templateUrl: './edit-recognition.component.html',
  styleUrls: ['./edit-recognition.component.css']
})
export class EditRecognitionComponent implements OnInit {
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
  recognitionId: any = ''

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
    private activateRouter: ActivatedRoute,
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.recognitionId = this.activateRouter.snapshot.paramMap.get('id')
    this.getRecognitionRewardById()
    this.createFormData()
    this.getAllAwardDetail(this.page, this.itemsPerPage)
    this.getAllEmloyeeDetail()
  }

  createFormData(data?: any) {
    console.log(data);

    if (data) {
      this.recognitionFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        nominatoreEmpId: [data.nominatoreEmpId, Validators.required],
        nominatoreEmpName: [data.nominatoreEmpName, Validators.required],
        awardMasterId: [data.awardMasterId, Validators.required],
        expiredDate: [data.expiredDate, Validators.required],
        nominationDetails: this.fb.array(data.nominationDetails.map((ele: any) => this.createFormArrayData(ele)))

      })
    }
    this.recognitionFormGroup = this.fb.group({
      _id: ['', Validators.required],
      nominatoreEmpId: ['', Validators.required],
      nominatoreEmpName: ['', Validators.required],
      awardMasterId: ['', Validators.required],
      expiredDate: ['', Validators.required],
      nominationDetails: this.fb.array([this.createFormArrayData()])
    })
  }


  createFormArrayData(val?: any) {
    if (val) {
      return this.fb.group({
        AchievementSummeryForCongratulatoryEmail: [val.AchievementSummeryForCongratulatoryEmail],
        ContributionToOrganization: [val.ContributionToOrganization],
        ContributionToBusinessSupport: [val.ContributionToBusinessSupport],
        ContributionToCreationOfAssets: [val.ContributionToCreationOfAssets],
        AdditionalRemarks: [val.AdditionalRemarks]
      })
    }
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

  async getRecognitionRewardById() {
    try {
      const result: any = await this.recognitionSer.singleAwardNominatorDetail(this.recognitionId)
      console.log(result);

      if (result.status === true) {
        const patchedData = this.patchDate(result.data); // Call new function to patch expiredDate
        this.recognitionFormGroup.patchValue(patchedData);
        //this.createFormData(result.data)


      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  patchDate(data: any) {
    if (data.expiredDate) {
      // Parse the date string (assuming it's in ISO 8601 format)
      const parsedDate = new Date(data.expiredDate);

      // Set time components to 0 (hours, minutes, seconds, milliseconds)
      parsedDate.setHours(0, 0, 0, 0);

      // Format the modified date as "YYYY-MM-DD"
      const formattedDate = parsedDate.toISOString().substring(0, 10);

      // Update the expiredDate property in data
      data.expiredDate = formattedDate;
    }

    return data;
  }

  async submitAward() {
    try {
      this.isSubmitted = true
      if (this.recognitionFormGroup.invalid) {
        return
      }
      const result: any = await this.recognitionSer.updateAwardNominatorDetail(this.recognitionFormGroup.value)
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
