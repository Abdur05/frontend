import { Component, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaxSubmissionEmployeeService } from '../../../services/tax-submission-employee/tax-submission-employee.service';
import { TaxDeclarationService } from 'src/app/modules/setting/services/tax-declaration/tax-declaration.service';

@Component({
  selector: 'app-add-tax-submission-employee',
  templateUrl: './add-tax-submission-employee.component.html',
  styleUrls: ['./add-tax-submission-employee.component.css']
})
export class AddTaxSubmissionEmployeeComponent {
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
  isShowScreenMenu:any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxSubmisiionSer: TaxSubmissionEmployeeService,
    private taxDecSer: TaxDeclarationService
  ) { }

  ngOnInit(): void {
    this.data()
    this.getAllTaxDeclarationDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  data() {
    this.taxSubmisiionEmployeeFormGroup = this.fb.group({
      // fiscal_year: ['', [Validators.required]],
      // component_code_id: [''],
      // proof_amount: [''],
      // TaxDocuments: [''],
      components: this.fb.array([this.createEmployeeGroup()])
    });
  }

  createEmployeeGroup() {
    return this.fb.group({
      fiscal_year: [''],
      component_code_id: [''],
      proof_amount: [''],
      TaxDocuments: [''],
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
      console.log(this.taxSubmisiionEmployeeFormGroup.value);

      if (this.taxSubmisiionEmployeeFormGroup.invalid)
        return


      const result: any = await this.taxSubmisiionSer.createTaxDeclarationEmployee(this.taxSubmisiionEmployeeFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/tax-submission-employee-list/'])
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



  handleUploadFile(event: any, index?: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName, 'fiel')

        if (this.filedPathName === 'resume') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo(index)
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
      if (result.status === '1') {

        if (this.filedPathName === 'resume') {
          this.taxSubmisiionEmployeeFormGroup.get('components.TaxDocuments').setValue(result.fileName)
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

  async getAllTaxDeclarationDetail() {
    try {
      const result: any = await this.taxDecSer.getAllTaxDeclarationDetail()
      if (result.status === true) {
        this.taxDecDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
