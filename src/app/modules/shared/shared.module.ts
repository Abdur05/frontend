import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MyProfileComponent } from './components/my-profile/my-profile/my-profile.component';
import { ClearUserComponent } from './components/clear-user/clear-user/clear-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { SubSideMenuComponent } from './components/sub-side-menu/sub-side-menu.component';
import { MatCardModule } from '@angular/material/card';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    SideNavComponent,
    MyProfileComponent,
    ClearUserComponent,
    ResetPasswordComponent,
    SubSideMenuComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIdleKeepaliveModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule
  ],
  exports: [SideNavComponent, SubSideMenuComponent, LoaderComponent]
})
export class SharedModule { }
