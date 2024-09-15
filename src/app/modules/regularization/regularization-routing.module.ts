import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestListComponent } from './components/my-request/my-request-list/my-request-list.component';
import { AddMyRequestComponent } from './components/my-request/add-my-request/add-my-request.component';
import { EditMyRequestComponent } from './components/my-request/edit-my-request/edit-my-request.component';
import { MyApprovalListComponent } from './components/my-approval/my-approval-list/my-approval-list.component';
import { AddMyApprovalComponent } from './components/my-approval/add-my-approval/add-my-approval.component';
import { EditMyApprovalComponent } from './components/my-approval/edit-my-approval/edit-my-approval.component';

const routes: Routes = [
  {
    path: 'my-request-list',
    component: MyRequestListComponent
  },
  {
    path: 'add-my-request',
    component: AddMyRequestComponent
  },
  {
    path: 'edit-my-request/:id',
    component: EditMyRequestComponent
  },
  {
    path: 'my-approval-list',
    component: MyApprovalListComponent
  },
  {
    path: 'add-my-approval',
    component: AddMyApprovalComponent
  },
  {
    path: 'edit-my-approval/:id',
    component: EditMyApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegularizationRoutingModule { }
