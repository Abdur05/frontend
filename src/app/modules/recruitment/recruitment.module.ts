import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { JobListComponent } from './components/jobs/job-list/job-list.component';
import { AddJobComponent } from './components/jobs/add-job/add-job.component';
import { EditJobComponent } from './components/jobs/edit-job/edit-job.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CadidateListComponent } from './components/candidate/cadidate-list/cadidate-list.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/candidate/edit-candidate/edit-candidate.component';
import { ApplyJobListComponent } from './components/apply-job/apply-job-list/apply-job-list.component';
import { AddApplyJobComponent } from './components/apply-job/add-apply-job/add-apply-job.component';
import { JobService } from './services/jobs/-job.service';
import { CandidateService } from './services/candidate/candidate.service';
import { ApplyJobService } from './services/applyJob/apply-job.service';
import { ViewCandidateComponent } from './components/candidate/view-candidate/view-candidate.component';
import { PreOnBoardingListComponent } from './components/pre-on-boarding/pre-on-boarding-list/pre-on-boarding-list.component';
import { UpdatePreOnBoardingComponent } from './components/pre-on-boarding/update-pre-on-boarding/update-pre-on-boarding.component';
import { UpdateStatusCandidateComponent } from './components/candidate/update-status-candidate/update-status-candidate.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PreOnboardingService } from './services/pre-onboarding/pre-onboarding.service';
import { VerfiedPerOnBoardingComponent } from './components/pre-on-boarding/verfied-per-on-boarding/verfied-per-on-boarding.component';
import { ViewPdfFileComponent } from './components/pre-on-boarding/view-pdf-file/view-pdf-file.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SalaryPreOnBoardingComponent } from './components/pre-on-boarding/salary-pre-on-boarding/salary-pre-on-boarding.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OfferLetterApprovalComponent } from './components/offer-letter-approval/offer-letter-approval/offer-letter-approval.component';
import { OnBoardingListComponent } from './components/on-boarding/on-boarding-list/on-boarding-list.component';
import { OnBoardingProfileDetailsComponent } from './components/on-boarding/on-boarding-profile-details/on-boarding-profile-details.component';
import { ViewJobComponent } from './components/jobs/view-job/view-job.component';


@NgModule({
  declarations: [
    JobListComponent,
    AddJobComponent,
    EditJobComponent,
    CadidateListComponent,
    AddCandidateComponent,
    EditCandidateComponent,
    ApplyJobListComponent,
    AddApplyJobComponent,
    ViewCandidateComponent,
    PreOnBoardingListComponent,
    UpdatePreOnBoardingComponent,
    UpdateStatusCandidateComponent,
    VerfiedPerOnBoardingComponent,
    ViewPdfFileComponent,
    SalaryPreOnBoardingComponent,
    OfferLetterApprovalComponent,
    OnBoardingListComponent,
    OnBoardingProfileDetailsComponent,
    ViewJobComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    MatExpansionModule,
    MatFormFieldModule,
    NgxExtendedPdfViewerModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [JobService, CandidateService, ApplyJobService, PreOnboardingService]
})
export class RecruitmentModule { }
