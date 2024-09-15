import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { PolicyListComponent } from './components/policy/policy-list/policy-list.component';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { EditPolicyComponent } from './components/policy/edit-policy/edit-policy.component';
import { ViewPolicyComponent } from './components/policy/view-policy/view-policy.component';


@NgModule({
  declarations: [
    PolicyListComponent,
    AddPolicyComponent,
    EditPolicyComponent,
    ViewPolicyComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
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
    TypeaheadModule.forRoot()
  ]
})
export class PolicyModule { }
