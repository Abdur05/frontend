import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Form16Service } from '../../services/form16/form16.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewPdfFileComponent } from 'src/app/modules/recruitment/components/pre-on-boarding/view-pdf-file/view-pdf-file.component';
import { CreateFormComponent } from './create-form/create-form.component';

@Component({
  selector: 'app-form16',
  templateUrl: './form16.component.html',
  styleUrls: ['./form16.component.css']
})
export class Form16Component implements OnInit {

  @ViewChild('searchDataInput', { static: true }) searchInput!: ElementRef;

  isShowPadding: any = false
  filterText: any = {
  };
  form16Detail: any = []
  dateRangeDate: any = []
  @ViewChild('inputFile') inputFile: any;
  filedPathName: any = '';
  inputControl: any = '';
  year: any = [];
  selectedFiscalYear: string = '';
  isShowScreenMenu: any = true;
  rolesView: any = ''

  constructor(private router: Router,
    private _snackBar: MatSnackBar,
    private formSer: Form16Service,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {
    this.year = this.generateYearRange()
  }

  ngOnInit(): void {
    // this.getAllForm16Detail()
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
    this.rolesView = event.roleView;
    this.cd.detectChanges();
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  generateYearRange(): string[] {
    const today = new Date();
    const currentYear = today.getFullYear();
    const startMonth = 3; // April (0-indexed)
    const startYear = today.getMonth() >= startMonth ? currentYear : currentYear - 1;
    const endYear = startYear + 9; // Generate 10 years starting from current fiscal year
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      const nextYear = year + 1;
      const fiscalYear = `${this.getMonthName(startMonth)} ${year} - ${this.getMonthName(startMonth + 11)} ${nextYear}`;
      years.push(fiscalYear);
    }
    return years;
  }

  getMonthName(monthIndex: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthIndex % 12]; // Use modulo 12 to wrap around for December
  }



  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }

  handleUploadFile(event: any) {
    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'zip') {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.uploadZipFile(file)
        this.inputControl.value = ''
      } else {
        this._snackBar.open('Only support zip', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    }
  }

  async uploadZipFile(file: any) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fiscal_year', this.generateFiscalYear());

      const result: any = await this.formSer.uploadForm16File(formData)
      if (result) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
      }
    } catch (error) {
      this._snackBar.open('Failed to upload file', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  onFiscalYearChange(event: any): void {
    this.selectedFiscalYear = event.target.value;
    this.getAllForm16Detail();
  }

  async getAllForm16Detail() {
    try {
      const data = {
        "fiscal_year": this.selectedFiscalYear
      }
      const result: any = await this.formSer.getAllForm16Detail(data)
      if (result) {
        this.form16Detail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  generateFiscalYear(): string {
    const today = new Date();
    const currentYear = today.getFullYear();
    const fiscalYearStartMonth = 3; // April (0-indexed)
    let fiscalYearStartYear = today.getMonth() >= fiscalYearStartMonth ? currentYear : currentYear - 1;
    const fiscalYearEndYear = fiscalYearStartYear + 1;
    const fiscalYearStart = new Date(fiscalYearStartYear, fiscalYearStartMonth, 1);
    const fiscalYearEnd = new Date(fiscalYearEndYear, fiscalYearStartMonth, 0);
    const fiscalYearString = `${fiscalYearStart.toLocaleString('default', { month: 'long' })} ${fiscalYearStartYear} - ${fiscalYearEnd.toLocaleString('default', { month: 'long' })} ${fiscalYearEndYear}`;
    return fiscalYearString;
  }

  handleUpdate(id: any) {
    const dialogRef = this.dialog.open(ViewPdfFileComponent, {
      data: id,
      width: '1000px',
      height: '700px'
    });
    dialogRef.afterClosed().subscribe((result: any) => {
    });
  }

  createForm() {
    const dialogRef = this.dialog.open(CreateFormComponent, {
      width: '1000px',
      height: '700px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {

    });
  }


}
