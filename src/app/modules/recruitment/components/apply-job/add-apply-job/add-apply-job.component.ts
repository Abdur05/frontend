import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../services/jobs/-job.service';
import Swal from 'sweetalert2';
import { ApplyJobService } from '../../../services/applyJob/apply-job.service';

@Component({
  selector: 'app-add-apply-job',
  templateUrl: './add-apply-job.component.html',
  styleUrls: ['./add-apply-job.component.css']
})
export class AddApplyJobComponent implements OnInit {

  applyjobFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  jobDetail: any = []
  applyjobId: any = '';
  filedPathName: any = '';
  inputControl: any = '';
  @ViewChild('inputFile') inputFile: any;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  imageSrc: any = '';
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private jobSer: JobService,
    private activateRouter: ActivatedRoute,
    private applyJobSer: ApplyJobService

  ) { }

  ngOnInit(): void {
    this.applyjobId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getAllJobDetail()
    this.singleJobDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data(data?: any) {
    if (data) {
      this.applyjobFormGroup = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
        phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        resumeFilepath: [''],
        requiredSkills: this.fb.array(data.requiredSkills.map((el: any) => this.createRequiredFormsFields(el))),
        experience: [data.experience],
        location: [data.location],
        expirayDate: [data.expirayDate],
        jobName: [data.jobName]

      });
      return
    }
    this.applyjobFormGroup = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      resumeFilepath: [''],
      requiredSkills: this.fb.array([this.createRequiredFormsFields()]),
      experience: [''],
      location: [''],
      expirayDate: [''],
      jobName: ['']

    });
  }


  get requiredSkillsController() {
    return this.applyjobFormGroup.get('requiredSkills') as FormArray
  }

  createRequiredFormsFields(data?: any) {
    if (data) {
      return this.fb.group({
        skill: [data.skill],
        skillName: [data.skillName, Validators.required],
        ProficiencyLevel: [data.ProficiencyLevel, Validators.required]
      })
    }
    return this.fb.group({
      skill: [''],
      skillName: ['', Validators.required],
      ProficiencyLevel: ['', Validators.required]
    })
  }

  async singleJobDetail() {
    try {
      const result: any = await this.jobSer.singleJobDetail(this.applyjobId)
      if (result.status) {
        this.data(result.data)
        // this.applyjobFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.applyjobFormGroup.value);

      if (this.applyjobFormGroup.invalid)
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

      this.applyjobFormGroup.value.createdOn = fullDate
      this.applyjobFormGroup.value.createdBy = username
      this.applyjobFormGroup.value.changedOn = fullDate
      this.applyjobFormGroup.value.changedBy = username

      const result: any = await this.applyJobSer.createApplyJobDetail(this.applyjobFormGroup.value)
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        Swal.fire({
          title: 'Thank You!',
          text: 'Thanks for taking the time for our position. We appreciate your interest. We are currently in th process of taking application for this position. If you are selected to continue to the interview process,our human resources department will be in contact with you soon.',
          icon: 'success',
          confirmButtonText: 'Ok',
          cancelButtonText: ''
        })
        this.router.navigate(['/recruitment/apply-job-list/'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }


    } catch (error: any) {
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

  async getAllJobDetail() {
    try {
      const result: any = await this.jobSer.getAllJobDetail()
      if (result.status === '1') {
        this.jobDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }

  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName, 'fiel')

        if (this.filedPathName === 'resume') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else {
          this.fileName = event.target.files[0].name;
          this.selectedFile = event.target.files[0];
          reader.onload = e => this.imageSrc = reader.result;
          console.log(this.selectedFile);

        }

        reader.readAsDataURL(file);
        this.inputControl.value = ''
      } else {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }


  async fileUploadVerifyNo() {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.applyJobSer.applyjobUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'logo') {
          this.applyjobFormGroup.controls.filePath.setValue(result.fileName)

        }
        else if (this.filedPathName === 'resume') {
          this.applyjobFormGroup.controls.resumeFilepath.setValue(result.fileName)
        }
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async fileUpload() {
    try {
      if (!this.imageSrc) {
        this.submitData()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.applyJobSer.applyjobUpload(formData);
      if (result.status === '1') {

        if (this.filedPathName === 'logo') {
          this.applyjobFormGroup.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'resume') {
          this.applyjobFormGroup.controls.resumeFilepath.setValue(result.fileName)
        }
        this.submitData()
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
