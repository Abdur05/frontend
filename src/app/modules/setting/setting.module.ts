import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { AddLocationComponent } from './components/location/add-location/add-location.component';
import { EditLocationComponent } from './components/location/edit-location/edit-location.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { LeaveTypeListComponent } from './components/leave-type/leave-type-list/leave-type-list.component';
import { AddLeaveTypeComponent } from './components/leave-type/add-leave-type/add-leave-type.component';
import { AddDesignationComponent } from './components/designation/add-designation/add-designation.component';
import { DesignationListComponent } from './components/designation/designation-list/designation-list.component';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { AddQuestionComponent } from './components/question/add-question/add-question.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { HolidayListComponent } from './components/holiday/holiday-list/holiday-list.component';
import { AddHolidayComponent } from './components/holiday/add-holiday/add-holiday.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AddApplyLeaveComponent } from './components/apply-leave/add-apply-leave/add-apply-leave.component';
import { ApplyLeaveListComponent } from './components/apply-leave/apply-leave-list/apply-leave-list.component';
import { FourdirectiveDirective } from './services/directive/fourdirective.directive';
import { LocationService } from './services/location/location.service';
import { HttpClientModule } from '@angular/common/http';
import { DesignationService } from './services/designation/designation.service';
import { DepartmentService } from './services/department/department.service';
import { MedicalQuestionService } from './services/medicalQuestion/medical-question.service';
import { CompanyCodeService } from './services/companyCode/company-code.service';
import { EditQuestionComponent } from './components/question/edit-question/edit-question.component';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code.component';
import { EditDesignationComponent } from './components/designation/edit-designation/edit-designation.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { LeaveTypeService } from './services/leaveType/leave-type.service';
import { EditLeaveTypeComponent } from './components/leave-type/edit-leave-type/edit-leave-type.component';
import { HolidayService } from './services/holiday/holiday.service';
import { EditHolidayComponent } from './components/holiday/edit-holiday/edit-holiday.component';
import { ViewImageComponent } from './components/viewImage/view-image/view-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ApplyLeaveService } from './services/apply-leave/apply-leave.service';
import { EditApplyLeaveComponent } from './components/apply-leave/edit-apply-leave/edit-apply-leave.component';
import { ReasonListComponent } from './components/reason/reason-list/reason-list.component';
import { AddReasonComponent } from './components/reason/add-reason/add-reason.component';
import { EditReasonComponent } from './components/reason/edit-reason/edit-reason.component';
import { ReasonService } from './services/reason/reason.service';
import { GeneralSettingListComponent } from './components/general-setting/general-setting-list/general-setting-list.component';
import { AddGeneralSettingComponent } from './components/general-setting/add-general-setting/add-general-setting.component';
import { EditGeneralSettingComponent } from './components/general-setting/edit-general-setting/edit-general-setting.component';
import { GeneralSettingService } from './services/general/general-setting.service';
import { AddMarkAttendanceComponent } from './components/mark-attendance/add-mark-attendance/add-mark-attendance.component';
import { MarkAttendanceService } from './services/attendance/mark-attendance.service';
import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import { EditRoleComponent } from './components/role/edit-role/edit-role.component';
import { ApprovalLeavelListComponent } from './components/approval-leavel/approval-leavel-list/approval-leavel-list.component';
import { EditApprovalLeaveComponent } from './components/approval-leavel/edit-approval-leave/edit-approval-leave.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { AddWeeklyOffDaysComponent } from './components/weekly-off-days/add-weekly-off-days/add-weekly-off-days.component';
import { WeeklyOffDaysService } from './services/weekly-off-days/weekly-off-days.service';
import { ViewPdfComponent } from './components/view-pdf/view-pdf/view-pdf.component';
import { AddEmailNotificationComponent } from './components/email-notification/add-email-notification/add-email-notification.component';
import { EditEmailNotificationComponent } from './components/email-notification/edit-email-notification/edit-email-notification.component';
import { EmailNotificationListComponent } from './components/email-notification/email-notification-list/email-notification-list.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmailNotificationService } from './services/email-notificcation/email-notification.service';
import { ShiftListComponent } from './components/shift/shift-list/shift-list.component';
import { AddShiftComponent } from './components/shift/add-shift/add-shift.component';
import { EditShiftComponent } from './components/shift/edit-shift/edit-shift.component';
import { ShiftMaintenanceService } from './services/shift/shift-maintenance.service';
import { EmployeeTypeListComponent } from './components/employee-type/employee-type-list/employee-type-list.component';
import { AddEmployeeTypeComponent } from './components/employee-type/add-employee-type/add-employee-type.component';
import { EditEmployeeTypeComponent } from './components/employee-type/edit-employee-type/edit-employee-type.component';
import { EmployeeTypeService } from './services/employee-type/employee-type.service';
import { LoanApprovalListComponent } from './components/loan-approval-config/loan-approval-list/loan-approval-list.component';
import { AddLoanApprovalComponent } from './components/loan-approval-config/add-loan-approval/add-loan-approval.component';
import { EditLoanApprovalComponent } from './components/loan-approval-config/edit-loan-approval/edit-loan-approval.component';
import { LoanApproveConfigService } from './services/loan-approve-config/loan-approve-config.service';
import { AddJobTypeComponent } from './components/job-type/add-job-type/add-job-type.component';
import { EditJobTypeComponent } from './components/job-type/edit-job-type/edit-job-type.component';
import { JobTypeListComponent } from './components/job-type/job-type-list/job-type-list.component';
import { JobTypeService } from './services/job-type/job-type.service';
import { EventTypeListComponent } from './components/event-type/event-type-list/event-type-list.component';
import { AddEventTypeComponent } from './components/event-type/add-event-type/add-event-type.component';
import { EditEventTypeComponent } from './components/event-type/edit-event-type/edit-event-type.component';
import { CompanyCalendarListComponent } from './components/company-calender/company-calendar-list/company-calendar-list.component';
import { AddCompanyCalendarComponent } from './components/company-calender/add-company-calendar/add-company-calendar.component';
import { EditCompanyCalendarComponent } from './components/company-calender/edit-company-calendar/edit-company-calendar.component';
import { TaxDeclarationListComponent } from './components/tax-declaration/tax-declaration-list/tax-declaration-list.component';
import { AddTaxDeclarationComponent } from './components/tax-declaration/add-tax-declaration/add-tax-declaration.component';
import { EditTaxDeclarationComponent } from './components/tax-declaration/edit-tax-declaration/edit-tax-declaration.component';
import { TaxDeclarationService } from './services/tax-declaration/tax-declaration.service';
import { TaxSettingListComponent } from './components/tax-setting/tax-setting-list/tax-setting-list.component';
import { AddTaxSettingComponent } from './components/tax-setting/add-tax-setting/add-tax-setting.component';
import { EditTaxSettingComponent } from './components/tax-setting/edit-tax-setting/edit-tax-setting.component';
import { TaxSettingService } from './services/tax-setting/tax-setting.service';
import { SalaryComponentListComponent } from './components/salary-component/salary-component-list/salary-component-list.component';
import { AddSalaryComponentComponent } from './components/salary-component/add-salary-component/add-salary-component.component';
import { EditSalaryComponentComponent } from './components/salary-component/edit-salary-component/edit-salary-component.component';
import { SalaryComponentService } from './services/salary-component/salary-component.service';
import { MarkAttendanceListComponent } from './components/mark-attendance/mark-attendance-list/mark-attendance-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddTaxSlabComponent } from './components/tax-slab/add-tax-slab/add-tax-slab.component';
import { TaxSlabListComponent } from './components/tax-slab/tax-slab-list/tax-slab-list.component';
import { AddRolesComponent } from './components/roles/add-roles/add-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';
import { ViewRolesComponent } from './components/roles/view-roles/view-roles.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { EventViewDialogComponent } from './components/holiday/event-view-dialog/event-view-dialog.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { SubCategoryListComponent } from './components/subCategory/sub-category-list/sub-category-list.component';
import { AddSubCategoryComponent } from './components/subCategory/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './components/subCategory/edit-sub-category/edit-sub-category.component';
import { AwardListComponent } from './components/award/award-list/award-list.component';
import { AddAwardComponent } from './components/award/add-award/add-award.component';
import { EditAwardComponent } from './components/award/edit-award/edit-award.component';
import { AppreciationNoteListComponent } from './components/appreciationNote/appreciation-note-list/appreciation-note-list.component';
import { AddAppreciationNoteComponent } from './components/appreciationNote/add-appreciation-note/add-appreciation-note.component';
import { EditAppreciationNoteComponent } from './components/appreciationNote/edit-appreciation-note/edit-appreciation-note.component';
import { RecognitionListComponent } from './components/recognition/recognition-list/recognition-list.component';
import { AddRecognitionComponent } from './components/recognition/add-recognition/add-recognition.component';
import { EditRecognitionComponent } from './components/recognition/edit-recognition/edit-recognition.component';
import { RecognitionService } from './services/recognition/recognition.service';
import { AppreciationawardListComponent } from './components/recognition/appreciationaward-list/appreciationaward-list.component';
import { ViewJobTypeComponent } from './components/job-type/view-job-type/view-job-type.component';
import { EditTaxSlabComponent } from './components/tax-slab/edit-tax-slab/edit-tax-slab.component';

@NgModule({
  declarations: [
    LocationListComponent,
    AddLocationComponent,
    EditLocationComponent,
    DepartmentListComponent,
    AddDepartmentComponent,
    LeaveTypeListComponent,
    AddLeaveTypeComponent,
    AddDesignationComponent,
    DesignationListComponent,
    AddCompanyCodeComponent,
    CompanyCodeListComponent,
    AddQuestionComponent,
    QuestionListComponent,
    HolidayListComponent,
    AddHolidayComponent,
    AddApplyLeaveComponent,
    ApplyLeaveListComponent,
    FourdirectiveDirective,
    EditQuestionComponent,
    EditCompanyCodeComponent,
    EditDesignationComponent,
    EditDepartmentComponent,
    EditLeaveTypeComponent,
    EditHolidayComponent,
    ViewImageComponent,
    EditApplyLeaveComponent,
    ReasonListComponent,
    AddReasonComponent,
    EditReasonComponent,
    GeneralSettingListComponent,
    AddGeneralSettingComponent,
    EditGeneralSettingComponent,
    AddMarkAttendanceComponent,
    RolesListComponent,
    AddRoleComponent,
    EditRoleComponent,
    ApprovalLeavelListComponent,
    EditApprovalLeaveComponent,
    AddWeeklyOffDaysComponent,
    ViewPdfComponent,
    AddEmailNotificationComponent,
    EditEmailNotificationComponent,
    EmailNotificationListComponent,
    ShiftListComponent,
    AddShiftComponent,
    EditShiftComponent,
    EmployeeTypeListComponent,
    AddEmployeeTypeComponent,
    EditEmployeeTypeComponent,
    LoanApprovalListComponent,
    AddLoanApprovalComponent,
    EditLoanApprovalComponent,
    AddJobTypeComponent,
    EditJobTypeComponent,
    JobTypeListComponent,
    EventTypeListComponent,
    AddEventTypeComponent,
    EditEventTypeComponent,
    CompanyCalendarListComponent,
    AddCompanyCalendarComponent,
    EditCompanyCalendarComponent,
    TaxDeclarationListComponent,
    AddTaxDeclarationComponent,
    EditTaxDeclarationComponent,
    TaxSettingListComponent,
    AddTaxSettingComponent,
    EditTaxSettingComponent,
    SalaryComponentListComponent,
    AddSalaryComponentComponent,
    EditSalaryComponentComponent,
    MarkAttendanceListComponent,
    AddTaxSlabComponent,
    TaxSlabListComponent,
    AddRolesComponent,
    EditRolesComponent,
    ViewRolesComponent,
    RolesListComponent,
    RoleListComponent,
    EventViewDialogComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    SubCategoryListComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    AwardListComponent,
    AddAwardComponent,
    EditAwardComponent,
    AppreciationNoteListComponent,
    AddAppreciationNoteComponent,
    EditAppreciationNoteComponent,
    RecognitionListComponent,
    ViewJobTypeComponent,
    EditTaxSlabComponent,
    AddRecognitionComponent,
    EditRecognitionComponent,
    EditAppreciationNoteComponent,
    AppreciationawardListComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
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
    TypeaheadModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FormsModule,
    ScheduleModule,
    NgMultiSelectDropDownModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [RecognitionService, SalaryComponentService, DatePipe, TaxSettingService, TaxDeclarationService, JobTypeService, LocationService, DesignationService, DepartmentService, MedicalQuestionService, CompanyCodeService, LeaveTypeService, HolidayService, ApplyLeaveService, ReasonService, GeneralSettingService, MarkAttendanceService, AgendaService, DayService, WeekService, WorkWeekService, MonthService, WeeklyOffDaysService, EmailNotificationService, ShiftMaintenanceService, EmployeeTypeService, LoanApproveConfigService]
})
export class SettingModule { }