import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import { ComplaintService } from '../../../services/complaint/complaint.service';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent {

  complaintFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  employeeDetail: any = []
  isShowScreenMenu: any = true;
  employeeId: any = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private myprofileSer: MyProfileService,
    private complaintSer: ComplaintService
    // private reasonSer: ReasonService

  ) { }

  ngOnInit(): void {
    this.createdata()
    this.getAllEmployeeDetail()
    this.employeeId = localStorage.getItem('userName')

  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createdata() {
    this.complaintFormGroup = this.fb.group({
      complaintName: ['', Validators.required],
      complaintAgainst: ['', Validators.required],
      reportingManager: ['', Validators.required],
      complaintDate: ['', [Validators.required, this.futureDateValidator]],
      complaintDescription: ['', Validators.required],
      remarks: [''],
      employeeId: [''],
      employeeName: [''],
    });
  }

  futureDateValidator(control: any) {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    if (inputDate > currentDate) {
      return { futureDate: true };
    }
    return null;
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.complaintFormGroup);

      if (this.complaintFormGroup.invalid)
        return

      const username: any = localStorage.getItem('userName')
      const employeeName: any = localStorage.getItem('employeeName')

      this.complaintFormGroup.controls.employeeId.setValue(username)
      this.complaintFormGroup.controls.employeeName.setValue(employeeName)

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.complaintFormGroup.value.createdOn = fullDate
      this.complaintFormGroup.value.createdBy = username
      this.complaintFormGroup.value.changedOn = fullDate
      this.complaintFormGroup.value.changedBy = username


      const result: any = await this.complaintSer.createComplaintDetail(this.complaintFormGroup.value)
      if (result.status === true) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/employee/complaint-list/'])
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

  async getAllEmployeeDetail() {
    try {
      const result: any = await this.myprofileSer.getAllMyProfileDetails()
      // console.log(result);

      if (result.status === true) {
        const userId = localStorage.getItem('userName')
        this.employeeDetail = result.data
        this.employeeDetail = result.data.filter((el: any) => el.employeeId !== userId)
        const userName = localStorage.getItem('userName')
        const findDetails = result.data.find((el: any) => el.employeeId === userName)
        console.log(findDetails, 'employeeeeeeeeeeeee', this.employeeDetail);

        this.complaintFormGroup.controls.employeeId.setValue(findDetails.employeeId)
        this.complaintFormGroup.controls.employeeName.setValue(findDetails.firstName + " " + findDetails.lastName)
        this.complaintFormGroup.controls.reportingManager.setValue(findDetails.reportingManager)

      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleEmployee(event: any) {
    const selectEmployee: any = this.employeeDetail.find((el: any) => el.employeeId === event.target.value)
    // console.log(selectEmployee, 'ooooooo');

    this.complaintFormGroup.patchValue({
      reportingManager: selectEmployee ? selectEmployee.reportingManager : ''
    })
  }



}
