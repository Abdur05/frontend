import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './components/my-profile/my-profile/my-profile.component';
import { MyProfileListComponent } from './components/my-profile/my-profile-list/my-profile-list.component';
import { EditMyProfileComponent } from './components/my-profile/edit-my-profile/edit-my-profile.component';
import { ComplaintListComponent } from './components/complaint/complaint-list/complaint-list.component';
import { AddComplaintComponent } from './components/complaint/add-complaint/add-complaint.component';
import { EditComplaintComponent } from './components/complaint/edit-complaint/edit-complaint.component';
import { ApproveComplaintComponent } from './components/complaint/approve-complaint/approve-complaint.component';
import { LoanRequestListComponent } from './components/loan-request/loan-request-list/loan-request-list.component';
import { AddLoanRequestComponent } from './components/loan-request/add-loan-request/add-loan-request.component';
import { EditLoanRequestComponent } from './components/loan-request/edit-loan-request/edit-loan-request.component';
import { ApproveLoanRequestComponent } from './components/loan-request/approve-loan-request/approve-loan-request.component';
import { LoanApprovalListComponent } from './components/loan-request/loan-approval-list/loan-approval-list.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent
  }, {
    path: 'my-profile-list',
    component: MyProfileListComponent
  },
  {
    path: 'edit-my-profile/:id',
    component: EditMyProfileComponent
  },
  {
    path: 'complaint-list',
    component: ComplaintListComponent
  },
  {
    path: 'add-complaint',
    component: AddComplaintComponent
  },
  {
    path: 'edit-complaint/:id',
    component: EditComplaintComponent
  },
  {
    path: 'approve-complaint/:id',
    component: ApproveComplaintComponent
  },
  {
    path: 'loan-request-list',
    component: LoanRequestListComponent
  },
  {
    path: 'loan-approval-list',
    component: LoanApprovalListComponent
  },
  {
    path: 'add-loan-request',
    component: AddLoanRequestComponent
  },
  {
    path: 'edit-loan-request/:id',
    component: EditLoanRequestComponent
  },
  {
    path: 'approve-loan-request/:id',
    component: ApproveLoanRequestComponent
  },
  {
    path: 'my-document-list',
    component: MyDocumentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
