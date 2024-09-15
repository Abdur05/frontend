import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboradListComponent } from './components/dashboard/dashborad-list/dashborad-list.component';

const routes: Routes = [
  {
    path:'view',
    component:DashboradListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
