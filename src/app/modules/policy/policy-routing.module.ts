import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPolicyComponent } from './components/policy/add-policy/add-policy.component';
import { PolicyListComponent } from './components/policy/policy-list/policy-list.component';
import { EditPolicyComponent } from './components/policy/edit-policy/edit-policy.component';

const routes: Routes = [
  {
    path: 'add-policy',
    component: AddPolicyComponent
  },
  {
    path: 'policy-list',
    component: PolicyListComponent
  },
  {
    path:'edit-policy/:id',
    component:EditPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRoutingModule { }
