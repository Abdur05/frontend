import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  dataTransfer:any = new BehaviorSubject({})
  constructor(
    private http: HttpClient
  ) { }


  createJobDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/create-job', data, { headers }).toPromise()
  }

  getAllJobDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/all-job', { headers }).toPromise()
  }

  singleJobDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/get-job/${id}`, { headers }).toPromise()
  }
  updatJobDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-job/${data._id}`, data, { headers }).toPromise()
  }
  getManyJobDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/recruitment/job/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManyJobDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/recruitment/job/update`, data).toPromise()
  }
  getAllJobDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/recruitment/job/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()
  }

  getAllJobDetailsPageFilter1(filter?: any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/job/getAll/${skip}/${itemsPerPage}`, { filter: filter },{headers}).toPromise()
  }



}
