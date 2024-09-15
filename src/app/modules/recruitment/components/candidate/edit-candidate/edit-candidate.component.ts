import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { JobService } from '../../../services/jobs/-job.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';
import { ViewImageComponent } from 'src/app/modules/setting/components/viewImage/view-image/view-image.component';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';

@Component({
  selector: 'app-edit-candidate',
  templateUrl: './edit-candidate.component.html',
  styleUrls: ['./edit-candidate.component.css']
})
export class EditCandidateComponent implements OnInit {

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
  isImageShow: any = false;
  filePath: any = '';
  candidatedataId: any = '';
  isShowScreenMenu: any = true;
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
    private activateRouter: ActivatedRoute,
    public dialog: MatDialog,
   

  ) {
    this.data()
  }

  ngOnInit(): void {
    this.candidatedataId = this.activateRouter.snapshot.paramMap.get('id')
    this.getAllJobDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.candidateFormGroup = this.fb.group({
      _id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      jobId: [''],
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

  deleteImage() {
    this.isImageShow = false;
    this.filePath = ''
  }

  async getSinglecandidateDetails() {
    try {
      const result: any = await this.candidateSer.singlecandidateDetail(this.candidatedataId);
      console.log(result.data[0]);
      if (result.data.length > 0) {
        this.candidateFormGroup.patchValue(result.data[0])
        console.log('formGroup :', result.data[0].filePath);
        this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === result.data[0].departmentId)

        if (result.data[0].filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data[0].filePath
        }

        //   const jobData = result.data;
        // const job = jobData.job_details._id;
        // console.log(job,'job');

        //   this.candidateFormGroup.patchValue({
        //     jobId: jobName
        //   })


      }
    } catch (error: any) {
      console.log(error)
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



  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.candidateFormGroup.value);

      if (this.candidateFormGroup.invalid)
        return
      const result: any = await this.candidateSer.updatcandidateDetail(this.candidateFormGroup.value)
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
        this.getSinglecandidateDetails()
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  openDialog(fileName: any) {
    const splitValue = this.candidateFormGroup.value.resumeFilepath.split('.');
    console.log(splitValue[1], 'split');

    let dialogRef: any;
    if (splitValue[1] === 'pdf') {
      dialogRef = this.dialog.open(ViewPdfComponent, {
        data: fileName
      });
    }
    else {
      dialogRef = this.dialog.open(ViewImageComponent, {
        data: fileName
      });
    }

  }


  // async getAllDesignationDetail() {
  //   try {
  //     const result: any = await this.designationSer.getAllDesignationDetails()
  //     if (result.status === '1') {
  //       this.designationDetail = result.data
  //       this.getSinglecandidateDetails()
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
  //       this.getAllDesignationDetail()
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
