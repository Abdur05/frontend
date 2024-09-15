import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(
    private http: HttpClient
  ) { }


  createassetAllocation(data: any) {
    return this.http.post('http://localhost:4000/api/master/assetAllocate/create', data).toPromise()
  }

  getAllassetAllocationDetails() {
    return this.http.get('http://localhost:4000/api/master/assetAllocate/getAll').toPromise()
  }

  singleassetAllocationDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/assetAllocate/get/${id}`).toPromise()
  }
  updateassetAllocation(data: any) {
    return this.http.put(`http://localhost:4000/api/master/assetAllocate/update/${data._id}`, data).toPromise()
  }

  getAllassetAllocationDetailsPage(skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')

    return this.http.get(`http://localhost:4000/api/master/assetAllocate/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }

  updateassetAllocationDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/assetAllocate/update`, data).toPromise()
  }

  getAllAssetAllocationDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/master/assetAllocate/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()

  }

  updateassetReleaseDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/master/assetRelease/update/${data._id}`, data).toPromise()
  }

}
