import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegularizationRoutingModule } from './regularization-routing.module';
import { MyRequestListComponent } from './components/my-request/my-request-list/my-request-list.component';
import { AddMyRequestComponent } from './components/my-request/add-my-request/add-my-request.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MyRequestService } from './services/my-request/my-request.service';
import { EditMyRequestComponent } from './components/my-request/edit-my-request/edit-my-request.component';
import { AddMyApprovalComponent } from './components/my-approval/add-my-approval/add-my-approval.component';
import { EditMyApprovalComponent } from './components/my-approval/edit-my-approval/edit-my-approval.component';
import { MyApprovalListComponent } from './components/my-approval/my-approval-list/my-approval-list.component';
import { MyApprovalService } from './services/my-approval/my-approval.service';
import { ViewMyRequestComponent } from './components/my-request/view-my-request/view-my-request.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    MyRequestListComponent,
    AddMyRequestComponent,
    EditMyRequestComponent,
    AddMyApprovalComponent,
    EditMyApprovalComponent,
    MyApprovalListComponent,
    ViewMyRequestComponent
  ],
  imports: [
    CommonModule,
    RegularizationRoutingModule,
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
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    FormsModule

  ],providers:[MyRequestService,MyApprovalService]
})
export class RegularizationModule { }
