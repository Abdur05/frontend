import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { JobService } from '../../../services/jobs/-job.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.css']
})
export class AddCandidateComponent implements OnInit, OnDestroy {

  candidateFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  imageSrc: any = '';
  filedPathName: any = '';
  inputControl: any = '';
  @ViewChild('inputFile') inputFile: any;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  jobDetail: any = []
  isShowScreenMenu: any = true;
  unsunscribeTigger: any = '';
  isReferenceShow: any = false;
  designationDetail: any = [];
  departmentDetail: any = [];
  filterDesignationList: any = [];
  dobTouched: boolean = false;
  today: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private candidateSer: CandidateService,
    private jobSer: JobService,
    private designationSer: DesignationService,
    private departmentSer: DepartmentService

  ) {
    // this.getAllDesignationDetail()
    // this.getAllDepartmentDetail()
    this.today = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.data()
    this.getAllJobDetail()
    var id: any = ''

    this.unsunscribeTigger = this.jobSer.dataTransfer.subscribe((data: any) => {
      if (Object.keys(data).length !== 0) {
        this.singleJobDetail(data.id)
      }
    })
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.candidateFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      referenceId: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      jobId: ['', Validators.required],
      filePath: [''],
      homeTown: ['', Validators.required],
      currentLocation: ['', Validators.required],
      linkedinProfile: [''],
      facebookProfile: [''],
      twitterProfile: [''],
      instagramProfile: [''],
      githubProfile: [''],
      experience: [''],
      expertise: [''],
      currentCompany: [''],
      currentSalary: [''],
      currentCompanyDesignation: [''],
      reasonForLeaving: [''],
      expectedSalary: [''],
      noticePeriod: [''],
      skills: [''],
      resumeFilepath: [''],
      // designationId: ['', [Validators.required]],
      // designation: ['', [Validators.required]],
      // departmentId: ['', [Validators.required]],
      // department: ['', [Validators.required]],
    });
  }

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }
  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.candidateFormGroup.value);

      if (this.candidateFormGroup.invalid)
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

      this.candidateFormGroup.value.createdOn = fullDate
      this.candidateFormGroup.value.createdBy = username
      this.candidateFormGroup.value.changedOn = fullDate
      this.candidateFormGroup.value.changedBy = username
      this.candidateFormGroup.value.referenceId = username

      const result: any = await this.candidateSer.createcandidateDetail(this.candidateFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/recruitment/candidate-list/'])
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

  handleUploadFileResume(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });

      } else {
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
      }

    }
  }

  async fileUploadVerifyNo() {
    try {
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.candidateSer.candidateLogoUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'logo') {
          this.candidateFormGroup.controls.filePath.setValue(result.fileName)

        }
        else if (this.filedPathName === 'resume') {
          this.candidateFormGroup.controls.resumeFilepath.setValue(result.fileName)
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
      this._snackBar.open(error.error.message, '', {
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
      const result: any = await this.candidateSer.candidateLogoUpload(formData);
      if (result.status === '1') {

        if (this.filedPathName === 'logo') {
          this.candidateFormGroup.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'resume') {
          this.candidateFormGroup.controls.resumeFilepath.setValue(result.fileName)
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
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllJobDetail() {
    try {
      const result: any = await this.jobSer.getAllJobDetail()
      if (result.status) {
        this.jobDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async singleJobDetail(id: any) {
    try {
      this.isReferenceShow = true;
      const result: any = await this.jobSer.singleJobDetail(id)
      if (result.status) {
        console.log()
        const skillValue = result.data.requiredSkills.map((object: any) => object.skillName).join(', ');

        this.candidateFormGroup.patchValue({
          jobId: result.data._id,
          skills: skillValue
        })

      }
    } catch (error) {
      console.log(error)
    }

  }
  ngOnDestroy(): void {
    this.jobSer.dataTransfer.next({});
    this.unsunscribeTigger.unsubscribe()
  }

  // async getAllDesignationDetail() {
  //   try {
  //     const result: any = await this.designationSer.getAllDesignationDetails()
  //     if (result.status === '1') {
  //       this.designationDetail = result.data
  //     }
  //   } catch (error) {
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }
  // }

  // async getAllDepartmentDetail() {
  //   try {
  //     const result: any = await this.departmentSer.getAlldepartmentDetails()
  //     console.log(result)
  //     if (result.status === '1') {
  //       this.departmentDetail = result.data
  //       console.log(result.data)
  //     }
  //   } catch (error) {
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }
  // }

  // handleDeperament(event: any) {
  //   if (event.target.value) {
  //     const findDetails = this.departmentDetail.find((el: any) => el._id === event.target.value);
  //     if (findDetails) {
  //       this.candidateFormGroup.controls.departmentId.setValue(findDetails.departmentId)
  //       this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === findDetails.departmentId)
  //     }
  //   }
  // }

  // handleDesignation(event: any) {
  //   if (event.target.value) {
  //     const findDesginationDetails = this.designationDetail.find((el: any) => el._id === event.target.value);
  //     if (findDesginationDetails) {
  //       this.candidateFormGroup.controls.designationId.setValue(findDesginationDetails.designationId)

  //     }

  //   }
  // }

  validateDOB() {
    this.dobTouched = true;
    const dobControl = this.candidateFormGroup.get('dob');
    if (dobControl && dobControl.dirty) {
      const dob = new Date(dobControl.value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      if (age < 18) {
        dobControl.setErrors({ 'underAge': true });
      } else {
        dobControl.setErrors(null);
      }
    }
  }

}
