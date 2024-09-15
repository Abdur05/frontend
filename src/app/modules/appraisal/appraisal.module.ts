import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalRoutingModule } from './appraisal-routing.module';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { ViewSkillComponent } from './components/skill/view-skill/view-skill.component';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddKRAComponent } from './components/kRA/add-kra/add-kra.component';
import { EditKRAComponent } from './components/kRA/edit-kra/edit-kra.component';
import { KRAListComponent } from './components/kRA/kra-list/kra-list.component';
import { AddAppraisalCycleComponent } from './components/appraisal-cycle/add-appraisal-cycle/add-appraisal-cycle.component';
import { EditAppraisalCycleComponent } from './components/appraisal-cycle/edit-appraisal-cycle/edit-appraisal-cycle.component';
import { ViewAppraisalCycleComponent } from './components/appraisal-cycle/view-appraisal-cycle/view-appraisal-cycle.component';
import { AppraisalCycleListComponent } from './components/appraisal-cycle/appraisal-cycle-list/appraisal-cycle-list.component';
import { AddGoalComponent } from './components/goal/add-goal/add-goal.component';
import { EditGoalComponent } from './components/goal/edit-goal/edit-goal.component';
import { GoalListComponent } from './components/goal/goal-list/goal-list.component';
import { CompetencyListComponent } from './components/competency/competency-list/competency-list.component';
import { AddCompetencyComponent } from './components/competency/add-competency/add-competency.component';
import { EditCompetencyComponent } from './components/competency/edit-competency/edit-competency.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatCardModule } from '@angular/material/card';
import { AppraisalCycleService } from './services/appraisal-cycle/appraisal-cycle.service';
import { CompetencyService } from './services/competency/competency.service';
import { GoalService } from './services/goal/goal.service';
import { KraService } from './services/kra/kra.service';
import { SkillService } from './services/skill/skill.service';

@NgModule({
  declarations: [
    AddSkillComponent,
    EditSkillComponent,
    ViewSkillComponent,
    SkillListComponent,
    AddKRAComponent,
    EditKRAComponent,
    KRAListComponent,
    AddAppraisalCycleComponent,
    EditAppraisalCycleComponent,
    ViewAppraisalCycleComponent,
    AppraisalCycleListComponent,
    AddGoalComponent,
    EditGoalComponent,
    GoalListComponent,
    CompetencyListComponent,
    AddCompetencyComponent,
    EditCompetencyComponent
  ],
  imports: [
    CommonModule,
    AppraisalRoutingModule,
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
    BsDatepickerModule.forRoot(),
    MatCardModule
  ],
  providers: [AppraisalCycleService, CompetencyService, GoalService, KraService, SkillService]
})
export class AppraisalModule { }
