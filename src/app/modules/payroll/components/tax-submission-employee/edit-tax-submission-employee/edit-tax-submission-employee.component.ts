import { Component, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxSubmissionEmployeeService } from '../../../services/tax-submission-employee/tax-submission-employee.service';
import { TaxDeclarationService } from 'src/app/modules/setting/services/tax-declaration/tax-declaration.service';
import { TaxDecEmployeeService } from '../../../services/tax-dec-employee/tax-dec-employee.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';

@Component({
  selector: 'app-edit-tax-submission-employee',
  templateUrl: './edit-tax-submission-employee.component.html',
  styleUrls: ['./edit-tax-submission-employee.component.css']
})
export class EditTaxSubmissionEmployeeComponent {

  taxSubmisiionEmployeeFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  filedPathName: any = '';
  inputControl: any = '';
  @ViewChild('inputFile') inputFile: any;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  imageSrc: any = '';
  taxDecDetail: any = [];
  fiscalYear: any = ''
  formData: any = ''
  isShowScreenMenu:any = true;
  isHideSave = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxSubmisiionSer: TaxSubmissionEmployeeService,
    private taxDecSer: TaxDeclarationService,
    private taxDecEmployeeSer: TaxDecEmployeeService,
    private dialog:MatDialog,
    public dialogRef: MatDialogRef<EditTaxSubmissionEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data1: any,
  ) { }

  ngOnInit(): void {
    this.data();
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    this.getAllTaxDeclarationDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  getFormattedFinancialYear(date: Date): string {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();

    let startYear: number;
    let endYear: number;

    // Financial year starts from April (month index 3)
    if (currentMonth >= 3) {
      startYear = currentYear;
      endYear = currentYear + 1;
    } else {
      startYear = currentYear - 1;
      endYear = currentYear;
    }

    return `April ${startYear} - March ${endYear}`;
  }


  data(data?: any) {
    if (data) {
      this.taxSubmisiionEmployeeFormGroup = this.fb.group({
        components: this.fb.array(data.declarations.components.map((el: any) => this.createEmployeeGroup(data, el)))
      });
      return
    }
    this.taxSubmisiionEmployeeFormGroup = this.fb.group({
      components: this.fb.array([this.createEmployeeGroup()])
    });
  }

  createEmployeeGroup(mainObject?: any, data?: any) {
    if (data) {
      this.isHideSave = data.status === 'Accepted' ? true: false;
      return this.fb.group({
        fiscal_year: [mainObject.fiscal_year],
        component_code_id: [data._id],
        component_name: [data.component_name],
        declared_amount: [data.declared_amount],
        proof_amount: [data.proof_amount, [Validators.required]],
        TaxDocuments: [data.documents],
        status:[data.status],
        review_comments:[data.review_comments]
      })
    }
    return this.fb.group({
      fiscal_year: [''],
      component_code_id: [''],
      component_name: [''],
      proof_amount: ['', [Validators.required]],
      TaxDocuments: [''],
      declared_amount: [''],
      status:[''],
      review_comments:['']
    })
  }

  get taxDeclarationDetail() {
    return this.taxSubmisiionEmployeeFormGroup.get('components') as FormArray
  }

  addDetail() {
    this.taxDeclarationDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any) {
    this.taxDeclarationDetail.removeAt(index)
  }

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }


  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.taxSubmisiionEmployeeFormGroup);

      if (this.taxSubmisiionEmployeeFormGroup.invalid)
        return
      const findValue = this.taxSubmisiionEmployeeFormGroup.value.components.find((el:any) => el.TaxDocuments === null);
      if(findValue){
        this._snackBar.open('please Upload Document', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this.formData = new FormData();
      for (let i = 0; i <= this.taxSubmisiionEmployeeFormGroup.value.components.length; i++) {
        this.formData = new FormData();
        this.formData.append('TaxDocuments', this.taxSubmisiionEmployeeFormGroup.value.components[i].TaxDocuments)
        this.formData.append('component_code_id', this.taxSubmisiionEmployeeFormGroup.value.components[i].component_code_id)
        this.formData.append('fiscal_year', this.taxSubmisiionEmployeeFormGroup.value.components[i].fiscal_year)
        this.formData.append('proof_amount', this.taxSubmisiionEmployeeFormGroup.value.components[i].proof_amount)
        console.log(this.formData, this.taxSubmisiionEmployeeFormGroup.value.components.length, i)
        this.createSubmission()
      }

    } catch (error: any) {
      this.formData = new FormData();

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }


  async createSubmission() {
    try {
      const result: any = await this.taxSubmisiionSer.createTaxDeclarationEmployee(this.formData);
      this.formData = new FormData();
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.dialogRef.close(true)
        // this.router.navigate(['/payroll/tax-submission-employee-list/'])
        return
      }
      if (result.status === false) {
        this.dialogRef.close(false)

        this.formData = new FormData();
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error) {
      this.dialogRef.close(false)

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  handleUploadFile(event: any, index?: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName, 'fiel')
        const formArray = this.taxSubmisiionEmployeeFormGroup.get('components') as FormArray;
        const formGroup: any = formArray.at(index) as FormGroup;
        formGroup.patchValue({
          TaxDocuments: event.target.files[0]
        })
        // if (this.filedPathName === 'resume') {
        //   this.selectedFileVerfiy = event.target.files[0];
        //   this.fileUploadVerifyNo(index)
        // }
        // else {
        //   this.fileName = event.target.files[0].name;
        //   this.selectedFile = event.target.files[0];
        //   reader.onload = e => this.imageSrc = reader.result;
        //   console.log(this.selectedFile);

        // }

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
      const result: any = await this.taxSubmisiionSer.policyLogoUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        const formArray = this.taxSubmisiionEmployeeFormGroup.get('components') as FormArray;
        const formGroup: any = formArray.at(index) as FormGroup;

        formGroup.patchValue({
          TaxDocuments: result.fileName
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
      const result: any = await this.taxSubmisiionSer.policyLogoUpload(formData);
      if (result.status === true) {

        if (this.filedPathName === 'resume') {
          this.taxSubmisiionEmployeeFormGroup.get('components.TaxDocuments').setValue(result.fileName)
        }
        this.submitData()
        return;
      }
      if (result.status === false) {
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

  async getAllTaxDeclarationDetail() {
    try {
      const result: any = await this.taxDecSer.getAllTaxDeclarationDetail()
      if (result.status === true) {
        this.taxDecDetail = result.data;
        this.getAllTaxDeclerationEmployee()
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async getAllTaxDeclerationEmployee() {
    try {
      const result: any = await this.taxDecEmployeeSer.singletaxdeclarationEmployeeDetail(this.fiscalYear);
      console.log(result)
      if (result.status === true) {
        this.data(result.data[0])
      }
    } catch (error: any) {
      console.error(error)
      this._snackBar.open('Something Went Wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  viewProofDetails(url:any){
    const dialogRef = this.dialog.open(ViewPdfFileComponent, {
      data: url,
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }


}
