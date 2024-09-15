import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetAllocationService {

  constructor(
    private http: HttpClient
  ) { }


  createassetMaintenance(data: any) {
    return this.http.post('http://localhost:4000/api/master/assetMaintenance/create', data).toPromise()
  }

  getAllassetMaintenanceDetails() {
    return this.http.get('http://localhost:4000/api/master/assetMaintenance/getAll').toPromise()
  }

  singleassetMaintenanceDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/assetMaintenance/get/${id}`).toPromise()
  }
  updateassetMaintenance(data: any) {
    return this.http.put(`http://localhost:4000/api/master/assetMaintenance/update/${data._id}`, data).toPromise()
  }

  getAllassetMaintenanceDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/assetMaintenance/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateassetMaintenanceDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/assetMaintenance/update`, data).toPromise()
  }

  getAllAssetTypeDetail() {
    return this.http.get('http://localhost:4000/api/master/assetMaintenance/assetType/getAll').toPromise()

  }
  getAllAssetTypeList(type: any) {
    return this.http.get(`http://localhost:4000/api/master/assetMaintenance/getAll/${type}`).toPromise()
  }

  getAllAssetMaintainanceDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/master/assetMaintenance/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
