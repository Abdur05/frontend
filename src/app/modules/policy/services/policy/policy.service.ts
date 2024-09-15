import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(
    private http: HttpClient
  ) { }


  createpolicyDetail(data: any) {
    return this.http.post('http://localhost:4000/api/master/policy/create', data).toPromise()
  }

  getAllpolicyDetail() {
    return this.http.get('http://localhost:4000/api/master/policy/getAll').toPromise()
  }

  singlepolicyDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/master/policy/get/${id}`).toPromise()
  }
  updatpolicyDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/master/policy/update/${data._id}`, data).toPromise()
  }
  getManypolicyDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/policy/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManypolicyDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/policy/update`, data).toPromise()
  }

  policyLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }
  getAllpolicyDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/master/policy/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()
  }
  deleteHardDeletePolicyDetail(id: any) {
    return this.http.delete(`http://localhost:4000/api/master/policy/delete/${id}`).toPromise()
  }
}
