import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSkillComponent } from './components/skill/add-skill/add-skill.component';
import { SkillListComponent } from './components/skill/skill-list/skill-list.component';
import { EditSkillComponent } from './components/skill/edit-skill/edit-skill.component';
import { AddKRAComponent } from './components/kRA/add-kra/add-kra.component';
import { KRAListComponent } from './components/kRA/kra-list/kra-list.component';
import { EditKRAComponent } from './components/kRA/edit-kra/edit-kra.component';
import { AppraisalCycleListComponent } from './components/appraisal-cycle/appraisal-cycle-list/appraisal-cycle-list.component';
import { AddAppraisalCycleComponent } from './components/appraisal-cycle/add-appraisal-cycle/add-appraisal-cycle.component';
import { EditAppraisalCycleComponent } from './components/appraisal-cycle/edit-appraisal-cycle/edit-appraisal-cycle.component';
import { GoalListComponent } from './components/goal/goal-list/goal-list.component';
import { AddGoalComponent } from './components/goal/add-goal/add-goal.component';
import { EditGoalComponent } from './components/goal/edit-goal/edit-goal.component';
import { CompetencyListComponent } from './components/competency/competency-list/competency-list.component';
import { AddCompetencyComponent } from './components/competency/add-competency/add-competency.component';
import { EditCompetencyComponent } from './components/competency/edit-competency/edit-competency.component';

const routes: Routes = [{
  path: 'skill-list',
  component: SkillListComponent
}, {
  path: 'add-skill',
  component: AddSkillComponent
}, {
  path: 'edit-skill/:id',
  component: EditSkillComponent
}, {
  path: 'kra-list',
  component: KRAListComponent
}, {
  path: 'add-kra',
  component: AddKRAComponent
}, {
  path: 'edit-kra/:id',
  component: EditKRAComponent
}, {
  path: 'appraisal-cycle-list',
  component: AppraisalCycleListComponent
}, {
  path: 'add-appraisal-cycle',
  component: AddAppraisalCycleComponent
}, {
  path: 'edit-appraisal-cycle/:id',
  component: EditAppraisalCycleComponent
}, {
  path: 'goal-list',
  component: GoalListComponent
}, {
  path: 'add-goal',
  component: AddGoalComponent
}, {
  path: 'edit-goal/:id',
  component: EditGoalComponent
}, {
  path: 'competency-list',
  component: CompetencyListComponent
}, {
  path: 'add-competency',
  component: AddCompetencyComponent
}, {
  path: 'edit-competency/:id',
  component: EditCompetencyComponent
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalRoutingModule { }
