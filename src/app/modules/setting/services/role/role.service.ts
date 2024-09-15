import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http: HttpClient
  ) { }


  createroles(data: any) {
    return this.http.post('http://localhost:4000/api/setting/roles/create', data).toPromise()
  }

  getAllrolesDetails() {
    return this.http.get('http://localhost:4000/api/setting/roles/getAll').toPromise()
  }

  singlerolesDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/roles/get/${id}`).toPromise()
  }
  updateroles(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/roles/update/${data._id}`, data).toPromise()
  }
  getAllrolesDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/roles/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updaterolesDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/roles/update`, data).toPromise()
  }

  getAllRolesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/roles/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }


  getAllRolesAccessDetails(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/rolesAccess/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  createScreenAccess(data: any) {
    return this.http.post('http://localhost:4000/api/setting/rolesAccess/create', data).toPromise()
  }

  singleRolesDetails(id: any) {
  
    return this.http.get(`http://localhost:4000/api/setting/rolesAccess/get/${id}`).toPromise()
  }

  
  updateRolesDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/rolesAccess/update/${data._id}`, data).toPromise()
  }
}
