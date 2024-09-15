
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import { AssetService } from 'src/app/modules/asset/services/asset/asset.service';
import { ViewImageComponent } from 'src/app/modules/setting/components/viewImage/view-image/view-image.component';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';

@Component({
  selector: 'app-view-my-profile',
  templateUrl: './view-my-profile.component.html',
  styleUrls: ['./view-my-profile.component.css']
})
export class ViewMyProfileComponent implements OnInit {

  skillFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  profileId: any = ''
  sameAsPresentAddress: boolean = false;
  imageSrc: any = '';
  countryDetials: any = [];
  languageDetails: any;
  stateDetails: any;
  citiesDetails: any;
  isLookValue: any = false;
  profileDetails: any = []
  assetDetail: any = []
  isImageShow: any = false;
  filePath: any = '';
  documentTypeList: any = [];
  resultData: any = [];
  leaveBalanceDetail: any = []


  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ViewMyProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myprofileSer: MyProfileService,
    private assetSer: AssetService,
    public dialog: MatDialog,

  ) { 
    const dialogContainer = document.querySelector('.container-fluid');
    if (dialogContainer) {
      dialogContainer.scrollTop = 0;
    }
  }

  ngOnInit(): void {
    this.profileId = this.data
    this.createdata()
    this.singleProfileDetail()
  }


  createdata(data?: any) {
    if (data) {
      if (data.salary_details.length !== 0) {
        var valueDetails = Object.values(data.salary_details[0]);
        var sum = valueDetails.reduce((acc: any, val: any) => Number(acc) + Number(val), 0);
        const formatter = new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          minimumFractionDigits: 2,
        });
        data.salary_details.map((salary:any) => {
          console.log(salary, 'salary')
          // Loop through the keys in the object
          for (const key in salary) {
            // Convert the string to a number and format it
            salary[key] = formatter.format(Number(salary[key]));
          }
          // return salary;
        }); 
      }
      data.totalEarning = sum;
      // console.log(data.salary_details[0], 'data.salary_details[0]')

        this.skillFormGroup = this.fb.group({
            employeeId: [''],
            firstName: ['', Validators.required],
            middleName: [''],
            filePath: [''],
            lastName: [''],
            userStatus: ['', Validators.required],
            totalEarning: [sum],
            gender: ['', Validators.required],
            dob: ['', Validators.required],
            dateOfJoining: [''],
            martialStatus: [''],
            bloodGroup: [''],
            mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
            mailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
            alternatemailId: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
            designation: ['', Validators.required],
            department: ['', Validators.required],
            reportingManager: ['', Validators.required],
            role: ['', Validators.required],
            roleId: ['', Validators.required],
            locationId: [''],
            defaultShift: [''],
            employeeTypeId: ['', Validators.required],
            totalSalaryAmount: [''],
            earningTotalAmount: [''],
            deductionTotalAmount: [''],
            salary_details: data.salary_details ? this.fb.array(data.salary_details) : this.fb.array([]),

            documents: this.fb.group({
                education: data.documents?.education ? this.fb.array(data.documents.education.map((el: any) => this.getQualification(el))) : this.fb.array([]),
                company: data.documents?.company ? this.fb.array(data.documents.company.map((el: any) => this.getWorkExperience(el))) : this.fb.array([]),
            }),
            kycList: data.kycList ? this.fb.array(data.kycList.map((el: any) => this.createKycFormFields(el))) : this.fb.array([]),
            medicalList: data.medicalList ? this.fb.array(data.medicalList.map((el: any) => this.getMedical())) : this.fb.array([]),
            workExperienceList: data.workExperienceList ? this.fb.array(data.workExperienceList.map((el: any) => this.getWorkExperience(el))) : this.fb.array([]),

            address: this.fb.group({
                presentAddress: this.fb.group({
                    address: [''],
                    countryId: [''],
                    country: [''],
                    city: [''],
                    stateId: [''],
                    state: [''],
                    pinCode: [''],
                }),
                sameAsPresentAddress: [this.sameAsPresentAddress],
                permanentAddress: this.fb.group({
                    address: [''],
                    countryId: [''],
                    country: [''],
                    city: [''],
                    stateId: [''],
                    state: [''],
                    pinCode: [''],
                }),
            }),
            dependentList: data.dependentList ? this.fb.array(data.dependentList.map((el: any) => this.getDependent(el))) : this.fb.array([]),

            earningList: data.earningList ? this.fb.array(data.earningList.map((el: any) => this.addEarning(el))) : this.fb.array([]),
            deductionList: data.deductionList ? this.fb.array(data.deductionList.map((el: any) => this.addDeduction(el))) : this.fb.array([]),

            templateId: [''],
            assetList: this.fb.array([this.getAssetData()]),

            bankDetail: this.fb.group({
                bankName: [''],
                branchName: [''],
                accountNo: [''],
                accountHolderName: [''],
                ifceCode: [''],
                bankAddress: [''],
            })
        });

        // Update form control values and calculations
        this.skillFormGroup.get('address.sameAsPresentAddress').valueChanges.subscribe((checked: boolean) => {
            this.updatePermanentAddress();
        });
        this.skillFormGroup.patchValue(data);
        this.profileDetails = this.profileDetails.filter((el: any) => el.employeeId !== data.employeeId);

        let totalEranAmount: any = 0;
        if (data.earningList) {
            this.skillFormGroup.value.earningList.map((el: any) => {
                totalEranAmount += Number(el.annualAmount);
            });
        }
        this.skillFormGroup.controls.earningTotalAmount.setValue(totalEranAmount);

        let totalEranAmountDec: any = 0;
        if (data.deductionList) {
            this.skillFormGroup.value.deductionList.map((el: any) => {
                totalEranAmountDec += Number(el.annualAmount1);
            });
        }
        this.skillFormGroup.controls.deductionTotalAmount.setValue(totalEranAmountDec);

        let totalAmount = Number(this.skillFormGroup.value.earningTotalAmount) - Number(this.skillFormGroup.value.deductionTotalAmount);
        this.skillFormGroup.controls.totalSalaryAmount.setValue(Math.max(totalAmount, 0));

        return;
    }

    // Default form setup if data is not provided or missing key fields
    this.skillFormGroup = this.fb.group({
        userStatus: ['O', Validators.required],
        employeeId: ['', Validators.required],
        firstName: ['', Validators.required],
        middleName: [''],
        filePath: [''],
        lastName: [''],
        gender: ['', Validators.required],
        dob: ['', Validators.required],
        dateOfJoining: [''],
        martialStatus: [''],
        bloodGroup: [''],
        mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        mailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
        alternatemailId: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
        designation: ['', Validators.required],
        department: [''],
        reportingManager: [''],
        role: [''],
        locationId: [''],
        defaultShift: [''],
        employeeTypeId: [''],
        roleId: ['', Validators.required],
        kycList: this.fb.array([this.createKycFormFields()]),
        documents: this.fb.group({
            company: this.fb.array([this.getWorkExperience()]),
            education: this.fb.array([this.getQualification()]),
        }),
        medicalList: this.fb.array([this.getMedical()]),
        address: this.fb.group({
            presentAddress: this.fb.group({
                address: [''],
                countryId: [''],
                country: [''],
                city: [''],
                stateId: [''],
                state: [''],
                pinCode: [''],
            }),
            sameAsPresentAddress: [this.sameAsPresentAddress],
            permanentAddress: this.fb.group({
                address: [''],
                countryId: [''],
                country: [''],
                city: [''],
                stateId: [''],
                state: [''],
                pinCode: [''],
            }),
        }),
        dependentList: this.fb.array([this.getDependent()]),
        salary_details: this.fb.array([]),
        earningList: this.fb.array([this.addEarning()]),
        deductionList: this.fb.array([this.addDeduction()]),
        templateId: [{ value: '', disabled: true }],
        assetList: this.fb.array([this.getAssetData()]),
        bankDetail: this.fb.group({
            bankName: [''],
            branchName: [''],
            accountNo: [''],
            accountHolderName: [''],
            ifceCode: [''],
            bankAddress: [''],
        })
    });

    this.skillFormGroup.get('address.sameAsPresentAddress')?.valueChanges.subscribe((checked: boolean) => {
        this.updatePermanentAddress();
    });
}



  updatePermanentAddress() {
    this.sameAsPresentAddress = !this.sameAsPresentAddress;
    console.log(this.sameAsPresentAddress, 'sameaa');

    if (this.sameAsPresentAddress) {
      const presentAddress = this.skillFormGroup.get('address.presentAddress').value;
      this.skillFormGroup.get('address.permanentAddress').patchValue(presentAddress);
    } else {
      this.skillFormGroup.get('address.permanentAddress').reset(); // Reset the permanent address if checkbox is unchecked
    }
  }





  get KYCControllers() {
    return this.skillFormGroup.get('kycList') as FormArray
  }

  createKycFormFields(data?: any) {
    if (data) {
      this.documentTypeList.map((el: any) => {
        if (el.description === data.documentType) {
          el.disable = true
        }
      })
    }
    return this.fb.group({
      documentType: [''],
      documentNumber: [''],
      uploadFile: [''],

    })
  }


  addDocumentType() {
    this.KYCControllers.push(this.createKycFormFields())
  }

  removeDocumentType(index: any, documentType: any) {
    if (documentType) {
      this.documentTypeList.map((el: any) => {
        if (el.description === documentType) {
          el.disable = false
        }
      })
    }
    this.KYCControllers.removeAt(index)
  }

  getAssetData() {
    return this.fb.group({
      assetId: [''],
      assetName: [''],
      assetType: ['']
    })
  }

  get assetDetails() {
    return this.skillFormGroup.get('assetList') as FormArray
  }

  addAsset() {
    this.assetDetails.push(this.getAssetData())
  }
  deleteAsset(index: any) {
    this.assetDetails.removeAt(index)
  }


  // updatePermanentAddress() {
  //   this.sameAsPresentAddress = !this.sameAsPresentAddress;
  //   if (this.sameAsPresentAddress) {
  //     const presentAddress = this.skillFormGroup.get('presentAddress').value;
  //     this.skillFormGroup.get('permanentAddress').patchValue(presentAddress);
  //   } else {
  //     this.skillFormGroup.get('permanentAddress').reset(); // Reset the permanent address if checkbox is unchecked
  //   }
  // }
  getQualification(data?: any): FormGroup {
    if (data) {
      return this.fb.group({
        education: [data.education],
        univercity: [data.univercity],
        education_start_date: [data.education_start_date],
        education_end_date: [data.education_end_date],
        education_student_id: [data.education_student_id],
        education_program_type: [data.education_program_type],
        education_marks_cgpa: [data.education_marks_cgpa],
        attachCertificate: [data.attachCertificate],
      })
    }
    return this.fb.group({
      education: [''],
      univercity: [''],
      education_start_date: [''],
      education_end_date: [''],
      education_student_id: [''],
      education_program_type: [''],
      education_marks_cgpa: [''],
      attachCertificate: [''],
    })
  }
  get qualificationDetail() {
    return (this.skillFormGroup.get('documents') as FormGroup).get('education') as FormArray
  }

  addQualification() {
    this.qualificationDetail.push(this.getQualification())
  }
  deleterow(index: any) {
    this.qualificationDetail.removeAt(index);
  }
  getMedical(): FormGroup {
    return this.fb.group({
      healthQuestion: [''],
      yesCheck: ['yes'],
      no: [''],
      date: ['']
    })

  }

  get medicalDetailArray() {
    return this.skillFormGroup.get('medicalList') as FormArray
  }

  addMedical() {
    this.medicalDetailArray.push(this.getMedical())
  }
  deleterow1(index: any) {
    this.medicalDetailArray.removeAt(index);
  }

  getWorkExperience(data?: any): FormGroup {
    if (data) {
      return this.fb.group({
        companyName: [data.companyName],
        totalExperience: [data.totalExperience],
        experienceLetterFilePath: [data.experienceLetterFilePath],
        hikeLetterFilePath: [data.hikeLetterFilePath],
        paySlipFilePath: [data.paySlipFilePath],
        company_start_date: [data.company_start_date],
        company_end_date: [data.company_end_date],
        company_reporting_manager: [data.company_reporting_manager],
        company_reporting_manager_designation: [data.company_reporting_manager_designation],
        company_employee_id: [data.company_employee_id],
        company_reason_for_leaving: [data.company_reason_for_leaving]

      })
    }
    return this.fb.group({
      companyName: [''],
      totalExperience: [''],
      experienceLetterFilePath: [''],
      hikeLetterFilePath: [''],
      paySlipFilePath: [''],
      company_start_date: [''],
      company_end_date: [''],
      company_reporting_manager: [''],
      company_reporting_manager_designation: [''],
      company_employee_id: [''],
      company_reason_for_leaving: ['']

    })
  }

  get workExperienceDetailArray() {
    return (this.skillFormGroup.get('documents') as FormGroup).get('company') as FormArray
  }

  addworkExperience() {
    this.workExperienceDetailArray.push(this.getWorkExperience())
  }
  deleterow2(index: any) {
    this.workExperienceDetailArray.removeAt(index);
  }


  addEarning(el?: any) {
    if (el) {
      return this.fb.group({
        salaryComponent: [el.salaryComponent],
        // monthlyAmount: [''],
        annualAmount: [''],
      })
    }
    return this.fb.group({
      salaryComponent: [''],
      annualAmount: [''],
    })
  }

  get earningDetail() {
    return this.skillFormGroup.get('earningList') as FormArray
  }

  addEarningDetail(ele: any) {
    this.earningDetail.push(this.addEarning(ele))

  }
  deleteRow(index: any) {
    this.earningDetail.removeAt(index)
  }

  addDeduction(el?: any) {
    if (el) {
      return this.fb.group({
        salaryComponent1: [el.salaryComponent1],
        annualAmount1: [''],
      })
    }
    return this.fb.group({
      salaryComponent1: [''],
      deductionTotalAmount: [''],
      // monthlyAmount1: [''],
      annualAmount1: [''],
    })
  }

  get deductionDetail() {
    return this.skillFormGroup.get('deductionList') as FormArray
  }

  deleteRowDection(index: any) {
    this.deductionDetail.removeAt(index)
  }

  addDeductionDetail(ele: any) {
    this.deductionDetail.push(this.addDeduction(ele))
  }


  getDependent(el?: any) {
    if (el) {
      return this.fb.group({
        fullName: [el.fullName],
        newAddress: [el.newAddress],
        emailIdNew: [el.emailIdNew],
        mobilePhone: [el.mobilePhone],
        relationShip: [el.relationShip],
        occupation: [el.occupation],
      })
    }
    return this.fb.group({
      fullName: [''],
      newAddress: [''],
      emailIdNew: [''],
      mobilePhone: [''],
      relationShip: [''],
      occupation: [''],

    })
  }
  get dependentDetail() {
    return this.skillFormGroup.get('dependentList') as FormArray
  }

  addDependent() {
    this.dependentDetail.push(this.getDependent())
  }
  deleteRow3(index: any) {
    this.dependentDetail.removeAt(index)
  }






  //get single detail



  async singleProfileDetail() {
    try {
      const result: any = await this.myprofileSer.singleMyProfileDetails(this.profileId)
      console.log(result.data);
      this.getAllAssetDetal()
      this.resultData = result.data
      // this.getAllLeaveBalanceDetail()

      if (result.status === '401') {
        this.router.navigate(['/'])
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

      if (result.status) {
        this.resultData = result.data
        this.createdata(result.data)
        if (result.data.filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
        if (result?.data?.designation?._id && result?.data?.department?._id && result?.data?.locationId?._id) {
          this.skillFormGroup.controls['designation'].setValue(result.data.designation.designationName);
          this.skillFormGroup.controls['department'].setValue(result.data.department.departmentName);
          this.skillFormGroup.controls['locationId'].setValue(result.data.locationId.locationName);
          this.skillFormGroup.controls['employeeTypeId'].setValue(result.data.employeeTypeId.employeeType);
          this.skillFormGroup.controls['defaultShift'].setValue(result.data.defaultShiftName);


        } else {
          console.error('Invalid result structure:', result);
        }
        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.skillFormGroup.get('address.presentAddress.countryId').value);
        console.log(this.stateDetails, 'statw', this.countryDetials);
        if (this.stateDetails) {
          const findCity = this.stateDetails.states.find((el: any) => el._id === this.skillFormGroup.get('address.presentAddress.stateId').value);
          this.citiesDetails = findCity.cities[0]
        }

      }
    } catch (error) {
      console.log(error)
    }
  }


  async getAllAssetDetal() {
    try {
      const result: any = await this.assetSer.getAllassetAllocationDetails();
      if (result.status === '1') {
        console.log(result.data, this.resultData.employeeId, 'jjjjjj')
        this.assetDetail = result.data.filter((el: any) => el.employeeId === this.resultData.employeeId);
        console.log(this.assetDetail, 'this.assetDetail')
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllLeaveBalanceDetail() {
    try {
      const userName = this.resultData
      console.log(userName, 'username');
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const result: any = await this.myprofileSer.getAllLeaveBalanceDetailsOfEmployee(year)
      if (result) {
        this.leaveBalanceDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  openDialog(fileName: any, i: any, type: any) {
    if (type === 'education') {
      const dialogRef = this.dialog.open(ViewPdfFileComponent, {
        data: fileName,
        width: '1000px',
        height: '700px'
      });

      dialogRef.afterClosed().subscribe((result: any) => {
      });
      return
    }
    console.log(this.skillFormGroup.value.kycList[i].uploadFile);
    const splitValue = this.skillFormGroup.value.kycList[i].uploadFile.split('.');
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

    // let result: any;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  close() {
    this.dialogRef.close()
  }

}

