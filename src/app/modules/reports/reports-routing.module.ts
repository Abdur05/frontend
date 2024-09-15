import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceReportComponent } from './components/employee/attendance-report/attendance-report.component';

const routes: Routes = [{
  path: 'attendance-list',
  component: AttendanceReportComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
