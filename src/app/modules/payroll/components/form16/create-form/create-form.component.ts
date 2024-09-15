import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Form16Service } from '../../../services/form16/form16.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent {


  form16DataformGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  filedPathName: any = '';
  inputControl: any = '';
  imageSrc: any = '';

  year: any = [];
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private formSer: Form16Service,
    public dialogRef: MatDialogRef<CreateFormComponent>,

  ) {
    this.year = this.generateYearRange()
  }

  ngOnInit(): void {
    this.createFormdata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }


  createFormdata() {
    this.form16DataformGroup = this.fb.group({
      fiscal_year: ['', [Validators.required]],
      file: [''],
    });
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
    const file = event.target.files[0];
    if (file) {
      const allowedExtensions = ['zip']; // Add more extensions if needed
      const splitValue = file.name.split('.');
      const fileExtension = splitValue[splitValue.length - 1].toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        // Valid file type, update form control with file object
        this.form16DataformGroup.get('file').setValue(file);
      } else {
        // Invalid file type, reset form control and show error message
        this.form16DataformGroup.get('file').setValue(null);
        this._snackBar.open('Only support ZIP files.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error'
        });
      }
    }
  }



  async uploadZipFile() {
    try {
      if (this.form16DataformGroup.valid) {
        const formData = new FormData();
        formData.append('fiscal_year', this.form16DataformGroup.get('fiscal_year').value);
        formData.append('file', this.form16DataformGroup.get('file').value);

        const result: any = await this.formSer.uploadForm16File(formData);
        if (result.status === true) {
          this._snackBar.open(result.message, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success'
          });
          this.dialogRef.close(true)

        }
        if (result.status === '-1') {
          var message = result.message;
          const tableRows = result.error.map((row: any, i: any) => `
            <tr>
            <td>${i + 1}</td>
              <td>${row.employeeId}</td>
              <td>${row.fileName}</td>
            </tr>
          `).join('');
          var details = result.error

          Swal.fire({
            title: message,
            icon: "error",
            confirmButtonText: "Ok",
            html: `
          <div class="container">
              <div class="row">
                  <div class="col-12">
                      <div class="row">
                          <div class="table-responsive">
                              <table class="table table-hover">
                                  <thead>
                                      <tr>
                                          <th>SN</th>
                                          <th>EmployeeId</th>
                                          <th>sheetName</th>
                                      </tr>
                                  </thead>
          
                                  <tbody>
                                  ${tableRows}
                                  </tbody>
          
          
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          `,

          }).then((result) => {
            // this.isLoader = false;

            /* Read more about isConfirmed, isDenied below */
            // if (result.isConfirmed) {
            //   this._snackBar.open(message, '', {
            //     duration: 5 * 1000, horizontalPosition: 'center',
            //     verticalPosition: 'top',
            //     panelClass: 'app-notification-error',
            //   });
            // }
          })

        }
      } else {
        this._snackBar.open('Please fill out all required fields.', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error'
        });
      }
    } catch (error: any) {
      console.error('Failed to upload file', error.error);
      this._snackBar.open(error.error.message, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error'
      });
    }
  }

}
