import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { CompanyCodeService } from 'src/app/modules/setting/services/companyCode/company-code.service';

@Component({
  selector: 'app-update-status-candidate',
  templateUrl: './update-status-candidate.component.html',
  styleUrls: ['./update-status-candidate.component.css']
})
export class UpdateStatusCandidateComponent {

  candidateFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  candidateDataId: any = ''
  resultData: any = [];
  interviewDataId: any = ''
  interviewerList: any = [];
  today: any = '';
  companyList: any = [];
  companyAddrress: any = ''

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<UpdateStatusCandidateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private candidateSer: CandidateService,
    private companySer: CompanyCodeService
  ) { }

  ngOnInit(): void {
    this.candidateDataId = this.data
    this.crateFormdata()
    this.getCandidateDetails();
    this.getAllInterviewerList();
    this.setMinDateTime();
    this.getCompanyDetails()
  }

  setMinDateTime() {
    const now = new Date();
    this.today = this.formatDateTimeForInput(now);
  }

  formatDateTimeForInput(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  crateFormdata() {
    this.candidateFormGroup = this.fb.group({
      _id: ['', Validators.required],
      candidateId: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      interviewerFeedBack: ['', [Validators.required]],
      status: ['', [Validators.required]],
      jobId: [''],
      mode: [''],
      interViewerList: [''],
      online_meeting_link: [''],
      dateOfMeeting: [''],
      offlineAddress: [''],
    })
    this.candidateFormGroup.get('status').valueChanges.subscribe((status: any) => {
      if (status === 'Next Round') {
        this.candidateFormGroup.get('interViewerList').setValidators([Validators.required]);
        this.candidateFormGroup.get('dateOfMeeting').setValidators([Validators.required]);
        this.candidateFormGroup.get('mode').setValidators([Validators.required]);


        this.candidateFormGroup.get('mode').valueChanges.subscribe((mode: any) => {
          if (mode === 'online') {
            this.candidateFormGroup.get('online_meeting_link').setValidators([Validators.required]);
            this.candidateFormGroup.get('offlineAddress').clearValidators();
            this.candidateFormGroup.controls.offlineAddress.setValue("")
          } else {
            this.candidateFormGroup.get('online_meeting_link').clearValidators();
            this.candidateFormGroup.controls.offlineAddress.setValue(this.companyAddrress)
            this.candidateFormGroup.get('offlineAddress').setValidators([Validators.required]);
          }
          this.candidateFormGroup.get('online_meeting_link').updateValueAndValidity();
          this.candidateFormGroup.get('offlineAddress').updateValueAndValidity();
        });
      } else {
        this.candidateFormGroup.get('online_meeting_link').clearValidators();
        this.candidateFormGroup.get('offlineAddress').clearValidators();
        this.candidateFormGroup.get('interViewerList').clearValidators();
        this.candidateFormGroup.get('mode').clearValidators();
        this.candidateFormGroup.get('dateOfMeeting').clearValidators();
        this.candidateFormGroup.controls.offlineAddress.setValue("")

      }

      this.candidateFormGroup.get('interViewerList').updateValueAndValidity();
      this.candidateFormGroup.get('mode').updateValueAndValidity();
      this.candidateFormGroup.get('dateOfMeeting').updateValueAndValidity();

    });
  }


  async getCandidateDetails() {
    try {
      const result: any = await this.candidateSer.singlecandidateDetail(this.candidateDataId)
      this.resultData = result.data[0]
      console.log(this.resultData.interview_details[0].interviewId);
      this.interviewDataId = this.resultData.interview_details[0].interviewId
      if (result.data.length > 0) {
        this.resultData = result.data[0]
        this.candidateFormGroup.patchValue(result.data[0]);
        this.candidateFormGroup.controls.status.setValue("")

      }
    } catch (error) {
      console.log(error)
    }
  }

  async getCompanyDetails() {
    try {
      const result: any = await this.companySer.getAllCompanyCodeDetail()
      console.log(result, 'inter');

      if (result) {
        this.companyList = result.data;
        this.companyAddrress = result.data[0].address1
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllInterviewerList() {
    try {
      const result: any = await this.candidateSer.getAllInterviewerListDetail()
      console.log(result, 'inter');

      if (result) {
        this.interviewerList = result.data
      }
    } catch (error: any) {
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  transformProperties(data: any) {
    return {
      candidate_ref: data.candidateId,
      job_ref: data.jobId,
      interview_date_time: data.dateOfMeeting,
      interviewer: data.interViewerList,
      mode: data.mode,
      online_meeting_link: data.online_meeting_link,
      status: data.status,
      offlineAddress:data.offlineAddress
    };
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.candidateFormGroup);

      if (this.candidateFormGroup.invalid)
        return
      const transformedData = this.transformProperties(this.candidateFormGroup.value);
      console.log(transformedData)


      console.log(this.interviewDataId, 'interview')
      const result: any = await this.candidateSer.updatenterviewAfterScheduled(transformedData, this.interviewDataId)
      if (result.status) {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/recruitment/candidate-list/']);
        this.dialogRef.close(true)
        return
      }
      if (!result.status) {
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


}
