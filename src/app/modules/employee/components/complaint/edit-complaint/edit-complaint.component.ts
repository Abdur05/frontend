import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MyProfileService } from '../../../services/my-profile/my-profile.service';
import { ComplaintService } from '../../../services/complaint/complaint.service';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.component.html',
  styleUrls: ['./edit-complaint.component.css']
})
export class EditComplaintComponent {

  complaintFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  employeeDetail: any = []
  complaintId: any = ''
  isShowScreenMenu: any = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private myprofileSer: MyProfileService,
    private complaintSer: ComplaintService,
    private activateRouter: ActivatedRoute
    // private reasonSer: ReasonService

  ) { }

  ngOnInit(): void {
    this.complaintId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getAllEmployeeDetail()
    this.singleComplaintDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  screenChange(event: any) {
    this.isShowScreenMenu = event.visible;
  }

  createdata() {
    this.complaintFormGroup = this.fb.group({
      _id: ['', Validators.required],
      complaintName: ['', Validators.required],
      complaintAgainst: ['', Validators.required],
      reportingManager: ['', Validators.required],
      complaintDate: ['', [Validators.required, this.futureDateValidator]],
      complaintDescription: ['', Validators.required],
      remarks: [''],
      employeeId: [''],
      employeeName: [''],
      createdOn: [''],
      createdBy: ['']
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

  async singleComplaintDetails() {
    try {
      const result: any = await this.complaintSer.singleComplaintDetail(this.complaintId)
      if (result.status === true) {
        this.complaintFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }



  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.complaintFormGroup.value);
      if (this.complaintFormGroup.invalid)
        return

      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.complaintFormGroup.value.changedOn = fullDate
      this.complaintFormGroup.value.changedBy = username
      const result: any = await this.complaintSer.updatComplaintDetail(this.complaintFormGroup.value)
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
      if (result.status === true) {
        this.employeeDetail = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleEmployee(event: any) {
    const selectEmployee: any = this.employeeDetail.find((el: any) => el.employeeId === event.target.value)
    this.complaintFormGroup.patchValue({
      reporting_manager: selectEmployee ? selectEmployee.reportingManager : ''
    })
  }

}
