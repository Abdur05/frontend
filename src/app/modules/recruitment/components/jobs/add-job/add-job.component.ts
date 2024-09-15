import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/modules/setting/services/location/location.service';
import { JobService } from '../../../services/jobs/-job.service';
import { JobTypeService } from 'src/app/modules/setting/services/job-type/job-type.service';
import { SkillService } from 'src/app/modules/appraisal/services/skill/skill.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent {

  jobFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  locationDetail: any = []
  today: any = ''
  JobTypeDetail: any = []
  isShowScreenMenu: any = true;
  skillDetails: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private locationSer: LocationService,
    private jobSer: JobService,
    private jobTypeSer: JobTypeService,
    private skillSer: SkillService

  ) {
    this.today = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.createFormdata()
    this.getAllLocationDetail()
    this.getAllJobTypeDetail();
    this.getAllSkillSetDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormdata() {
    this.jobFormGroup = this.fb.group({
      jobName: ['', Validators.required],
      jobTypeId: ['', Validators.required],
      miniQualification: ['', Validators.required],
      description: ['', Validators.required],
      requiredSkills: this.fb.array([this.createRequiredFormsFields()]),
      experience: ['', Validators.required],
      location: ['', Validators.required],
      expirayDate: ['', Validators.required],
      jobStatus: ['open'],
      no_of_open_positions: ['', Validators.required],
      salaryRange: ['', Validators.required],
      visibilityType: ['public']
    });
  }

  get requiredSkillsController() {
    return this.jobFormGroup.get('requiredSkills') as FormArray
  }

  createRequiredFormsFields() {
    return this.fb.group({
      skill: ['', Validators.required],
      skillName: ['', Validators.required],
      ProficiencyLevel: ['', Validators.required]
    })
  }

  addSkills() {
    this.requiredSkillsController.push(this.createRequiredFormsFields())
  }

  removeSkills(index: any, skillId:any) {
    if (skillId) {
      this.skillDetails.map((el: any) => {
        if (el._id === skillId) {
          el.disable = false
        }
      })
    }
    this.requiredSkillsController.removeAt(index)
  }

  async submitData() {
    try {
      this.isSubmitted = true;
      console.log(this.jobFormGroup)
      if (this.jobFormGroup.invalid)
        return
      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.jobFormGroup.value.createdOn = fullDate
      this.jobFormGroup.value.createdBy = username
      this.jobFormGroup.value.changedOn = fullDate
      this.jobFormGroup.value.changedBy = username
      const result: any = await this.jobSer.createJobDetail(this.jobFormGroup.value)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/recruitment/job-list/'])
        return
      }
      if (!result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }


    } catch (error: any) {
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

  async getAllLocationDetail() {
    try {
      const result: any = await this.locationSer.getAllLocationDetails()
      if (result.status === '1') {
        this.locationDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }
  async getAllJobTypeDetail() {
    try {
      const result: any = await this.jobTypeSer.getAllJobTypeDetail()
      if (result.status === true) {
        this.JobTypeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  async getAllSkillSetDetails() {
    try {
      const result: any = await this.skillSer.getAllskillDetail()
      if (result.status) {
        this.skillDetails = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error?.error?.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleSkill(event:any, index:any){
    if(event.target.value){
      const formArray = this.jobFormGroup.get('requiredSkills') as FormArray;
      const formGroup = formArray.at(index) as FormGroup;
      const findDetails = this.skillDetails.find((el:any) => el._id === event.target.value);
      this.jobFormGroup.value.requiredSkills.map((el: any) => {
        this.skillDetails.map((ele: any) => {
          if (el.skill === ele._id) {
            ele.disable = true
          }
        })
      })
      if(findDetails){
        formGroup.patchValue({
          skillName: findDetails.skillName
        })
      }
    }
  }

}
