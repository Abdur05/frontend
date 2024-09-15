import { Component, Inject, OnInit } from '@angular/core';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewPdfFileComponent } from '../view-pdf-file/view-pdf-file.component';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/modules/setting/services/designation/designation.service';
import { DepartmentService } from 'src/app/modules/setting/services/department/department.service';

@Component({
  selector: 'app-verfied-per-on-boarding',
  templateUrl: './verfied-per-on-boarding.component.html',
  styleUrls: ['./verfied-per-on-boarding.component.css']
})
export class VerfiedPerOnBoardingComponent implements OnInit {

  candidatedataId: any = '';
  candidatesId: any = '';
  candidatesDetails: any = {
    salary_details : []
  };
  salaryKeys: any = [];
  salaryValue: any = [];
  joiningDate: any = '';
  isSubmitted: any = false;
  todayDate: any = new Date();
  candiateFormGroup: any = FormGroup;
  designationDetail: any = [];
  departmentDetail: any = [];
  filterDesignationList: any = [];

  constructor(
    private candidateSer: CandidateService,
    public dialogRef: MatDialogRef<VerfiedPerOnBoardingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private preOnboardSer: PreOnboardingService,
    private fb: FormBuilder,
    private designationSer: DesignationService,
    private departmentSer: DepartmentService
  ) {
    this.candidatedataId = data;
    this.getSinglecandidateDetails()
    this.todayDate = this.changeDateFromate(this.todayDate);
   
  }

  ngOnInit(): void {
    this.getAllDesignationDetail();
    this.getAllDepartmentDetail();
    this.createFormFields()
  }


  createFormFields() {
    this.candiateFormGroup = this.fb.group({
      joining_date: ['', [Validators.required]],
      designationId: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      departmentId: ['', [Validators.required]],
      department: ['', [Validators.required]],
    })
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

  handleDeperament(event: any) {
    if (event.target.value) {
      const findDetails = this.departmentDetail.find((el: any) => el._id === event.target.value);
      if (findDetails) {
        this.candiateFormGroup.controls.departmentId.setValue(findDetails.departmentId)
        this.filterDesignationList = this.designationDetail.filter((el: any) => el.departmentId === findDetails.departmentId)
      }
    }
  }

  handleDesignation(event: any) {
    if (event.target.value) {
      const findDesginationDetails = this.designationDetail.find((el: any) => el._id === event.target.value);
      if (findDesginationDetails) {
        this.candiateFormGroup.controls.designationId.setValue(findDesginationDetails.designationId)

      }

    }
  }

  async getSinglecandidateDetails() {
    try {
      const result: any = await this.candidateSer.singlecandidateDetail(this.candidatedataId);
      console.log(result, 'result')
      if (result.data.length > 0) {
        this.candidatesDetails = result.data[0];
      }
    } catch (error: any) {
      console.log(error)
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
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


  async handleUpdateStatus(status: any) {
    try {
      const req = {
        verification_status: status
      }
      const result: any = await this.preOnboardSer.updatePreOnboardingStatusDetail(this.candidatesDetails.candidateId, req);
      if (result.status) {
        this.dialogRef.close(true)
      } else {
        this.dialogRef.close(false)

      }
    } catch (error) {
      console.error(error);
    }
  }


  handleDate(event: any) {
    if (event.target.value) {
      const dateFormate = this.changeDateFromate(event.target.value)
      this.joiningDate = dateFormate;
      console.log(this.joiningDate)
    }
  }


  changeDateFromate(date: any) {
    const currentDate = new Date(date);
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
    var day = currentDate.getDate();
    // Format the date and time
    const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return fullDate;
  }


  async handleJoingDate() {
    try {
    
      this.isSubmitted = true;
      if(this.candiateFormGroup.invalid){
        return;
      }
      const result: any = await this.preOnboardSer.updatePreOnboardingJoinDetail(this.candidatesDetails.candidateId, this.candiateFormGroup.value);
      if (result.status) {
        this.dialogRef.close(true);

      } else {
        this.dialogRef.close(false)

      }
    } catch (error: any) {
      console.error(error);
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async handleOfferUpdateStatus(status: any) {
    try {
      const req = {
        offer_letter_status: status
      }
      const result: any = await this.preOnboardSer.updatePreOnboardingOfferAccepct(this.candidatesDetails.candidateId, req);
      if (result.status) {
        this.dialogRef.close(true)
      } else {
        this.dialogRef.close(false)

      }
    } catch (error) {
      console.error(error);
    }
  }


  close() {
    this.dialogRef.close(false)
  }
}
