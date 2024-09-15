import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {


  constructor(
    private http: HttpClient
  ) { }

  createreason(data: any) {
    return this.http.post('http://localhost:4000/api/setting/reason/create', data).toPromise()
  }

  getAllreasonDetails() {
    return this.http.get('http://localhost:4000/api/setting/reason/getAll').toPromise()
  }

  singlereasonDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/reason/get/${id}`).toPromise()
  }
  updatereason(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/reason/update/${data._id}`, data).toPromise()
  }

  getAllreasonDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/reason/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatereasonDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/reason/update`, data).toPromise()
  }
  getAllReasonDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/reason/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
