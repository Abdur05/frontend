import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';
import { CompanyCodeService } from 'src/app/modules/setting/services/companyCode/company-code.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  imageSrc: any = ''
  fileName: any = '';
  selectedFile: any = '';
  inputControl: any = '';
  filedPathName: any = '';
  isLoader: any = false;
  userDetails: any = '';
  isEdit: any = '';
  isEditInput: any = false;
  @Output() closeMatMenu = new EventEmitter<any>()
  constructor(
    private _snackBar: MatSnackBar,
    private userSer: AuthrService,
    private companyCodeSer: CompanyCodeService
  ) { }

  ngOnInit(): void {
    this.findUser()
  }

  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
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
        this.inputControl.value = '';
        this.isEdit = true
      } else {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }

  async findUser() {
    try {
      this.isLoader = true;
      const userName = localStorage.getItem('userName')
      const result: any = await this.userSer.getSingleUserdetails(userName)
      console.log(result,'reees');
      
      if (result.status === '1') {
        this.userDetails = result.data;
        if (!this.userDetails.firstName || !this.userDetails.lastName) {
          this.isEditInput = true;
        }
        this.isLoader = false
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        this.isLoader = false

      }
    } catch (error: any) {
      this.isLoader = false
      this._snackBar.open('Something Went Wrong', '', {
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
        this.userDetails.profileImg = result.fileName
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


  async addCode() {
    try {
      if (!this.userDetails.firstName || !this.userDetails.lastName) {
        this._snackBar.open('Fill the First and Last Name', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this.isLoader = true;
      const result: any = await this.userSer.updateSingleUserdetails(this.userDetails);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.isEdit = false;
        this.isEditInput = false;
        this.imageSrc = ''
        this.findUser()
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

    } catch (error: any) {
      this.isLoader = false;

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleFirstName(event: any) {
    this.userDetails.firstName = event.target.value;
  }

  handleLastName(event: any) {
    this.userDetails.lastName = event.target.value;
  }


  back() {
    this.closeMatMenu.emit(true)
  }
}
