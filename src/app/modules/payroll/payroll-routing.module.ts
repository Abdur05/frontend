import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalaryListComponent } from './components/salary/salary-list/salary-list.component';
import { AddSalaryComponent } from './components/salary/add-salary/add-salary.component';
import { EditSalaryComponent } from './components/salary/edit-salary/edit-salary.component';
import { SalaryTemplateListComponent } from './components/salary-template/salary-template-list/salary-template-list.component';
import { AddSalaryTemplateComponent } from './components/salary-template/add-salary-template/add-salary-template.component';
import { TaxesListComponent } from './components/taxes/taxes-list/taxes-list.component';
import { AddTaxesComponent } from './components/taxes/add-taxes/add-taxes.component';
import { EditSalaryTemplateComponent } from './components/salary-template/edit-salary-template/edit-salary-template.component';
import { EditTaxesComponent } from './components/taxes/edit-taxes/edit-taxes.component';
import { AdvancePaymentListComponent } from './components/advance-payment/advance-payment-list/advance-payment-list.component';
import { AddAdvancePaymentComponent } from './components/advance-payment/add-advance-payment/add-advance-payment.component';
import { EditAdvancePaymentComponent } from './components/advance-payment/edit-advance-payment/edit-advance-payment.component';
import { TaxDecEmployeeListComponent } from './components/tax-dec-employee/tax-dec-employee-list/tax-dec-employee-list.component';
import { AddTaxDecEmployeeComponent } from './components/tax-dec-employee/add-tax-dec-employee/add-tax-dec-employee.component';
import { EditTaxDecEmployeeComponent } from './components/tax-dec-employee/edit-tax-dec-employee/edit-tax-dec-employee.component';
import { TaxSubmissionEmployeeListComponent } from './components/tax-submission-employee/tax-submission-employee-list/tax-submission-employee-list.component';
import { AddTaxSubmissionEmployeeComponent } from './components/tax-submission-employee/add-tax-submission-employee/add-tax-submission-employee.component';
import { EditTaxSubmissionEmployeeComponent } from './components/tax-submission-employee/edit-tax-submission-employee/edit-tax-submission-employee.component';
import { Form16Component } from './components/form16/form16.component';
import { ExtraEarningsComponent } from './components/extra-earnings/extra-earnings.component';
import { PayslipsComponent } from './components/payslips/payslips.component';
import { CreateEarningComponent } from './components/extra-earnings/create-earning/create-earning.component';
import { ReviewTaxSubListComponent } from './components/review-tax-submission/review-tax-sub-list/review-tax-sub-list.component';
import { ViewReviewTaxSubComponent } from './components/review-tax-submission/view-review-tax-sub/view-review-tax-sub.component';

const routes: Routes = [
  {
    path: 'salary-list',
    component: SalaryListComponent
  },
  {
    path: 'add-salary',
    component: AddSalaryComponent
  },
  {
    path: 'edit-salary/:id',
    component: EditSalaryComponent
  },
  {
    path: 'salary-template-list',
    component: SalaryTemplateListComponent
  },
  {
    path: 'add-salary-template',
    component: AddSalaryTemplateComponent
  },
  {
    path: 'taxes-list',
    component: TaxesListComponent
  },
  {
    path: 'add-taxes',
    component: AddTaxesComponent
  },
  {
    path: 'edit-salary-template/:id',
    component: EditSalaryTemplateComponent
  },
  {
    path: 'edit-taxes/:id',
    component: EditTaxesComponent
  },
  {
    path: 'advance-payment-list',
    component: AdvancePaymentListComponent
  },
  {
    path: 'add-advance-payment',
    component: AddAdvancePaymentComponent
  },
  {
    path: 'edit-advance-payment/:id',
    component: EditAdvancePaymentComponent
  },
  {
    path: 'tax-declaration-employee-list',
    component: TaxDecEmployeeListComponent
  },
  {
    path: 'add-tax-declaration-employee',
    component: AddTaxDecEmployeeComponent
  },
  {
    path: 'edit-tax-declaration-employee/:id',
    component: EditTaxDecEmployeeComponent
  },
  {
    path: 'tax-submission-employee-list',
    component: TaxSubmissionEmployeeListComponent
  },
  {
    path: 'add-tax-submission',
    component: AddTaxSubmissionEmployeeComponent
  },
  {
    path: 'edit-tax-submission/:id',
    component: EditTaxSubmissionEmployeeComponent
  },
  {
    path: 'form16',
    component: Form16Component
  },
  {
    path: 'extra-earnings',
    component: ExtraEarningsComponent
  },
  {
    path: 'payslips',
    component: PayslipsComponent
  },
  {
    path: 'create-earning',
    component: CreateEarningComponent
  },
  {
    path: 'review-tax-submission-list',
    component: ReviewTaxSubListComponent
  },
  {
    path: 'view-review-tax-submission',
    component: ViewReviewTaxSubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
