import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignationService {

  constructor(
    private http: HttpClient
  ) { }


  creaeDesignation(data: any) {
    return this.http.post('http://localhost:4000/api/setting/designation/create', data).toPromise()
  }

  getAllDesignationDetails() {
    return this.http.get('http://localhost:4000/api/setting/designation/getAll').toPromise()
  }

  singleDesignationDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/designation/get/${id}`).toPromise()
  }
  updateDesignation(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/designation/update/${data._id}`, data).toPromise()
  }
  getAlldesignationDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/designation/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedesignationDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/designation/update`, data).toPromise()
  }
  getAllDesignationDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/designation/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
