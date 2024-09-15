import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../../services/candidate/candidate.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { PreOnboardingService } from '../../../services/pre-onboarding/pre-onboarding.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-offer-letter-approval',
  templateUrl: './offer-letter-approval.component.html',
  styleUrls: ['./offer-letter-approval.component.css']
})
export class OfferLetterApprovalComponent {

  candidatedataId: any = '';
  pdfSrc: any = ''
  candidatesDetails: any = '';
  acceptShow:any = ''
  constructor(
    private activateRouter: ActivatedRoute,
    private candidateSer: CandidateService,
    private preOnboardSer: PreOnboardingService,
    private _snackBar: MatSnackBar
  ) {
    pdfDefaultOptions.assetsFolder = 'bleeding-edge';
    this.candidatedataId = this.activateRouter.snapshot.paramMap.get('id')
    this.getSinglecandidateDetails()

  }


  async getSinglecandidateDetails() {
    try {
      const result: any = await this.candidateSer.singlecandidateDetail(this.candidatedataId);
      // console.log(result.data[0]);
      this.candidatesDetails = result.data[0];
      if(result.data[0].status === 'Accepted'){
        this.acceptShow = true
      }else{
        this.acceptShow = false

      }
      this.pdfSrc = 'http://localhost:4000/file?path=' + result.data[0].offer_letter_url;
    } catch (error: any) {
      console.log(error)
      // this._snackBar.open(error.error.message, '', {
      //   duration: 5 * 1000, horizontalPosition: 'center',
      //   verticalPosition: 'top',
      //   panelClass: 'app-notification-error',
      // });
    }
  }


  async handleOfferUpdateStatus(status: any) {
    try {
      const req = {
        offer_letter_status: status
      }
      const result: any = await this.preOnboardSer.updatePreOnboardingOfferAccepct(this.candidatesDetails.candidateId, req);
      if (result.status) {
        this.acceptShow = true;
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error) {
      console.error(error);
      this._snackBar.open('Please Contact HR', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
}
