import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetRoutingModule } from './asset-routing.module';
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
import { AssetAllocationListComponent } from './components/asset-allocation/asset-allocation-list/asset-allocation-list.component';
import { AddAssetAllocationComponent } from './components/asset-allocation/add-asset-allocation/add-asset-allocation.component';
import { EditAssetAllocationComponent } from './components/asset-allocation/edit-asset-allocation/edit-asset-allocation.component';
import { AddAssetComponent } from './components/asset/add-asset/add-asset.component';
import { EditAssetComponent } from './components/asset/edit-asset/edit-asset.component';
import { AssetListComponent } from './components/asset/asset-list/asset-list.component';


@NgModule({
  declarations: [
    AssetAllocationListComponent,
    AddAssetAllocationComponent,
    EditAssetAllocationComponent,
    AddAssetComponent,
    EditAssetComponent,
    AssetListComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
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

  ]
})
export class AssetModule { }
