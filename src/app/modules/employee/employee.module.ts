import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MyProfileComponent } from './components/my-profile/my-profile/my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MyProfileListComponent } from './components/my-profile/my-profile-list/my-profile-list.component';
import { EditMyProfileComponent } from './components/my-profile/edit-my-profile/edit-my-profile.component';
import { MyProfileService } from './services/my-profile/my-profile.service';
import { HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ComplaintListComponent } from './components/complaint/complaint-list/complaint-list.component';
import { AddComplaintComponent } from './components/complaint/add-complaint/add-complaint.component';
import { ComplaintService } from './services/complaint/complaint.service';
import { EditComplaintComponent } from './components/complaint/edit-complaint/edit-complaint.component';
import { ViewMyProfileComponent } from './components/my-profile/view-my-profile/view-my-profile.component';
import { ApproveComplaintComponent } from './components/complaint/approve-complaint/approve-complaint.component';
import { LoanRequestListComponent } from './components/loan-request/loan-request-list/loan-request-list.component';
import { AddLoanRequestComponent } from './components/loan-request/add-loan-request/add-loan-request.component';
import { EditLoanRequestComponent } from './components/loan-request/edit-loan-request/edit-loan-request.component';
import { LoanRequestService } from './services/loan-request/loan-request.service';
import { ApproveLoanRequestComponent } from './components/loan-request/approve-loan-request/approve-loan-request.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LoanApprovalListComponent } from './components/loan-request/loan-approval-list/loan-approval-list.component';
import { MyDocumentsComponent } from './components/my-documents/my-documents.component';
import { MyDocumentsService } from './services/my-documents/my-documents.service';


@NgModule({
  declarations: [
    MyProfileComponent,
    MyProfileListComponent,
    EditMyProfileComponent,
    ComplaintListComponent,
    AddComplaintComponent,
    EditComplaintComponent,
    ViewMyProfileComponent,
    ApproveComplaintComponent,
    LoanRequestListComponent,
    AddLoanRequestComponent,
    EditLoanRequestComponent,
    ApproveLoanRequestComponent,
    LoanApprovalListComponent,
    MyDocumentsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
FormsModule

  ], providers: [MyProfileService, ComplaintService, LoanRequestService, MyDocumentsService]
})
export class EmployeeModule { }
