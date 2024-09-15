import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetAllocationListComponent } from './components/asset-allocation/asset-allocation-list/asset-allocation-list.component';
import { AddAssetAllocationComponent } from './components/asset-allocation/add-asset-allocation/add-asset-allocation.component';
import { EditAssetAllocationComponent } from './components/asset-allocation/edit-asset-allocation/edit-asset-allocation.component';
import { AssetListComponent } from './components/asset/asset-list/asset-list.component';
import { AddAssetComponent } from './components/asset/add-asset/add-asset.component';
import { EditAssetComponent } from './components/asset/edit-asset/edit-asset.component';

const routes: Routes = [
  {
    path: 'asset-location-list',
    component: AssetAllocationListComponent
  },
  {
    path: 'add-asset-allocation',
    component: AddAssetAllocationComponent
  },
  {
    path: 'edit-asset-allocation/:id',
    component: EditAssetAllocationComponent
  },
  {
    path: 'asset-list',
    component: AssetListComponent
  },
  {
    path: 'add-asset',
    component: AddAssetComponent
  },
  {
    path: 'edit-asset/:id',
    component: EditAssetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetRoutingModule { }
