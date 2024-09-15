import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { AddCoursesComponent } from './components/courses/add-courses/add-courses.component';
import { EditCoursesComponent } from './components/courses/edit-courses/edit-courses.component';
import { ModuleListComponent } from './components/module/module-list/module-list.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component';
import { EditModuleComponent } from './components/module/edit-module/edit-module.component';
import { SlideListComponent } from './components/slide/slide-list/slide-list.component';
import { AddSlideComponent } from './components/slide/add-slide/add-slide.component';
import { EditSlideComponent } from './components/slide/edit-slide/edit-slide.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { CategoryService } from './services/category/category.service';
import { CourseService } from './services/course/course.service';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PreviewSlideComponent } from './components/slide/preview-slide/preview-slide.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { QuestionBankListComponent } from './components/questionBank/question-bank-list/question-bank-list.component';
import { AddQuestionBankComponent } from './components/questionBank/add-question-bank/add-question-bank.component';
import { EditQuestionBankComponent } from './components/questionBank/edit-question-bank/edit-question-bank.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AssementCoursesLevelListComponent } from './components/assement-courses-level/assement-courses-level-list/assement-courses-level-list.component';
import { AddAssementCoursesLevelComponent } from './components/assement-courses-level/add-assement-courses-level/add-assement-courses-level.component';
import { EditAssementCoursesLevelComponent } from './components/assement-courses-level/edit-assement-courses-level/edit-assement-courses-level.component';
import { ViewAssementCoursesLevelComponent } from './components/assement-courses-level/view-assement-courses-level/view-assement-courses-level.component';
import { PublishCourseListComponent } from './components/publish-course/publish-course-list/publish-course-list.component';
import { EnrollCourseListComponent } from './components/enroll-course-list/enroll-course-list.component';
import { InprogressCourseListComponent } from './components/inprogress-course-list/inprogress-course-list.component';
import { CompletedCourseListComponent } from './components/completed-course-list/completed-course-list.component';
import { MatCardModule } from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { ViewCourseContentComponent } from './components/view-course-content/view-course-content.component';
import { StarRatingModule } from 'angular-star-rating';
import { PreviewCourseContentComponent } from './components/preview-course-content/preview-course-content.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AssessmentContentLaunchComponent } from './components/assessement/assessment-content-launch/assessment-content-launch.component';
import { PreviewAssessmentContentDetailsComponent } from './components/assessement/preview-assessment-content-details/preview-assessment-content-details.component';
import { PreviewAssessmentAlertMessageComponent } from './components/assessement/preview-assessment-alert-message/preview-assessment-alert-message.component';
import { AssessmentQuestionsComponent } from './components/assessement/assessment-questions/assessment-questions.component';
import { AssessmentQuestionsResultComponent } from './components/assessement/assessment-questions-result/assessment-questions-result.component';
import { ViewAssessmentAttemptListComponent } from './components/assessement/view-assessment-attempt-list/view-assessment-attempt-list.component';

@NgModule({
  declarations: [
    CoursesListComponent,
    AddCoursesComponent,
    EditCoursesComponent,
    ModuleListComponent,
    AddModuleComponent,
    EditModuleComponent,
    SlideListComponent,
    AddSlideComponent,
    EditSlideComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    PreviewSlideComponent,
    QuestionBankListComponent,
    AddQuestionBankComponent,
    EditQuestionBankComponent,
    AssementCoursesLevelListComponent,
    AddAssementCoursesLevelComponent,
    EditAssementCoursesLevelComponent,
    ViewAssementCoursesLevelComponent,
    PublishCourseListComponent,
    EnrollCourseListComponent,
    InprogressCourseListComponent,
    CompletedCourseListComponent,
    ViewCourseContentComponent,
    PreviewCourseContentComponent,
    AssessmentContentLaunchComponent,
    PreviewAssessmentContentDetailsComponent,
    PreviewAssessmentAlertMessageComponent,
    AssessmentQuestionsComponent,
    AssessmentQuestionsResultComponent,
    ViewAssessmentAttemptListComponent,
  ],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatDialogModule,
    NgbModule,
    TypeaheadModule.forRoot(),
    FormsModule,
    ScheduleModule,
    MatExpansionModule,
    MatFormFieldModule,
    NgxExtendedPdfViewerModule,
    DragDropModule,
    PaginationModule.forRoot(),
    MatCardModule,
    MatChipsModule,
    StarRatingModule.forRoot(),
    MatProgressBarModule
  ],
  providers: [CategoryService, CourseService]
})
export class TrainingModule { }
