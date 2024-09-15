import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../services/companyCode/company-code.service';
import Swal from 'sweetalert2';
import { ViewPdfComponent } from '../../view-pdf/view-pdf/view-pdf.component';
import { ViewImageComponent } from '../../viewImage/view-image/view-image.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent implements OnInit {

  companyCode: any = FormGroup
  companyDetails: any = [];
  countryDetials: any = []
  citiesDetails: any = [];
  languageName: any = ''
  isSubmitted: any = false
  currencyDetails: any = [];
  isShowPadding: any = false;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  imageSrc: any = '';
  @ViewChild('inputFile') inputFile: any;
  languageDetails: any = [];
  industryDetails: any = [];
  filedPathName: any = '';
  inputControl: any = '';
  idleState: any = 'Not Started';
  perviousValue: any = '';
  stateDetails: any = [];
  isLoader: any = false;
  chartOfAccountDetails: any = [];
  isLookValue: any = false;
  isShowScreenMenu:any =  true;

  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private companyCodeSer: CompanyCodeService,
    public dialog: MatDialog,

  ) { }
  ngOnInit(): void {
    this.code()
    this.getAllLanguageList()
    this.getCountryDetails()
    this.getCurrencyDetails()

  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  code() {
    this.companyCode = this.fb.group({
      companyCode: ['', [Validators.required]],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      city: ['', Validators.required],
      currencyId: ['', Validators.required],
      currencyName: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      filePath: [''],
      vatRegistrationNo: [''],
      vatRegistrationFilePath: [''],
      companyRegistrationNo: [''],
      companyRegistrationFilePath: [''],
      taxRegistrationNo: [''],
      taxRegistrationFilePath: [''],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
    })
  }


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  // Create the purchase org Details
  async addCode() {
    try {
      console.log(this.companyCode.value, 'ooo');

      this.isSubmitted = true;
      if (this.companyCode.invalid)
        return;
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

      this.companyCode.value.createdOn = fullDate
      this.companyCode.value.createdBy = username
      this.companyCode.value.changedOn = fullDate
      this.companyCode.value.changedBy = username
      const result: any = await this.companyCodeSer.createCompanyCode(this.companyCode.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/company-code-list']);
        this.isLoader = false;
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




  // Get All details for Currency code
  async getCurrencyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data;

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

  // single details for Language Detials
  async getAllLanguageList() {
    try {
      const result: any = await this.companyCodeSer.getAllLanguageDetails();
      if (result.status === '1') {
        this.languageDetails = result.data
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
      this.companyCode.controls.countryName.setValue(this.stateDetails.countryName)
    }
    this.companyCode.controls.languageId.setValue(this.stateDetails.languageId)
    this.companyCode.controls.languageName.setValue(this.stateDetails.languageName)
    const findDefaultCurrency = this.currencyDetails.find((el: any) => el.countryId === event.target.value);
    console.log(findDefaultCurrency, 'nnn')
    this.companyCode.controls.currencyId.setValue(findDefaultCurrency._id)
    this.companyCode.controls.currencyName.setValue(findDefaultCurrency.code)



  }


  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.stateName.setValue(findCity.states)

    this.citiesDetails = findCity.cities[0]
  }

  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.currencyName.setValue(findCurrencyCode.code)
  }




  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }


  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName)
        if (this.filedPathName === 'company_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'vat_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'tax_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else {
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


  async fileUploadVerifyNo() {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.companyCodeSer.companyLogUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'company_no') {
          this.companyCode.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.companyCode.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.companyCode.controls.vatRegistrationFilePath.setValue(result.fileName)
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
        this.addCode()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.companyCodeSer.companyLogUpload(formData);
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        if (this.filedPathName === 'log') {
          this.companyCode.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'company_no') {
          this.companyCode.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.companyCode.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.companyCode.controls.vatRegistrationFilePath.setValue(result.fileName)
        }
        this.addCode()
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


  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

  // //  Get All Industry Details
  // async getAllInndustrySectorsList() {
  //   try {
  //     const result: any = await this.companyCodeSer.getAllIndustrySectorDetails();
  //     if (result.status === '1') {
  //       this.industryDetails = result.data
  //     } else {
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


  checkInputLength(event: any) {
    if (event.target.value) {

      if (this.companyCode.value.companyCode.length > 4) {
        this.companyCode.controls.companyCode.setValue(this.perviousValue)
        return
      }
    }
  }


  typeaheadOnSelect(event: any) {
    if (event.value) {
      this.isLookValue = true
    }
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
            stateId: this.companyCode.value.stateId,
            cities: this.citiesDetails.cities
          }
          console.log(reqBody, 'kkk');
          this.isLoader = true;
          const result: any = await this.companyCodeSer.updateCity(reqBody);
          if (result.status === '1') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });
            this.isLoader = false;
            return;
          }
          if (result.status === '0') {
            this.isLoader = false;
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.companyCode.get('city').setErrors({ customError: true })
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

  openDialog(fileName: any) {
    const splitValue = this.companyCode.value.companyRegistrationFilePath.split('.');
    const splitValue1 = this.companyCode.value.taxRegistrationFilePath.split('.');
    const splitValue2 = this.companyCode.value.vatRegistrationFilePath.split('.');

    console.log(splitValue[1], 'split', splitValue1[1], splitValue2[1]);

    let dialogRef: any;
    if (splitValue[1] === 'pdf' || splitValue1[1] || splitValue2[1]) {
      dialogRef = this.dialog.open(ViewPdfComponent, {
        data: fileName
      });
    }
    else {
      dialogRef = this.dialog.open(ViewImageComponent, {
        data: fileName
      });
    }
    // const dialogRef = this.dialog.open(ViewImageComponent, {
    //   data: fileName
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


}

