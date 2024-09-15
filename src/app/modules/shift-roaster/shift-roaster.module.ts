import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShiftRoasterRoutingModule } from './shift-roaster-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ShiftRoasterComponent } from './components/shift-roaster/shift-roaster/shift-roaster.component';
import { ShiftRoasterService } from './services/shift-roaster/shift-roaster.service';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    ShiftRoasterComponent
  ],
  imports: [
    CommonModule,
    ShiftRoasterRoutingModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatTabsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule

  ],
  providers: [ShiftRoasterService]
})
export class ShiftRoasterModule { }
