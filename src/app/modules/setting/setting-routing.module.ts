import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { AddLocationComponent } from './components/location/add-location/add-location.component';
import { DepartmentListComponent } from './components/department/department-list/department-list.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { LeaveTypeListComponent } from './components/leave-type/leave-type-list/leave-type-list.component';
import { AddLeaveTypeComponent } from './components/leave-type/add-leave-type/add-leave-type.component';
import { DesignationListComponent } from './components/designation/designation-list/designation-list.component';
import { AddDesignationComponent } from './components/designation/add-designation/add-designation.component';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { AddQuestionComponent } from './components/question/add-question/add-question.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { HolidayListComponent } from './components/holiday/holiday-list/holiday-list.component';
import { AddHolidayComponent } from './components/holiday/add-holiday/add-holiday.component';
import { ApplyLeaveListComponent } from './components/apply-leave/apply-leave-list/apply-leave-list.component';
import { AddApplyLeaveComponent } from './components/apply-leave/add-apply-leave/add-apply-leave.component';
import { EditQuestionComponent } from './components/question/edit-question/edit-question.component';
import { EditDesignationComponent } from './components/designation/edit-designation/edit-designation.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { EditLocationComponent } from './components/location/edit-location/edit-location.component';
import { EditLeaveTypeComponent } from './components/leave-type/edit-leave-type/edit-leave-type.component';
import { EditHolidayComponent } from './components/holiday/edit-holiday/edit-holiday.component';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code.component';
import { EditApplyLeaveComponent } from './components/apply-leave/edit-apply-leave/edit-apply-leave.component';
import { ReasonListComponent } from './components/reason/reason-list/reason-list.component';
import { AddReasonComponent } from './components/reason/add-reason/add-reason.component';
import { EditReasonComponent } from './components/reason/edit-reason/edit-reason.component';
import { GeneralSettingListComponent } from './components/general-setting/general-setting-list/general-setting-list.component';
import { AddGeneralSettingComponent } from './components/general-setting/add-general-setting/add-general-setting.component';
import { EditGeneralSettingComponent } from './components/general-setting/edit-general-setting/edit-general-setting.component';
import { AddMarkAttendanceComponent } from './components/mark-attendance/add-mark-attendance/add-mark-attendance.component';
import { RolesListComponent } from './components/role/roles-list/roles-list.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import { EditRoleComponent } from './components/role/edit-role/edit-role.component';
import { ApprovalLeavelListComponent } from './components/approval-leavel/approval-leavel-list/approval-leavel-list.component';
import { EditApprovalLeaveComponent } from './components/approval-leavel/edit-approval-leave/edit-approval-leave.component';
import { AddWeeklyOffDaysComponent } from './components/weekly-off-days/add-weekly-off-days/add-weekly-off-days.component';
import { EmailNotificationListComponent } from './components/email-notification/email-notification-list/email-notification-list.component';
import { AddEmailNotificationComponent } from './components/email-notification/add-email-notification/add-email-notification.component';
import { EditEmailNotificationComponent } from './components/email-notification/edit-email-notification/edit-email-notification.component';
import { ShiftListComponent } from './components/shift/shift-list/shift-list.component';
import { AddShiftComponent } from './components/shift/add-shift/add-shift.component';
import { EditShiftComponent } from './components/shift/edit-shift/edit-shift.component';
import { EmployeeTypeListComponent } from './components/employee-type/employee-type-list/employee-type-list.component';
import { AddEmployeeTypeComponent } from './components/employee-type/add-employee-type/add-employee-type.component';
import { EditEmployeeTypeComponent } from './components/employee-type/edit-employee-type/edit-employee-type.component';
import { LoanApprovalListComponent } from './components/loan-approval-config/loan-approval-list/loan-approval-list.component';
import { AddLoanApprovalComponent } from './components/loan-approval-config/add-loan-approval/add-loan-approval.component';
import { EditLoanApprovalComponent } from './components/loan-approval-config/edit-loan-approval/edit-loan-approval.component';
import { JobTypeListComponent } from './components/job-type/job-type-list/job-type-list.component';
import { AddJobTypeComponent } from './components/job-type/add-job-type/add-job-type.component';
import { EditJobTypeComponent } from './components/job-type/edit-job-type/edit-job-type.component';
import { EventTypeListComponent } from './components/event-type/event-type-list/event-type-list.component';
import { AddEventTypeComponent } from './components/event-type/add-event-type/add-event-type.component';
import { EditEventTypeComponent } from './components/event-type/edit-event-type/edit-event-type.component';
import { CompanyCalendarListComponent } from './components/company-calender/company-calendar-list/company-calendar-list.component';
import { AddCompanyCalendarComponent } from './components/company-calender/add-company-calendar/add-company-calendar.component';
import { EditCompanyCalendarComponent } from './components/company-calender/edit-company-calendar/edit-company-calendar.component';
import { TaxDeclarationListComponent } from './components/tax-declaration/tax-declaration-list/tax-declaration-list.component';
import { AddTaxDeclarationComponent } from './components/tax-declaration/add-tax-declaration/add-tax-declaration.component';
import { EditTaxDeclarationComponent } from './components/tax-declaration/edit-tax-declaration/edit-tax-declaration.component';
import { TaxSettingListComponent } from './components/tax-setting/tax-setting-list/tax-setting-list.component';
import { AddTaxSettingComponent } from './components/tax-setting/add-tax-setting/add-tax-setting.component';
import { EditTaxSettingComponent } from './components/tax-setting/edit-tax-setting/edit-tax-setting.component';
import { SalaryComponentListComponent } from './components/salary-component/salary-component-list/salary-component-list.component';
import { AddSalaryComponentComponent } from './components/salary-component/add-salary-component/add-salary-component.component';
import { EditSalaryComponentComponent } from './components/salary-component/edit-salary-component/edit-salary-component.component';
import { MarkAttendanceListComponent } from './components/mark-attendance/mark-attendance-list/mark-attendance-list.component';
import { TaxSlabListComponent } from './components/tax-slab/tax-slab-list/tax-slab-list.component';
import { AddTaxSlabComponent } from './components/tax-slab/add-tax-slab/add-tax-slab.component';
import { AddRolesComponent } from './components/roles/add-roles/add-roles.component';
import { EditRolesComponent } from './components/roles/edit-roles/edit-roles.component';
import { RoleListComponent } from './components/roles/role-list/role-list.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { SubCategoryListComponent } from './components/subCategory/sub-category-list/sub-category-list.component';
import { AddSubCategoryComponent } from './components/subCategory/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './components/subCategory/edit-sub-category/edit-sub-category.component';
import { AddAwardComponent } from './components/award/add-award/add-award.component';
import { EditAwardComponent } from './components/award/edit-award/edit-award.component';
import { AppreciationNoteListComponent } from './components/appreciationNote/appreciation-note-list/appreciation-note-list.component';
import { AddAppreciationNoteComponent } from './components/appreciationNote/add-appreciation-note/add-appreciation-note.component';
import { EditAppreciationNoteComponent } from './components/appreciationNote/edit-appreciation-note/edit-appreciation-note.component';
import { AwardListComponent } from './components/award/award-list/award-list.component';
import { RecognitionListComponent } from './components/recognition/recognition-list/recognition-list.component';
import { AddRecognitionComponent } from './components/recognition/add-recognition/add-recognition.component';
import { EditRecognitionComponent } from './components/recognition/edit-recognition/edit-recognition.component';
import { AppreciationawardListComponent } from './components/recognition/appreciationaward-list/appreciationaward-list.component';
import { EditTaxSlabComponent } from './components/tax-slab/edit-tax-slab/edit-tax-slab.component';

