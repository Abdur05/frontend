import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftRoasterComponent } from './components/shift-roaster/shift-roaster/shift-roaster.component';

const routes: Routes = [
  {
    path: 'shift-roaster-list',
    component: ShiftRoasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoasterRoutingModule { }
