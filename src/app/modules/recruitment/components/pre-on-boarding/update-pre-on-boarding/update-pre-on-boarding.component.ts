import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';
import { ViewImageComponent } from 'src/app/modules/setting/components/viewImage/view-image/view-image.component';
import { MatAccordion } from '@angular/material/expansion';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';

@Component({
  selector: 'app-update-pre-on-boarding',
  templateUrl: './update-pre-on-boarding.component.html',
  styleUrls: ['./update-pre-on-boarding.component.css']
})
export class UpdatePreOnBoardingComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  preOnBoardingFormGroup: any = FormGroup
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
  candidatedataId: any = ''
  candidatesId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private candidateSer: CandidateService,
    private activateRouter: ActivatedRoute,
    public dialog: MatDialog,
    private preOnboardSer: PreOnboardingService
  ) { }

  ngOnInit(): void {
    this.candidatedataId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getSinglecandidateDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.preOnBoardingFormGroup = this.fb.group({
      // _id: ['', Validators.required],
      candidateId: [''],
      email: [''],
      firstName: [''],
      lastName: [''],
      dob: [''],
      gender: [''],
      education: this.fb.array([this.createEmployeeGroup()]),
      companyName: this.fb.array([this.createCompanyGroup()])
    });
  }

  createEmployeeGroup() {
    return this.fb.group({
      education: ['', Validators.required],
      education_start_date: ['', Validators.required],
      education_end_date: ['', Validators.required],
      education_student_id: ['', Validators.required],
      education_program_type: ['', Validators.required],
      education_marks_cgpa: ['', Validators.required],
      univercity: ['', Validators.required],
      attachCertificate: ['', Validators.required]
    })
  }

  get educationDetail() {
    return this.preOnBoardingFormGroup.get('education') as FormArray
  }

  addEductaionDetail() {
    this.educationDetail.push(this.createEmployeeGroup())
  }
  deleteEductaionRow(index: any) {
    this.educationDetail.removeAt(index)
  }

  createCompanyGroup() {
    return this.fb.group({
      companyName: ['', Validators.required],
      totalExperience: ['', Validators.required],
      experienceLetterFilePath: ['', Validators.required],
      hikeLetterFilePath: [''],
      company_start_date: ['', Validators.required],
      company_end_date: ['', Validators.required],
      company_reporting_manager: ['', Validators.required],
      company_reporting_manager_designation: ['', Validators.required],
      company_employee_id: ['', Validators.required],
      company_reason_for_leaving: ['', Validators.required],
      paySlipFilePath: ['', Validators.required]
    })
  }

  get companyDetail() {
    return this.preOnBoardingFormGroup.get('companyName') as FormArray
  }

  addDetail() {
    this.companyDetail.push(this.createCompanyGroup())
  }
  deleteRow(index: any) {
    this.companyDetail.removeAt(index)
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
      console.log(result.data[0].candidateId);
      this.candidatesId = result.data[0].candidateId;
      if (result.data.length > 0) {
        this.preOnBoardingFormGroup.patchValue(result.data[0])
        console.log('formGroup :', result.data[0].filePath);

        if (result.data[0].filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data[0].filePath
        }

        //   const jobData = result.data;
        // const job = jobData.job_details._id;
        // console.log(job,'job');

        //   this.preOnBoardingFormGroup.patchValue({
        //     jobId: jobName
        //   })


      }
    } catch (error: any) {
      console.log(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.preOnBoardingFormGroup.value);

      if (this.preOnBoardingFormGroup.invalid)
        return
      console.log('Candidate ID:', this.preOnBoardingFormGroup.get('candidateId').value);
      const formData = new FormData();



      this.preOnBoardingFormGroup.value.companyName.map((el: any) => {
        formData.append('experienceLetterFilePath', el.experienceLetterFilePath);
        formData.append('hikeLetterFilePath', el.hikeLetterFilePath);
        formData.append('paySlipFilePath', el.paySlipFilePath);
      })
      this.preOnBoardingFormGroup.value.education.map((el: any) => {
        formData.append('attachCertificate', el.attachCertificate);
      })
      this.preOnBoardingFormGroup.value.education.forEach((edu: any, index: any) => {
        formData.append(`education[${index}]`, edu.education);
        formData.append(`univercity[${index}]`, edu.univercity);
        formData.append(`education_start_date[${index}]`, edu.education_start_date);
        formData.append(`education_end_date[${index}]`, edu.education_end_date);
        formData.append(`education_student_id[${index}]`, edu.education_student_id);
        formData.append(`education_program_type[${index}]`, edu.education_program_type);
        formData.append(`education_marks_cgpa[${index}]`, edu.education_marks_cgpa);

        delete edu.attachCertificate
      });

      this.preOnBoardingFormGroup.value.companyName.forEach((comp: any, index: any) => {
        formData.append(`companyName[${index}]`, comp.companyName);
        formData.append(`totalExperience[${index}]`, comp.totalExperience);
        formData.append(`company_start_date[${index}]`, comp.company_start_date);
        formData.append(`company_end_date[${index}]`, comp.company_end_date);
        formData.append(`company_reporting_manager[${index}]`, comp.company_reporting_manager);
        formData.append(`company_reporting_manager_designation[${index}]`, comp.company_reporting_manager_designation);
        formData.append(`company_employee_id[${index}]`, comp.company_employee_id);
        formData.append(`company_reason_for_leaving[${index}]`, comp.company_reason_for_leaving);

        delete comp.experienceLetterFilePath;
        delete comp.hikeLetterFilePath;
        delete comp.paySlipFilePath;
      });
      console.log(formData)
      const result: any = await this.preOnboardSer.createPreOnboardingDetail(this.preOnBoardingFormGroup.value, formData)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/recruitment/pre-onBoarding-list/'])
        return
      }
      if (result.status) {
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


  handleUploadFile(event: any, index: any, inputAccess: any, formArrayName: any, controlName: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(event.target.files[0], 'fiel');
        const formArray = this.preOnBoardingFormGroup.get(formArrayName) as FormArray;
        const formGroup: any = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          [controlName]: event.target.files[0]
        })

        reader.readAsDataURL(file);
        // inputAccess.value = ''
      } else {
        this._snackBar.open('Only support image and PDF', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }




  openDialog(fileName: any) {
    const splitValue = this.preOnBoardingFormGroup.value.resumeFilepath.split('.');
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

  validateDates(departmentFormGroup: FormGroup, index:any) {
    const formArray = this.preOnBoardingFormGroup.get('education') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const startDate = formGroup.value.education_start_date;
    const endDate = formGroup.value.education_end_date;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      formGroup.get('education_end_date')?.setErrors({ invalidEndDate: true });
    } else {
      formGroup.get('education_end_date')?.setErrors(null);

    }
    
  }

  validateDates2(departmentFormGroup: FormGroup, index: any) {
    const formArray = this.preOnBoardingFormGroup.get('companyName') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    const startDate = formGroup.value.company_start_date;
    const endDate = formGroup.value.company_end_date;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      formGroup.get('company_end_date')?.setErrors({ invalidEndDate: true });
    } else {
      formGroup.get('company_end_date')?.setErrors(null);

    }

  }

}
