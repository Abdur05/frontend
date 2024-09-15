import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { SalaryListComponent } from './components/salary/salary-list/salary-list.component';
import { AddSalaryComponent } from './components/salary/add-salary/add-salary.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SalaryService } from './services/salary/salary.service';
import { EditSalaryComponent } from './components/salary/edit-salary/edit-salary.component';
import { SalaryTemplateListComponent } from './components/salary-template/salary-template-list/salary-template-list.component';
import { AddSalaryTemplateComponent } from './components/salary-template/add-salary-template/add-salary-template.component';
import { TaxesListComponent } from './components/taxes/taxes-list/taxes-list.component';
import { AddTaxesComponent } from './components/taxes/add-taxes/add-taxes.component';
import { SalaryTemplateService } from './services/salary-template/salary-template.service';
import { EditSalaryTemplateComponent } from './components/salary-template/edit-salary-template/edit-salary-template.component';
import { TaxesService } from './services/taxes/taxes.service';
import { EditTaxesComponent } from './components/taxes/edit-taxes/edit-taxes.component';
import { AddAdvancePaymentComponent } from './components/advance-payment/add-advance-payment/add-advance-payment.component';
import { AdvancePaymentListComponent } from './components/advance-payment/advance-payment-list/advance-payment-list.component';
import { DecimaldirectiveDirective } from './services/directive/decimaldirective.directive';
import { EditAdvancePaymentComponent } from './components/advance-payment/edit-advance-payment/edit-advance-payment.component';
import { AdvancePaymentService } from './services/advancePayment/advance-payment.service';
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
import { ExtraEarningService } from './services/extra-earning/extra-earning.service';
import { Form16Service } from './services/form16/form16.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateFormComponent } from './components/form16/create-form/create-form.component';
import { GetPayslipComponent } from './components/payslips/get-payslip/get-payslip/get-payslip.component';
import { ReviewTaxSubListComponent } from './components/review-tax-submission/review-tax-sub-list/review-tax-sub-list.component';
import { ViewReviewTaxSubComponent } from './components/review-tax-submission/view-review-tax-sub/view-review-tax-sub.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    SalaryListComponent,
    AddSalaryComponent,
    EditSalaryComponent,
    SalaryTemplateListComponent,
    AddSalaryTemplateComponent,
    TaxesListComponent,
    AddTaxesComponent,
    EditSalaryTemplateComponent,
    EditTaxesComponent,
    AddAdvancePaymentComponent,
    AdvancePaymentListComponent,
    DecimaldirectiveDirective,
    EditAdvancePaymentComponent,
    TaxDecEmployeeListComponent,
    AddTaxDecEmployeeComponent,
    EditTaxDecEmployeeComponent,
    TaxSubmissionEmployeeListComponent,
    AddTaxSubmissionEmployeeComponent,
    EditTaxSubmissionEmployeeComponent,
    Form16Component,
    ExtraEarningsComponent,
    PayslipsComponent,
    CreateEarningComponent,
    CreateFormComponent,
    GetPayslipComponent,
    ReviewTaxSubListComponent,
    ViewReviewTaxSubComponent,
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    MatDialogModule,
    BsDatepickerModule.forRoot(),
    PaginationModule
  ],
  providers: [SalaryService, SalaryTemplateService, TaxesService, AdvancePaymentService, ExtraEarningService, Form16Service]
})
export class PayrollModule { }
