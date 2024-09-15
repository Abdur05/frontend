import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import { MedicalQuestionService } from 'src/app/modules/setting/services/medicalQuestion/medical-question.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';
import { RoleService } from 'src/app/modules/setting/services/role/role.service';
import { SalaryTemplateService } from 'src/app/modules/payroll/services/salary-template/salary-template.service';
import Swal from 'sweetalert2';
import { CompanyCodeService } from 'src/app/modules/setting/services/companyCode/company-code.service';
import { AssetAllocationService } from 'src/app/modules/asset/services/asset-allocation.service';
import { AssetService } from 'src/app/modules/asset/services/asset/asset.service';
import { ViewImageComponent } from 'src/app/modules/setting/components/viewImage/view-image/view-image.component';
import { MatDialog } from '@angular/material/dialog';
import { LocationService } from 'src/app/modules/setting/services/location/location.service';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';
import { ShiftMaintenanceService } from 'src/app/modules/setting/services/shift/shift-maintenance.service';
import { EmployeeTypeService } from 'src/app/modules/setting/services/employee-type/employee-type.service';
import { SalaryService } from 'src/app/modules/payroll/services/salary/salary.service';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent {


  departmentFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  imageSrc: any = '';
  @ViewChild('inputFile') inputFile: any;
  filedPathName: any = '';
  inputControl: any = '';
  questionDetail: any = []
  designationDetail: any = []
  departmentDetail: any = []
  profileId: any = ''
  sameAsPresentAddress: boolean = false;
  roleDetail: any = []
  salaryTempDetail: any = []
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
  dobTouched: boolean = false;
  today: string = '';
  locationDetail: any = []
  leaveBalanceDetail: any = []
  shiftDetail: any = []
  employeeTypeDetail: any = []
  isShowScreenMenu: any = true;
  filterDesignationList: any = [];
  filterRoleList: any = [];
  filterProfileDetails: any = [];
  salaryDetail: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profileSer: MyProfileService,
    private questionSer: MedicalQuestionService,
    private designationSer: DesignationService,
    private departmentSer: DepartmentService,
    private activatRouter: ActivatedRoute,
    private roleSer: RoleService,
    private salaryTempSer: SalaryTemplateService,
    private companyCodeSer: CompanyCodeService,
    private assetSer: AssetService,
    public dialog: MatDialog,
    private locationSer: LocationService,
    private shiftMaintenanceSer: ShiftMaintenanceService,
    private empTypeSer: EmployeeTypeService,
    private salarySer: SalaryService

  ) {
    this.getAllDocumentType()
    this.today = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.profileId = this.activatRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getAllQuestionDetail()
    this.getAllSalaryTemplateDetail()
    this.getCountryDetails()
    this.getAllEmployeeDetail()
    this.getAllLocationDetail()
    this.getAllShiftMaintenanceDetail()
    this.getAllEmployeeTypeDetail();
    this.getAllSalaryDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
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
        // data.salary_details.map((salary:any) => {
        //   console.log(salary, 'salary')
        //   // Loop through the keys in the object
        //   for (const key in salary) {
        //     // Convert the string to a number and format it
        //     salary[key] = formatter.format(Number(salary[key]));
        //   }
        //   // return salary;
        // });      
      }
      data.totalEarning = sum;
      // console.log(data.salary_details[0], 'data.salary_details[0]')
      this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === data?.department?.departmentId)
      this.filterProfileDetails = this.profileDetails.filter((el: any) => el.department === data?.department?._id)
      this.filterRoleList = this.roleDetail.filter((el: any) => (el.departmentId === data?.department?.departmentId && el.designationId === data?.designation?.designationId));
      this.departmentFormGroup = this.fb.group({
        // _id: ['', Validators.required],
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
        departmentName: [''],
        designationName: [''],
        locationName: [''],
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
        salary_details: this.fb.array(data.salary_details),
        documents: this.fb.group({
          education: data.documents.education ? this.fb.array(data.documents.education.map((el: any) => this.getQualification(el))) : this.fb.array([]),
          company: data.documents.company ? this.fb.array(data.documents.company.map((el: any) => this.getWorkExperience(el))) : this.fb.array([]),
        }),
        kycList: data.kycList ? this.fb.array(data.kycList.map((el: any) => this.createKycFormFields(el))) : this.fb.array([]),

        // qualificationList: data.qualificationList ? this.fb.array(data.qualificationList.map((el: any) => this.getQualification())) : this.fb.array([]),
        medicalList: data.medicalList ? this.fb.array(data.medicalList.map((el: any) => this.getMedical())) : this.fb.array([]),
        workExperienceList: data.workExperienceList ? this.fb.array(data.workExperienceList.map((el: any) => this.getWorkExperience())) : this.fb.array([]),

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

      })
      this.departmentFormGroup.get('address.sameAsPresentAddress').valueChanges.subscribe((checked: boolean) => {
        if (checked) {
          this.updatePermanentAddress();
        }
      });
      this.departmentFormGroup.patchValue(data)
      // this.profileDetails = this.profileDetails.filter((el: any) => el.employeeId !== data.employeeId)
      let totalEranAmount: any = 0
      this.departmentFormGroup.value.earningList.map((el: any, i: any) => {
        totalEranAmount = totalEranAmount + Number(el.annualAmount)
      })
      this.departmentFormGroup.controls.earningTotalAmount.setValue(totalEranAmount)

      let totalEranAmountDec: any = 0
      this.departmentFormGroup.value.deductionList.map((el: any, i: any) => {
        totalEranAmountDec = totalEranAmountDec + Number(el.annualAmount1)
      })
      this.departmentFormGroup.controls.deductionTotalAmount.setValue(totalEranAmountDec)
      let totalAmount = Number(this.departmentFormGroup.value.earningTotalAmount) - Number(this.departmentFormGroup.value.deductionTotalAmount);
      this.departmentFormGroup.controls.totalSalaryAmount.setValue(Number(totalAmount) > 0 ? Number(totalAmount) : 0)


      return
    }
    this.departmentFormGroup = this.fb.group({
      // _id: ['', Validators.required],
      userStatus: ['O', Validators.required],
      departmentName: [''],
      designationName: [''],
      locationName: [''],
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

    })

    this.departmentFormGroup.get('address.sameAsPresentAddress')?.valueChanges.subscribe((checked: boolean) => {
      this.updatePermanentAddress();
    });
  }


  get KYCControllers() {
    return this.departmentFormGroup.get('kycList') as FormArray;
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
    return this.departmentFormGroup.get('assetList') as FormArray
  }

  addAsset() {
    this.assetDetails.push(this.getAssetData())
  }
  deleteAsset(index: any) {
    this.assetDetails.removeAt(index)
  }

  get salary_detailsControllers() {
    return this.departmentFormGroup.get('salary_details') as FormArray
  }

  createSalaryDetailsFields() {
    return this.fb.group({
      type: [''],
      value: ['']
    })
  }

  addSalaryDetails() {
    this.salary_detailsControllers.push(this.createSalaryDetailsFields())
  }

  removeSalaryDetails(index: any, typeName: any) {
    this.salaryDetail.map((el: any) => {
      if (el.componentName === typeName) {
        el.disable = false
      }
    })
    this.salary_detailsControllers.removeAt(index);
  }



  updatePermanentAddress() {
    if (this.departmentFormGroup.get('address').get('sameAsPresentAddress').value) {
      const presentAddress = this.departmentFormGroup.get('address').get('presentAddress').value;
      this.departmentFormGroup.get('address').get('permanentAddress').patchValue(presentAddress);
    } else {
      this.departmentFormGroup.get('address').get('permanentAddress').reset();
    }
  }
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
        isNew: [false],
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
      isNew: [''],
    })
  }

  get qualificationDetail() {
    return (this.departmentFormGroup.get('documents') as FormGroup).get('education') as FormArray
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
    return this.departmentFormGroup.get('medicalList') as FormArray
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
        company_reason_for_leaving: [data.company_reason_for_leaving],
        isNew: [false],

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
      company_reason_for_leaving: [''],
      isNew: [''],

    })
  }

  get workExperienceDetailArray() {
    return (this.departmentFormGroup.get('documents') as FormGroup).get('company') as FormArray
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
    return this.departmentFormGroup.get('earningList') as FormArray
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
    return this.departmentFormGroup.get('deductionList') as FormArray
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
    return this.departmentFormGroup.get('dependentList') as FormArray
  }

  addDependent() {
    this.dependentDetail.push(this.getDependent())
  }
  deleteRow3(index: any) {
    this.dependentDetail.removeAt(index)
  }

  validateDates(departmentFormGroup: FormGroup) {
    const qualificationList = departmentFormGroup.get('qualificationList') as FormArray;

    for (let i = 0; i < qualificationList.length; i++) {
      const startDate = qualificationList.at(i).get('startDate')?.value;
      const endDate = qualificationList.at(i).get('endDate')?.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        qualificationList.at(i).get('endDate')?.setErrors({ 'invalidEndDate': true });
      } else {
        qualificationList.at(i).get('endDate')?.setErrors(null);
      }
    }
  }

  validateDates2(departmentFormGroup: FormGroup) {
    const workExperienceList = departmentFormGroup.get('workExperienceList') as FormArray;

    for (let i = 0; i < workExperienceList.length; i++) {
      const startDate = workExperienceList.at(i).get('startDate')?.value;
      const endDate = workExperienceList.at(i).get('endDate')?.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        workExperienceList.at(i).get('endDate')?.setErrors({ 'invalidEndDate': true });
      } else {
        workExperienceList.at(i).get('endDate')?.setErrors(null);
      }
    }
  }

  validateDOB() {
    this.dobTouched = true;
    const dobControl = this.departmentFormGroup.get('dob');
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





  //get single detail



  async singleProfileDetail() {
    try {
      const result: any = await this.profileSer.singleMyProfileDetails(this.profileId);

      if (result.status) {
        this.getAllAssetDetal()
        this.resultData = result.data
        // this.getAllLeaveBalanceDetail()

        this.createdata(result.data)
        if (result.data.filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
        if (result?.data?.designation?._id && result?.data?.department?._id && result?.data?.locationId?._id) {
          this.departmentFormGroup.controls['designation'].setValue(result.data.designation._id);
          this.departmentFormGroup.controls['department'].setValue(result.data.department._id);
          this.departmentFormGroup.controls['locationId'].setValue(result.data.locationId._id);
          this.departmentFormGroup.controls['locationName'].setValue(result.data.locationId.locationName);
          this.departmentFormGroup.controls['departmentName'].setValue(result.data.department.departmentName);
          this.departmentFormGroup.controls['designationName'].setValue(result.data.designation.designationName);
          this.departmentFormGroup.controls['employeeTypeId'].setValue(result.data.employeeTypeId._id);


        } else {
          console.error('Invalid result structure:', result);
        }
        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.departmentFormGroup.get('address.presentAddress.countryId').value);
        console.log(this.stateDetails, 'statw', this.countryDetials);
        if (this.stateDetails) {
          const findCity = this.stateDetails.states.find((el: any) => el._id === this.departmentFormGroup.get('address.presentAddress.stateId').value);
          this.citiesDetails = findCity.cities[0]
        }
        // console.log(findCity)

      }
    } catch (error) {
      console.log(error)
    }
  }






  async submitData() {
    console.log(this.departmentFormGroup.value, 'ooooo', this.departmentFormGroup);

    try {
      this.isSubmitted = true
      if (this.departmentFormGroup.invalid)
        return
      if (this.resultData.salary_details.length === 0) {
        var keysData: any = []
        var valueDate: any = []
        this.departmentFormGroup.value.salary_details.map((el: any) => {
          keysData.push(el.type)
          valueDate.push(el.value);
        });
        console.log(keysData, 'keys', valueDate)
        const reqBody = {
          salary_details: {

          }
        }
        keysData.map((el: any, i: any) => {
          reqBody.salary_details = { ...reqBody.salary_details, [el]: valueDate[i] }
        })
        this.departmentFormGroup.value.salary_details = [reqBody.salary_details];
      }
      if (this.departmentFormGroup.value.address.permanentAddress.pinCode) {
        this.departmentFormGroup.value.address.permanentAddress.pinCode = this.departmentFormGroup.value.address.permanentAddress.pinCode.toString()
      }
      if (this.departmentFormGroup.value.address.permanentAddress.pinCode) {
        this.departmentFormGroup.value.address.presentAddress.pinCode = this.departmentFormGroup.value.address.presentAddress.pinCode.toString()
      }
      this.departmentFormGroup.value.dependentList.map((el: any) => {
        if (el.mobilePhone) {
          el.mobilePhone = el.mobilePhone.toString();
        }
      })
      if (this.departmentFormGroup.value.bankDetail.accountNo) {
        this.departmentFormGroup.value.bankDetail.accountNo = this.departmentFormGroup.value.bankDetail.accountNo.toString();
      }
      const formData = new FormData();

      this.departmentFormGroup.value.documents.company.map((el: any) => {
        if (el.isNew) {
          formData.append('experienceLetterFilePath', el.experienceLetterFilePath);
          formData.append('hikeLetterFilePath', el.hikeLetterFilePath);
          formData.append('paySlipFilePath', el.paySlipFilePath);
        }
      })
      this.departmentFormGroup.value.documents.education.map((el: any) => {
        if (el.isNew) {
          formData.append('attachCertificate', el.attachCertificate);
        }
      })

      formData.append('body', JSON.stringify(this.departmentFormGroup.value));

      const result: any = await this.profileSer.updateMyProfile(formData, this.profileId)
      // if (result.status === '1') {
      if (result) {

        this._snackBar.open('Employee Updated Successfully', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/employee/my-profile-list/'])
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


    }
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

  handleUploadFile(event: any, index?: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();

        if (this.filedPathName === 'type') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo(index)
        } else {
          this.isImageShow = false;
          this.fileName = event.target.files[0].name;
          this.selectedFile = event.target.files[0];
          reader.onload = e => this.imageSrc = reader.result;
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


  async fileUploadVerifyNo(index: any) {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.profileSer.profileLogUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        const formArray = this.departmentFormGroup.get('kycList') as FormArray;
        const formGroup: any = formArray.at(index) as FormGroup;

        formGroup.patchValue({
          uploadFile: result.fileName
        })
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


  // async fileUpload() {
  //   try {
  //     if (!this.imageSrc) {
  //       this.submitData()
  //       return
  //     }
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile);
  //     const result: any = await this.profileSer.profileLogUpload(formData);
  //     if (result.status === '1') {

  //       if (this.filedPathName === 'log') {
  //         this.departmentFormGroup.controls.filePath.setValue(result.fileName)
  //       } else if (this.filedPathName === 'company_no') {
  //         this.departmentFormGroup.get('kycList.passpoartFilePath').setValue(result.fileName)

  //       } else if (this.filedPathName === 'tax_no') {
  //         this.departmentFormGroup.get('kycList.aadharFilePath').setValue(result.fileName)
  //       } else if (this.filedPathName === 'vat_no') {
  //         this.departmentFormGroup.get('kycList.panFilePath').setValue(result.fileName)

  //       }
  //       this.submitData()
  //       return;
  //     }
  //     if (result.status === '0') {
  //       this._snackBar.open(result.message, '', {
  //         duration: 5 * 1000, horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: 'app-notification-error',
  //       });
  //     }

  //   } catch (error: any) {
  //     this._snackBar.open('Something went wrong', '', {
  //       duration: 5 * 1000, horizontalPosition: 'center',
  //       verticalPosition: 'top',
  //       panelClass: 'app-notification-error',
  //     });
  //   }
  // }
  async fileUpload() {
    try {
      if (!this.imageSrc) {
        this.submitData()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.profileSer.profileLogUpload(formData);
      if (result.status === '1') {

        if (this.filedPathName === 'log') {
          this.departmentFormGroup.controls.filePath.setValue(result.fileName)
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


  async getAllQuestionDetail() {
    try {
      const result: any = await this.questionSer.getAllmedicalQuestionDetails()
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.questionDetail = result.data

      }
    } catch (error) {

      // this._snackBar.open('Something went wrong', '', {
      //   duration: 5 * 1000, horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   panelClass: 'app-notification-error',
      // });;
    }
  }

  async getAllDesignationDetail() {
    try {
      const result: any = await this.designationSer.getAllDesignationDetails()
      if (result.status === '1') {
        this.designationDetail = result.data
        this.getAllRolesDetail()
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllDepartmentDetail() {
    try {
      const result: any = await this.departmentSer.getAlldepartmentDetails()
      if (result.status === '1') {
        this.departmentDetail = result.data;
        this.getAllDesignationDetail()

      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.profileSer.getAllMyProfileDetails()

      if (result.status) {
        this.profileDetails = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllRolesDetail() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails()
      if (result.status === '1') {
        this.roleDetail = result.data;
        this.singleProfileDetail()
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
        this.getAllDepartmentDetail()

      } else {
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


  selectCountryName(event: any) {
    this.stateDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    // console.log(this.stateDetails, this.countryDetials);
    if (this.stateDetails) {
      this.departmentFormGroup.get('address.presentAddress.country').setValue(this.stateDetails.countryName)
    }

  }

  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    this.departmentFormGroup.get('address.presentAddress.state').setValue(findCity.states)

    this.citiesDetails = findCity.cities[0]
  }
  handleEvent(event: any) {
    if (event.target.value) {
      setTimeout(() => {
        if (!this.isLookValue) {
          const findCities = this.citiesDetails.cities.find((el: any) => el === event.target.value.toLowerCase());
          if (!findCities) {
            this.createState(event.target.value)
          }

        }
      }, 500);
    }
  }

  async createState(city: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want add new city in state",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.citiesDetails.cities.push(city);
          const reqBody = {
            stateId: this.departmentFormGroup.value.address.presentAddress.stateId,
            cities: this.citiesDetails.cities
          }
          // console.log(reqBody, 'kkk');
          const result: any = await this.companyCodeSer.updateCity(reqBody);
          if (result.status === '1') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            return;
          }
          if (result.status === '0') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.departmentFormGroup.get('address.presentAddress.city').setErrors({ customError: true })
        }
      });

    } catch (error) {
      console.error(error);
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  typeaheadOnSelect(event: any) {
    if (event.value) {
      this.isLookValue = true
    }
  }



  async getAllSalaryTemplateDetail() {
    try {
      const result: any = await this.salaryTempSer.getAllsalaryTemplateDetail()
      // console.log(result, 'salary temp');

      if (result.status === '1') {
        this.salaryTempDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // handleTemplate(event: any) {
  //   const findSalary: any = this.salaryTempDetail.find((el: any) => el._id === event.target.value)
  //   console.log(findSalary);

  //   this.departmentFormGroup.value.earningList.map((el: any, index: any) => {
  //     const formArray = this.departmentFormGroup.get('earningList') as FormArray;
  //     const formGroup = formArray.at(index) as FormGroup;

  //     findSalary.earningList.map((ele: any) => {
  //       formGroup.patchValue({
  //         salaryComponent: ele ? ele.salaryComponent : '',
  //         calculationType: ele ? ele.calculationType : '',
  //         annualAmount: ele ? ele.annualAmount : ''
  //       });
  //     })

  //     console.log(formGroup.value);

  //   })
  //   this.departmentFormGroup.value.deductionList.map((el: any, index: any) => {
  //     const formArray = this.departmentFormGroup.get('deductionList') as FormArray;
  //     const formGroup = formArray.at(index) as FormGroup;

  //     findSalary.deductionList.map((ele: any) => {
  //       formGroup.patchValue({
  //         monthlyAmount1: ele ? ele.monthlyAmount1 : "",
  //         salaryComponent1: ele ? ele.salaryComponent1 : '',
  //         calculationType1: ele ? ele.calculationType1 : '',
  //         annualAmount1: ele ? ele.annualAmount1 : ''
  //       });
  //     })

  //     console.log(formGroup.value);

  //   })


  //   // const formArray = findSalary.get('earningList') as FormArray;
  //   // const formGroup = formArray.at(index) as FormGroup;
  //   // console.log(formArray, formGroup);

  //   // formGroup.patchValue({
  //   //   monthlyAmount: findSalary ? findSalary.monthlyAmount : "",
  //   //   productDescription: findSalary ? findSalary.materialDescription : ''
  //   // });


  // }
  get CF_3(): any {
    return this.departmentFormGroup.controls;
  }

  handleTemplate(event: any) {
    const findSalary: any = this.salaryTempDetail.find((el: any) => el._id === event.target.value)
    const itemsArray = this.departmentFormGroup.get('earningList') as FormArray;
    const itemsArrayDection = this.departmentFormGroup.get('deductionList') as FormArray;


    for (let i = itemsArray.length - 1; i >= 0; i--) {
      this.deleteRow(i)
    }
    for (let i = itemsArrayDection.length - 1; i >= 0; i--) {
      this.deleteRowDection(i)
    }
    this.departmentFormGroup.controls.earningTotalAmount.setValue('')
    this.departmentFormGroup.controls.deductionTotalAmount.setValue('')
    this.departmentFormGroup.controls.totalSalaryAmount.setValue('')
    findSalary.earningList.map((ele: any) => {
      this.addEarningDetail(ele)

    })
    findSalary.deductionList.map((ele: any) => {
      this.addDeductionDetail(ele)
    })
  }


  async getAllAssetDetal() {
    try {
      const result: any = await this.assetSer.getAllassetAllocationDetails();
      if (result.status === '1') {
        // console.log(result.data, this.resultData.employeeId, 'jjjjjj')
        this.assetDetail = result.data.filter((el: any) => el.employeeId === this.resultData.employeeId);
        // console.log(this.assetDetail, 'this.assetDetail')
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleAsset(event: any, index: any) {
    const findAsset = this.assetDetail.find((ele: any) => ele.assetId === event.target.value)
    console.log(findAsset);

    const formArray = this.departmentFormGroup.get('assetList') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;

    formGroup.patchValue({
      assetName: findAsset ? findAsset.assetName : "",
      assetType: findAsset ? findAsset.assetType : ''
    });
  }

  async getAllDocumentType() {
    try {
      const result: any = await this.profileSer.getAllDocumentTypeDetails()
      if (result.status === '1') {
        this.documentTypeList = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleDocumentType(event: any) {
    if (event.target.value) {
      this.documentTypeList.map((el: any) => el.disable = false)
      this.departmentFormGroup.value.kycList.map((el: any) => {
        this.documentTypeList.map((ele: any) => {
          if (el.documentType === ele.description) {
            ele.disable = true
          }
        })
      })
    }
  }

  patchData(e: any): FormArray {
    return new FormArray(
      e.map((x: any) => {
        const obj = new FormGroup({});
        Object.keys(x).forEach((k) => {
          obj.addControl(k, new FormControl(x[k]));
        });
        return obj;
      })
    );
  };

  // openDialog(fileName: any) {
  //   const dialogRef = this.dialog.open(ViewImageComponent, {
  //     data: fileName
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
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
    console.log(this.departmentFormGroup.value.kycList[i].uploadFile);
    const splitValue = this.departmentFormGroup.value.kycList[i].uploadFile.split('.');
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


  handleComponentAmount(event: any) {
    if (event.target.value) {
      let totalEranAmount: any = 0
      this.departmentFormGroup.value.earningList.map((el: any, i: any) => {
        totalEranAmount = totalEranAmount + Number(el.annualAmount)
      })
      this.departmentFormGroup.controls.earningTotalAmount.setValue(totalEranAmount)
      let totalAmount = Number(this.departmentFormGroup.value.earningTotalAmount) - Number(this.departmentFormGroup.value.deductionTotalAmount);
      this.departmentFormGroup.controls.totalSalaryAmount.setValue(Number(totalAmount) > 0 ? Number(totalAmount) : 0)
    }
  }

  handleComponentDAmount(event: any) {
    if (event.target.value) {
      let totalEranAmount: any = 0
      this.departmentFormGroup.value.deductionList.map((el: any, i: any) => {
        totalEranAmount = totalEranAmount + Number(el.annualAmount1)
      })
      this.departmentFormGroup.controls.deductionTotalAmount.setValue(totalEranAmount)
      let totalAmount = Number(this.departmentFormGroup.value.earningTotalAmount) - Number(this.departmentFormGroup.value.deductionTotalAmount);
      this.departmentFormGroup.controls.totalSalaryAmount.setValue(Number(totalAmount) > 0 ? Number(totalAmount) : 0)
    }
  }

  async getAllLocationDetail() {
    try {
      const result: any = await this.locationSer.getAllLocationDetails()
      if (result) {
        this.locationDetail = result.data
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

      // alert(userName)
      // console.log(data,'dtatatatt');
      // console.log(data.employeeId,'employee');

      const result: any = await this.profileSer.getAllLeaveBalanceDetailsOfEmployee(this.resultData.employeeId)
      console.log(result, 'leavebalanec egetreu')
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
  async getAllShiftMaintenanceDetail() {
    try {
      const result: any = await this.shiftMaintenanceSer.getAllShiftMaintenanceDetail()
      if (result) {
        this.shiftDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllEmployeeTypeDetail() {
    try {
      const result: any = await this.empTypeSer.getAllEmployeeTypeDetail()
      if (result) {
        this.employeeTypeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleRole(event: any) {
    if (event.target.value) {
      const findDetails = this.roleDetail.find((el: any) => el._id === event.target.value);
      this.departmentFormGroup.controls.role.setValue(findDetails.roleId)
    }
  }

  handleDeperament(event: any) {
    if (event.target.value) {
      const findDetails = this.departmentDetail.find((el: any) => el._id === event.target.value);
      if (findDetails) {
        this.filterProfileDetails = this.profileDetails.filter((el: any) => el.department === event.target.value)
        this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === findDetails.departmentId)
      }
    }
  }


  handleDesignation(event: any) {
    if (event.target.value) {
      const findDetails = this.departmentDetail.find((el: any) => el._id === this.departmentFormGroup.value.department);
      const findDesginationDetails = this.designationDetail.find((el: any) => el._id === event.target.value);
      this.filterRoleList = this.roleDetail.filter((el: any) => (el.departmentId === findDetails.departmentId && el.designationId === findDesginationDetails.designationId));

    }
  }


  async getAllSalaryDetail() {
    try {
      const result: any = await this.salarySer.getAllSalaryDetail()
      console.log(result);

      if (result.status) {
        this.salaryDetail = result.data;
        // this.salaryDetail.map((el: any) => el.disable = false)
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  handleSalaryType(event: any) {
    if (event.target.value) {
      this.salaryDetail.map((el: any) => el.disable = false)
      this.departmentFormGroup.value.salary_details.map((el: any) => {
        this.salaryDetail.map((ele: any) => {
          if (el.type === ele.componentName) {
            ele.disable = true
          }
        })
      })

    }
  }

  handleUploadFileDocument(event: any, index: any, inputAccess: any, formArrayName: any, controlName: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(event.target.files[0], 'fiel');
        const formArray = (this.departmentFormGroup.get('documents') as FormGroup).get(formArrayName) as FormArray
        const formGroup: any = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          [controlName]: event.target.files[0],
          isNew: true
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

}
