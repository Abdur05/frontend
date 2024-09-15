import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { AppraisalCycleService } from '../../../services/appraisal-cycle/appraisal-cycle.service';

@Component({
  selector: 'app-edit-appraisal-cycle',
  templateUrl: './edit-appraisal-cycle.component.html',
  styleUrls: ['./edit-appraisal-cycle.component.css']
})
export class EditAppraisalCycleComponent {
  @ViewChild('inputFile') inputFile: any;
  skillFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  designationList: any = [''];
  filedPathName: any = '';
  inputControl: any = '';
  selectedFile: any = '';
  fileName: any = '';
  imageSrc: any = '';
  indexValue1: any = '';
  indexValue2: any = '';
  indexValue3: any = '';
  indexValue4: any = '';
  indexValue5: any = '';
  selectedFileVerfiy: any = '';
  appraisalCycleId: any = ''
  isImageShow: any = false;
  filePath: any = '';
  bsValueRange: any = []
  bsValueRange1: any = []
  bsValueRange2: any = []
  bsValueRange3: any = []
  bsValueRange4: any = []
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private desginationSer: DesignationService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private appraisalCycleSer: AppraisalCycleService,
    private activatedRouter: ActivatedRoute
  ) {
    this.getDesignationDetails()

  }

  ngOnInit(): void {
    this.appraisalCycleId = this.activatedRouter.snapshot.paramMap.get('id')
    this.createFormFields()
    this.getSingleAppraisalCycleDetails()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createFormFields() {
    this.skillFormGroup = this.fb.group({
      _id: ['', Validators.required],
      appraisalName: ['', [Validators.required]],
      dates: [''],
      appraisalCyclePeriodStart: [''],
      appraisalCyclePeriodEnd: ['', [Validators.required]],
      description: ['', [Validators.required]],
      filePath: ['', [Validators.required]],
      appraisalProcessConfigurationDetails: this.fb.group({
        processPeriod: [''],
        selfAppraisal: ['N'],
        selfAppraisalPeriod: [''],
        reviewPeriod: [''],
        salaryHike: ['N'],
        normalizationPeriod: ['']
      }),
      moduleRating: this.fb.group({
        ratingType: [''],
        decimalPointsScore: [''],
        finalScore: ['']
      }),
      ratingScoreRange: this.fb.group({
        lockRating: ['N'],
        rateingField1: ['Outstanding'],
        rateingField2: [4.0],
        rateingField3: [5.1],
        rateingField21: ['Excellent'],
        rateingField22: [3.0],
        rateingField23: [4.1],
        rateingField31: ['Satisfactory'],
        rateingField32: [2.0],
        rateingField33: [3.1],
        rateingField41: ['Needs Improvement'],
        rateingField42: [1.0],
        rateingField43: [2.1],
        rateingField51: ['UnSatisfactory'],
        rateingField52: [0.0],
        rateingField53: [1.1]
      }),
      reviewers: this.fb.array([this.createReviewersFields()])
    })
  }

  get reviewersControllers() {
    return this.skillFormGroup.get('reviewers') as FormArray
  }

  createReviewersFields() {
    return this.fb.group({
      basedOn: [''],
      tagTo: [''],
      weightage: ['']
    })
  }

  addReviewers() {
    this.reviewersControllers.push(this.createReviewersFields())
  }

  removeReviewers(index: any) {
    this.reviewersControllers.removeAt(index);
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  async getDesignationDetails() {
    try {
      const result: any = await this.desginationSer.getAllDesignationDetails();
      console.log(result, 'result')
      if (result.status === '1') {
        this.designationList = result.data
      }
    } catch (error) {
      console.error(error);
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getSingleAppraisalCycleDetails() {
    try {
      const result: any = await this.appraisalCycleSer.singleAppraisalCycleDetail(this.appraisalCycleId);
      console.log(result, 'single');

      if (result.status === true) {
        this.skillFormGroup.patchValue(result.data)
        if (result.data.filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
        this.bsValueRange = [new Date(result.data.appraisalCyclePeriodStart), new Date(result.data.appraisalCyclePeriodEnd)]
        this.bsValueRange1 = [new Date(result.data.appraisalProcessConfigurationDetails.processPeriodStart), new Date(result.data.appraisalProcessConfigurationDetails.processPeriodEnd)]
        this.bsValueRange2 = [new Date(result.data.appraisalProcessConfigurationDetails.selfAppraisalPeriodStart), new Date(result.data.appraisalProcessConfigurationDetails.selfAppraisalPeriodEnd)]
        this.bsValueRange3 = [new Date(result.data.appraisalProcessConfigurationDetails.reviewPeriodStart), new Date(result.data.appraisalProcessConfigurationDetails.reviewPeriodEnd)]
        this.bsValueRange4 = [new Date(result.data.appraisalProcessConfigurationDetails.normalizationPeriodStart), new Date(result.data.appraisalProcessConfigurationDetails.normalizationPeriodEnd)]


        console.log(this.bsValueRange, result.data.appraisalProcessConfigurationDetails.processPeriodStart, 'SINNNNNN', result.data.appraisalCyclePeriodEnd);


      }
    } catch (error: any) {
      console.log(error)


    }
  }


  onValueChange(event: any) {
    if (Array.isArray(event) && event.length === 2) {
      const [startDate, endDate] = event;

      const currentDate = new Date(startDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      console.log(fullDate, 'full');
      const currentDate2 = new Date(endDate);
      const year2 = currentDate2.getFullYear();
      const month2 = currentDate2.getMonth() + 1;
      const day2 = currentDate2.getDate();
      const fullDate2 = `${year2}-${month2.toString().padStart(2, '0')}-${day2.toString().padStart(2, '0')} `;


      this.skillFormGroup.get('appraisalCyclePeriodStart').setValue(fullDate);

      this.skillFormGroup.get('appraisalCyclePeriodEnd').setValue(fullDate2);
    }
  }


  onValueProcessPeriod(event: any) {
    if (Array.isArray(event) && event.length === 2) {
      console.log(event);

      const [startDate, endDate] = event;
      const currentDate = new Date(startDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      console.log(fullDate, 'full');
      const currentDate2 = new Date(endDate);
      const year2 = currentDate2.getFullYear();
      const month2 = currentDate2.getMonth() + 1;
      const day2 = currentDate2.getDate();
      const fullDate2 = `${year2}-${month2.toString().padStart(2, '0')}-${day2.toString().padStart(2, '0')} `;

      this.skillFormGroup.get('appraisalProcessConfigurationDetails.processPeriodStart').setValue(fullDate);
      this.skillFormGroup.get('appraisalProcessConfigurationDetails.processPeriodEnd').setValue(fullDate2);
    }
  }

  onValueSelfAppraisal(event: any) {
    if (Array.isArray(event) && event.length === 2) {
      console.log(event);

      const [startDate, endDate] = event;
      const currentDate = new Date(startDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      console.log(fullDate, 'full');
      const currentDate2 = new Date(endDate);
      const year2 = currentDate2.getFullYear();
      const month2 = currentDate2.getMonth() + 1;
      const day2 = currentDate2.getDate();
      const fullDate2 = `${year2}-${month2.toString().padStart(2, '0')}-${day2.toString().padStart(2, '0')} `;

      this.skillFormGroup.get('appraisalProcessConfigurationDetails.selfAppraisalPeriodStart').setValue(fullDate);
      this.skillFormGroup.get('appraisalProcessConfigurationDetails.selfAppraisalPeriodEnd').setValue(fullDate2);
    }
  }

  onValueReviewPeriod(event: any) {
    if (Array.isArray(event) && event.length === 2) {
      console.log(event);

      const [startDate, endDate] = event;
      const currentDate = new Date(startDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      console.log(fullDate, 'full');
      const currentDate2 = new Date(endDate);
      const year2 = currentDate2.getFullYear();
      const month2 = currentDate2.getMonth() + 1;
      const day2 = currentDate2.getDate();
      const fullDate2 = `${year2}-${month2.toString().padStart(2, '0')}-${day2.toString().padStart(2, '0')} `;

      this.skillFormGroup.get('appraisalProcessConfigurationDetails.reviewPeriodStart').setValue(fullDate);
      this.skillFormGroup.get('appraisalProcessConfigurationDetails.reviewPeriodEnd').setValue(fullDate2);
    }
  }
  onValueNormalizationPeriod(event: any) {
    if (Array.isArray(event) && event.length === 2) {
      console.log(event);

      const [startDate, endDate] = event;
      const currentDate = new Date(startDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} `;

      console.log(fullDate, 'full');
      const currentDate2 = new Date(endDate);
      const year2 = currentDate2.getFullYear();
      const month2 = currentDate2.getMonth() + 1;
      const day2 = currentDate2.getDate();
      const fullDate2 = `${year2}-${month2.toString().padStart(2, '0')}-${day2.toString().padStart(2, '0')} `;

      this.skillFormGroup.get('appraisalProcessConfigurationDetails.normalizationPeriodStart').setValue(fullDate);
      this.skillFormGroup.get('appraisalProcessConfigurationDetails.normalizationPeriodEnd').setValue(fullDate2)
    }
  }


  async submitData() {
    try {
      console.log(this.skillFormGroup);

      this.isSubmitted = true
      if (this.skillFormGroup.invalid)
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

      this.skillFormGroup.value.createdOn = fullDate
      this.skillFormGroup.value.createdBy = username
      this.skillFormGroup.value.changedOn = fullDate
      this.skillFormGroup.value.changedBy = username


      const result: any = await this.appraisalCycleSer.updateAppraisalCycleDetail(this.skillFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/appraisal/appraisal-cycle-list'])
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

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }
  deleteImage() {
    this.isImageShow = false;
    this.filePath = ''
  }


  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {

        const file = event.target.files[0];

        const reader = new FileReader();

        this.fileName = event.target.files[0].name;
        this.selectedFile = event.target.files[0];
        reader.onload = e => this.imageSrc = reader.result;

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

  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

  async fileUploadVerifyNo() {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.appraisalCycleSer.GuideLinesUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'company_no') {
          this.skillFormGroup.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.skillFormGroup.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.skillFormGroup.controls.vatRegistrationFilePath.setValue(result.fileName)
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
      const result: any = await this.appraisalCycleSer.GuideLinesUpload(formData);
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        if (this.filedPathName === 'log') {
          this.skillFormGroup.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'company_no') {
          this.skillFormGroup.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.skillFormGroup.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.skillFormGroup.controls.vatRegistrationFilePath.setValue(result.fileName)
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


  handleCheckBox(event: any, name: any) {
    if (event.target.value) {
      if (event.target.checked) {
        this.skillFormGroup.get('appraisalProcessConfigurationDetails').setValue({
          [name]: 'Y',
        });

      } else {
        this.skillFormGroup.get('appraisalProcessConfigurationDetails').setValue({
          [name]: 'N',
        });
      }
    }
  }

  handleCheckBox1(event: any, name: any) {
    if (event.target.value) {
      console.log(this.skillFormGroup.get('ratingScoreRange'))
      if (event.target.checked) {

        this.skillFormGroup.get('ratingScoreRange').setValue({
          [name]: 'Y',
        });

      } else {
        this.skillFormGroup.get('ratingScoreRange').setValue({
          [name]: 'N',
        });
      }
    }
  }
}