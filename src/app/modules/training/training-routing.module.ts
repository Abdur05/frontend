import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses/courses-list/courses-list.component';
import { AddCoursesComponent } from './components/courses/add-courses/add-courses.component';
import { EditCoursesComponent } from './components/courses/edit-courses/edit-courses.component';
import { ModuleListComponent } from './components/module/module-list/module-list.component';
import { AddModuleComponent } from './components/module/add-module/add-module.component';
import { EditModuleComponent } from './components/module/edit-module/edit-module.component';
import { SlideListComponent } from './components/slide/slide-list/slide-list.component';
import { AddSlideComponent } from './components/slide/add-slide/add-slide.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { EditSlideComponent } from './components/slide/edit-slide/edit-slide.component';
import { QuestionBankListComponent } from './components/questionBank/question-bank-list/question-bank-list.component';
import { AddQuestionBankComponent } from './components/questionBank/add-question-bank/add-question-bank.component';
import { EditQuestionBankComponent } from './components/questionBank/edit-question-bank/edit-question-bank.component';
import { AssementCoursesLevelListComponent } from './components/assement-courses-level/assement-courses-level-list/assement-courses-level-list.component';
import { AddAssementCoursesLevelComponent } from './components/assement-courses-level/add-assement-courses-level/add-assement-courses-level.component';
import { EditAssementCoursesLevelComponent } from './components/assement-courses-level/edit-assement-courses-level/edit-assement-courses-level.component';
import { PublishCourseListComponent } from './components/publish-course/publish-course-list/publish-course-list.component';
import { EnrollCourseListComponent } from './components/enroll-course-list/enroll-course-list.component';
import { ViewCourseContentComponent } from './components/view-course-content/view-course-content.component';
import { PreviewCourseContentComponent } from './components/preview-course-content/preview-course-content.component';
import { AssessmentContentLaunchComponent } from './components/assessement/assessment-content-launch/assessment-content-launch.component';
import { AssessmentQuestionsComponent } from './components/assessement/assessment-questions/assessment-questions.component';

const routes: Routes = [
  {
    path: 'courses-list',
    component: CoursesListComponent
  },
  {
    path: 'add-courses',
    component: AddCoursesComponent
  },
  {
    path: 'edit-courses/:id',
    component: EditCoursesComponent
  },
  {
    path: 'module-list',
    component: ModuleListComponent
  },
  {
    path: 'add-module',
    component: AddModuleComponent
  },
  {
    path: 'edit-module/:courseId/:id',
    component: EditModuleComponent
  },
  {
    path: 'slide-list',
    component: SlideListComponent
  },
  {
    path: 'add-slide/:id',
    component: AddSlideComponent
  },
  {
    path: 'edit-slide',
    component: EditSlideComponent
  },
  {
    path: 'category-list',
    component: CategoryListComponent
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
    path: 'question-list',
    component: QuestionBankListComponent
  },
  {
    path: 'add-question',
    component: AddQuestionBankComponent
  },
  {
    path: 'edit-question/:id',
    component: EditQuestionBankComponent
  },
  {
    path: 'assement-list',
    component: AssementCoursesLevelListComponent
  },
  {
    path: 'add-assement',
    component: AddAssementCoursesLevelComponent
  },
  {
    path: 'edit-assement/:id',
    component: EditAssementCoursesLevelComponent
  },
  {
    path: 'publish-list',
    component: PublishCourseListComponent
  },
  {
    path: 'enroll-list',
    component: EnrollCourseListComponent
  },
  {
    path: 'view-course/:id',
    component: ViewCourseContentComponent
  },
  {
    path: 'preview-course/:id',
    component: PreviewCourseContentComponent
  },
  {
    path: 'assessment-content/:id',
    component: AssessmentContentLaunchComponent
  },
  {
    path: 'assessment-question/:courseId/:assessmentId',
    component: AssessmentQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
