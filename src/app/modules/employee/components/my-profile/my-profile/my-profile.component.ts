import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import { MedicalQuestionService } from 'src/app/modules/setting/services/medicalQuestion/medical-question.service';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';
import { RoleService } from 'src/app/modules/setting/services/role/role.service';
import { CompanyCodeService } from 'src/app/modules/setting/services/companyCode/company-code.service';
import Swal from 'sweetalert2';
import { SalaryTemplateService } from 'src/app/modules/payroll/services/salary-template/salary-template.service';
import { AssetAllocationService } from 'src/app/modules/asset/services/asset-allocation.service';
import { LocationService } from 'src/app/modules/setting/services/location/location.service';
import { ShiftMaintenanceService } from 'src/app/modules/setting/services/shift/shift-maintenance.service';
import { EmployeeTypeService } from 'src/app/modules/setting/services/employee-type/employee-type.service';
import { SalaryService } from 'src/app/modules/payroll/services/salary/salary.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {


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
  sameAsPresentAddress: boolean = false;
  profileDetails: any = []
  roleDetail: any = []
  countryDetials: any = [];
  languageDetails: any;
  stateDetails: any;
  citiesDetails: any;
  isLookValue: any = false;
  salaryTempDetail: any = []
  assetDetail: any = []
  showTable: boolean = false;
  documentTypeList: any = [];
  dobTouched: boolean = false;
  today: string = '';
  locationDetail: any = []
  shiftDetail: any = []
  employeeTypeDetail: any = [];
  salaryDetail: any = [];
  isShowScreenMenu: any = true;
  filterDesignationList: any = [];
  filterRoleList: any = [];
  filterProfileDetails: any = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private profileSer: MyProfileService,
    private questionSer: MedicalQuestionService,
    private designationSer: DesignationService,
    private departmentSer: DepartmentService,
    private roleSer: RoleService,
    private companyCodeSer: CompanyCodeService,
    private salaryTempSer: SalaryTemplateService,
    private assetSer: AssetAllocationService,
    private locationSer: LocationService,
    private shiftMaintenanceSer: ShiftMaintenanceService,
    private empTypeSer: EmployeeTypeService,
    private salarySer: SalaryService
  ) {
    this.today = new Date().toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.data()
    this.getAllQuestionDetail()
    this.getAllDesignationDetail()
    this.getAllDepartmentDetail()
    this.getAllEmployeeDetail()
    this.getAllRolesDetail()
    this.getCountryDetails()
    this.getAllSalaryTemplateDetail()
    this.getAllAssetDetal()
    this.getAllDocumentType()
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

  data() {
    this.departmentFormGroup = this.fb.group({
      employeeId: [''],
      filePath: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
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
      userStatus: ['O', Validators.required],
      year: [''],
      locationId: [''],
      defaultShift: [''],
      employeeTypeId: ['', Validators.required],
      totalSalaryAmount: [''],
      earningTotalAmount: [''],
      deductionTotalAmount: [''],
      documents: this.fb.group({
        company: this.fb.array([this.getWorkExperience()]),
        education: this.fb.array([this.getQualification()]),
      }),
      kycList: this.fb.array([this.createKycFormFields()]),
      medicalList: this.fb.array([this.getMedical()]),
      earningList: this.fb.array([]),
      deductionList: this.fb.array([]),
      dependentList: this.fb.array([this.getDependent()]),
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
      salary_details: this.fb.array([this.createSalaryDetailsFields()]),
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

  get KYCControllers() {
    return this.departmentFormGroup.get('kycList') as FormArray
  }

  createKycFormFields() {
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
  updatePermanentAddress() {
    this.sameAsPresentAddress = !this.sameAsPresentAddress;
    console.log(this.sameAsPresentAddress, 'sameaa');

    if (this.sameAsPresentAddress) {
      const presentAddress = this.departmentFormGroup.get('address.presentAddress').value;
      this.departmentFormGroup.get('address.permanentAddress').patchValue(presentAddress);
    } else {
      this.departmentFormGroup.get('address.permanentAddress').reset(); // Reset the permanent address if checkbox is unchecked
    }
  }

  getQualification(): FormGroup {
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
      yesCheck: [''],
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
  getWorkExperience(): FormGroup {
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
    return (this.departmentFormGroup.get('documents') as FormGroup).get('company') as FormArray
  }

  addworkExperience() {
    this.workExperienceDetailArray.push(this.getWorkExperience())
  }
  deleterow2(index: any) {
    this.workExperienceDetailArray.removeAt(index);
  }


  addEarning(el: any) {
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

  addDeduction(el: any) {
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


  getDependent() {
    return this.fb.group({
      fullName: [''],
      newAddress: [''],
      emailIdNew: ['', [Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      mobilePhone: ['', [Validators.minLength(10), Validators.maxLength(10)]],
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
    const education = (departmentFormGroup.get('documents') as FormGroup).get('education') as FormArray;

    for (let i = 0; i < education.length; i++) {
      const startDate = education.at(i).get('startDate')?.value;
      const endDate = education.at(i).get('endDate')?.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        education.at(i).get('endDate')?.setErrors({ 'invalidEndDate': true });
      } else {
        education.at(i).get('endDate')?.setErrors(null);
      }
    }
  }

  validateDates2(departmentFormGroup: FormGroup) {
    const education = (departmentFormGroup.get('documents') as FormGroup).get('company') as FormArray;

    for (let i = 0; i < education.length; i++) {
      const startDate = education.at(i).get('startDate')?.value;
      const endDate = education.at(i).get('endDate')?.value;

      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        education.at(i).get('endDate')?.setErrors({ 'invalidEndDate': true });
      } else {
        education.at(i).get('endDate')?.setErrors(null);
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



  async submitData() {
    console.log(this.departmentFormGroup.value, 'ooooo');

    try {

      this.isSubmitted = true
      if (this.departmentFormGroup.invalid)
        return
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
      console.log(this.departmentFormGroup.value, 'lllll')
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

      this.departmentFormGroup.value.createdOn = fullDate
      this.departmentFormGroup.value.createdBy = username
      this.departmentFormGroup.value.changedOn = fullDate
      this.departmentFormGroup.value.changedBy = username
      this.departmentFormGroup.value.year = year
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
        formData.append('experienceLetterFilePath', el.experienceLetterFilePath);
        formData.append('hikeLetterFilePath', el.hikeLetterFilePath);
        formData.append('paySlipFilePath', el.paySlipFilePath);
      })
      this.departmentFormGroup.value.documents.education.map((el: any) => {
        formData.append('attachCertificate', el.attachCertificate);
      })
      formData.append('body', JSON.stringify(this.departmentFormGroup.value));
      const result: any = await this.profileSer.createMyProfile(formData)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/employee/my-profile-list/'])
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
      console.log(error);
      // if (error.error.message) {
      //   this._snackBar.open(error.error.message, '', {
      //     duration: 5 * 1000, horizontalPosition: 'center',
      //     verticalPosition: 'top',
      //     panelClass: 'app-notification-error',
      //   });
      //   return
      // }
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
  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
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

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllDesignationDetail() {
    try {
      const result: any = await this.designationSer.getAllDesignationDetails()
      if (result.status === '1') {
        this.designationDetail = result.data
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
      console.log(result)
      if (result.status === '1') {
        this.departmentDetail = result.data
        console.log(result.data)
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
        this.roleDetail = result.data
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
    console.log(this.stateDetails);
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
          console.log(reqBody, 'kkk');
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
      console.log(result, 'salary temp');

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

  handleTemplate(event: any) {
    this.showTable = true;
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
      const result: any = await this.assetSer.getAllassetMaintenanceDetails()
      if (result.status === '1') {
        this.assetDetail = result.data;
        console.log(result.data, 'kkkkk')
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
        this.documentTypeList.map((el: any) => el.disable = false)
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
      // this.salaryDetail.map((el: any) => el.disable = false);
      // this.salaryDetail.map((el: any) => {
      //   if (el.componentName === event.target.value) {
      //     el.disable = true
      //   }
      // })

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
        this.filterProfileDetails = this.profileDetails.filter((el: any) => el.department === event.target.value);
        console.log(this.filterProfileDetails, 'this.filterProfileDetails')
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

}
