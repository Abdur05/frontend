import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxDeclarationService } from 'src/app/modules/setting/services/tax-declaration/tax-declaration.service';
import { TaxDecEmployeeService } from '../../../services/tax-dec-employee/tax-dec-employee.service';

@Component({
  selector: 'app-edit-tax-dec-employee',
  templateUrl: './edit-tax-dec-employee.component.html',
  styleUrls: ['./edit-tax-dec-employee.component.css']
})
export class EditTaxDecEmployeeComponent {
  taxDeclarationFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  taxDecDetail: any = [];
  fiscalYear:any = '';
  isShowScreenMenu:any = true;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private taxDecEmployeeSer: TaxDecEmployeeService,
    private taxDecSer: TaxDeclarationService,
  ) { }

  ngOnInit(): void {

    this.createFormdata()
    this.getAllTaxDeclarationDetail()
    const today = new Date();
    this.fiscalYear = this.getFormattedFinancialYear(today);
    this.getAllTaxDeclerationEmployee()
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

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormdata(data?:any) {
    if(data){
      this.taxDeclarationFormGroup = this.fb.group({
        _id:[data.declarations._id],
        fiscal_year: [data.fiscal_year, Validators.required],
        components: this.fb.array(data.declarations.components.map((el:any) => this.createEmployeeGroup(el)))
  
      });
      return
    }
    this.taxDeclarationFormGroup = this.fb.group({
      fiscal_year: ['', Validators.required],
      components: this.fb.array([this.createEmployeeGroup()])

    });
  }
  createEmployeeGroup(data?:any) {
    if(data){
      this.taxDecDetail.map((el: any) => {
        if (el._id === data.component_code) {
          el.disable = true
        }
      })
      return this.fb.group({
        component_code: [data.component_code, Validators.required],
        declared_amount: [data.declared_amount],
      })
    }
    return this.fb.group({
      component_code: ['', Validators.required],
      declared_amount: [''],
    })
  }

  get taxDeclarationDetail() {
    return this.taxDeclarationFormGroup.get('components') as FormArray
  }

  addDetail() {
    this.taxDeclarationDetail.push(this.createEmployeeGroup())
  }
  deleteRow(index: any, id:any) {
    this.taxDecDetail.map((el: any) => {
      if (el._id === id) {
        el.disable = false
      }
    })
    this.taxDeclarationDetail.removeAt(index)
  }
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.taxDeclarationFormGroup.invalid)
        return
      const result: any = await this.taxDecEmployeeSer.updatetaxdeclarationEmployeeDetail(this.taxDeclarationFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/payroll/tax-declaration-employee-list/'])
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



    async getAllTaxDeclerationEmployee() {
    try {
      const result: any = await this.taxDecEmployeeSer.singletaxdeclarationEmployeeDetail(this.fiscalYear);
      console.log(result)
      if (result.status === true) {
        this.createFormdata(result.data[0])
      }
    } catch (error: any) {
      console.error(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleCode(event:any) {
    if(event.target.value){
      this.taxDecDetail.map((el: any) => {
        if (el._id === event.target.value) {
          el.disable = true
        }
      })
    }
  }

}