const routes: Routes = [
  {
    path: 'location-list',
    component: LocationListComponent
  },
  {
    path: 'add-location',
    component: AddLocationComponent
  },
  {
    path: 'edit-location/:id',
    component: EditLocationComponent
  },
  {
    path: 'department-list',
    component: DepartmentListComponent
  },
  {
    path: 'add-department',
    component: AddDepartmentComponent
  },
  {
    path: 'edit-department/:id',
    component: EditDepartmentComponent
  },
  {
    path: 'leave-type-list',
    component: LeaveTypeListComponent
  },
  {
    path: 'add-leave-type',
    component: AddLeaveTypeComponent
  },
  {
    path: 'designation-list',
    component: DesignationListComponent
  },
  {
    path: 'edit-designation/:id',
    component: EditDesignationComponent
  },
  {
    path: 'add-designation',
    component: AddDesignationComponent
  },
  {
    path: 'edit-question/:id',
    component: EditQuestionComponent
  },
  {
    path: 'company-code-list',
    component: CompanyCodeListComponent
  },
  {
    path: 'add-company-code',
    component: AddCompanyCodeComponent
  },
  {
    path: 'add-question',
    component: AddQuestionComponent
  },
  {
    path: 'question-list',
    component: QuestionListComponent
  },
  {
    path: 'holiday-list',
    component: HolidayListComponent
  },
  {
    path: 'add-holiday',
    component: AddHolidayComponent
  },
  {
    path: 'apply-leave-list',
    component: ApplyLeaveListComponent
  },
  {
    path: 'add-apply-leave',
    component: AddApplyLeaveComponent
  },
  {
    path: 'edit-leave-type/:id',
    component: EditLeaveTypeComponent
  },
  {
    path: 'edit-holiday/:id',
    component: EditHolidayComponent
  },
  {
    path: 'edit-company-code/:id',
    component: EditCompanyCodeComponent
  },
  {
    path: 'edit-apply-leave/:id',
    component: EditApplyLeaveComponent
  },
  {
    path: 'reason-list',
    component: ReasonListComponent
  },
  {
    path: 'add-reason',
    component: AddReasonComponent
  },
  {
    path: 'edit-reason/:id',
    component: EditReasonComponent
  },
  {
    path: 'general-setting-list',
    component: GeneralSettingListComponent
  },
  {
    path: 'add-general-setting',
    component: AddGeneralSettingComponent
  },
  {
    path: 'edit-general-setting/:id',
    component: EditGeneralSettingComponent
  },
  {
    path: 'add-mark-attendance',
    component: AddMarkAttendanceComponent
  },
  {
    path: 'mark-attendance-list',
    component: MarkAttendanceListComponent
  },
  {
    path: 'roles-list',
    component: RolesListComponent
  },
  {
    path: 'add-roles',
    component: AddRoleComponent
  },
  {
    path: 'edit-roles/:id',
    component: EditRoleComponent
  },
  {
    path: 'approval-leave',
    component: ApprovalLeavelListComponent
  },
  {
    path: 'edit-approval-leave/:id',
    component: EditApprovalLeaveComponent
  },
  {
    path: 'weekly-off-days',
    component: AddWeeklyOffDaysComponent
  },
  {
    path: 'email-notification-list',
    component: EmailNotificationListComponent
  },
  {
    path: 'add-email-notification',
    component: AddEmailNotificationComponent
  },
  {
    path: 'edit-email-notification/:id',
    component: EditEmailNotificationComponent
  },
  {
    path: 'shift-list',
    component: ShiftListComponent
  },
  {
    path: 'add-shift',
    component: AddShiftComponent
  },
  {
    path: 'edit-shift/:id',
    component: EditShiftComponent
  },
  {
    path: 'employee-type-list',
    component: EmployeeTypeListComponent
  },
  {
    path: 'add-employee-type',
    component: AddEmployeeTypeComponent
  },
  {
    path: 'edit-employee-type/:id',
    component: EditEmployeeTypeComponent
  },
  {
    path: 'loan-approval-list',
    component: LoanApprovalListComponent
  },
  {
    path: 'add-loan-approval',
    component: AddLoanApprovalComponent
  },
  {
    path: 'edit-loan-approval/:id',
    component: EditLoanApprovalComponent
  },
  {
    path: 'job-type-list',
    component: JobTypeListComponent
  },
  {
    path: 'add-job-type',
    component: AddJobTypeComponent
  },
  {
    path: 'edit-job-type/:id',
    component: EditJobTypeComponent
  },
  {
    path: 'event-type-list',
    component: EventTypeListComponent
  },
  {
    path: 'add-event-type',
    component: AddEventTypeComponent
  },
  {
    path: 'edit-event-type/:id',
    component: EditEventTypeComponent
  },
  {
    path: 'company-calender-list',
    component: CompanyCalendarListComponent
  },
  {
    path: 'add-company-calender',
    component: AddCompanyCalendarComponent
  },
  {
    path: 'edit-company-calender/:id',
    component: EditCompanyCalendarComponent
  },
  {
    path: 'tax-declaration-list',
    component: TaxDeclarationListComponent
  },
  {
    path: 'add-tax-declaration',
    component: AddTaxDeclarationComponent
  },
  {
    path: 'edit-tax-declaration/:id',
    component: EditTaxDeclarationComponent
  },
  {
    path: 'tax-setting-list',
    component: TaxSettingListComponent
  },
  {
    path: 'add-tax-setting',
    component: AddTaxSettingComponent
  },
  {
    path: 'edit-tax-setting/:id',
    component: EditTaxSettingComponent
  },
  {
    path: 'salary-component-list',
    component: SalaryComponentListComponent
  },
  {
    path: 'add-salary-component',
    component: AddSalaryComponentComponent
  },
  {
    path: 'edit-salary-component/:id',
    component: EditSalaryComponentComponent
  },
  {
    path: 'tax-slab-list',
    component: TaxSlabListComponent
  },
  {
    path: 'edit-tax-slab/:id',
    component: EditTaxSlabComponent
  },
  {
    path: 'add-tax-slab',
    component: AddTaxSlabComponent
  },
  {
    path: 'add-role',
    component: AddRolesComponent
  },
  {
    path: 'edit-role/:id',
    component: EditRolesComponent
  },
  {
    path: 'role-list',
    component: RoleListComponent
  },
  {
    path: 'category-list',
    component: CategoryListComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent
  },
  {
    path: 'sub-category-list',
    component: SubCategoryListComponent,
  },
  {
    path: 'add-sub-category',
    component: AddSubCategoryComponent
  },
  {
    path: 'edit-sub-category/:id',
    component: EditSubCategoryComponent
  },
  {
    path: 'award-list',
    component: AwardListComponent,
  },
  {
    path: 'add-award',
    component: AddAwardComponent
  },
  {
    path: 'edit-award/:id',
    component: EditAwardComponent
  },
  {
    path: 'appreciation-list',
    component: AppreciationNoteListComponent,
  },
  {
    path: 'add-appreciation',
    component: AddAppreciationNoteComponent
  },
  {
    path: 'edit-appreciation/:id',
    component: EditAppreciationNoteComponent
  },
  {
    path: 'recognition-list',
    component: RecognitionListComponent
  },
  {
    path: 'add-recognition',
    component: AddRecognitionComponent
  },
  {
    path: 'edit-recognition/:id',
    component: EditRecognitionComponent
  },
  {
    path: 'appreciation-award-list',
    component: AppreciationawardListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
