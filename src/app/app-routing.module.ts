import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'authr',
    pathMatch: 'full'
  },
  {
    path: 'authr',
    loadChildren: () => import('./modules/authr/authr.module').then(m => m.AuthrModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./modules/setting/setting.module').then(m => m.SettingModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'regularization',
    loadChildren: () => import('./modules/regularization/regularization.module').then(m => m.RegularizationModule)
  },
  {
    path: 'recruitment',
    loadChildren: () => import('./modules/recruitment/recruitment.module').then(m => m.RecruitmentModule)
  },
  {
    path: 'payroll',
    loadChildren: () => import('./modules/payroll/payroll.module').then(m => m.PayrollModule)
  },
  {
    path: 'asset',
    loadChildren: () => import('./modules/asset/asset.module').then(m => m.AssetModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'appraisal',
    loadChildren: () => import('./modules/appraisal/appraisal.module').then(m => m.AppraisalModule)
  },
  {
    path: 'policy',
    loadChildren: () => import('./modules/policy/policy.module').then(m => m.PolicyModule)
  },
  {
    path: 'shift',
    loadChildren: () => import('./modules/shift-roaster/shift-roaster.module').then(m => m.ShiftRoasterModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./modules/training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
