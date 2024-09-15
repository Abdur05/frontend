import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './components/jobs/job-list/job-list.component';
import { AddJobComponent } from './components/jobs/add-job/add-job.component';
import { EditJobComponent } from './components/jobs/edit-job/edit-job.component';
import { CadidateListComponent } from './components/candidate/cadidate-list/cadidate-list.component';
import { AddCandidateComponent } from './components/candidate/add-candidate/add-candidate.component';
import { EditCandidateComponent } from './components/candidate/edit-candidate/edit-candidate.component';
import { ApplyJobListComponent } from './components/apply-job/apply-job-list/apply-job-list.component';
import { AddApplyJobComponent } from './components/apply-job/add-apply-job/add-apply-job.component';
import { PreOnBoardingListComponent } from './components/pre-on-boarding/pre-on-boarding-list/pre-on-boarding-list.component';
import { UpdatePreOnBoardingComponent } from './components/pre-on-boarding/update-pre-on-boarding/update-pre-on-boarding.component';
import { OfferLetterApprovalComponent } from './components/offer-letter-approval/offer-letter-approval/offer-letter-approval.component';
import { OnBoardingListComponent } from './components/on-boarding/on-boarding-list/on-boarding-list.component';

const routes: Routes = [
  {
    path: 'job-list',
    component: JobListComponent
  },
  {
    path: 'add-job',
    component: AddJobComponent
  },
  {
    path: 'edit-job/:id',
    component: EditJobComponent
  },
  {
    path: 'candidate-list',
    component: CadidateListComponent
  },
  {
    path: 'add-candidate',
    component: AddCandidateComponent
  },
  {
    path: 'edit-candidate/:id',
    component: EditCandidateComponent
  },
  {
    path: 'apply-job-list',
    component: ApplyJobListComponent
  },
  {
    path: 'add-apply-job/:id',
    component: AddApplyJobComponent
  },
  {
    path: 'pre-onBoarding-list',
    component: PreOnBoardingListComponent
  },
  {
    path: 'update-pre-onBoarding/:id',
    component: UpdatePreOnBoardingComponent
  },
  {
    path: 'accpectOfferLetter/:id',
    component: OfferLetterApprovalComponent
  },
  {
    path: 'onBoarding-list',
    component: OnBoardingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
