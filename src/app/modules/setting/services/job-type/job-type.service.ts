import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobTypeService {

  constructor(
    private http: HttpClient
  ) { }

  createJobTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/create-job-type', data, { headers }).toPromise()
  }

  getAllJobTypeDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/all-job-types', { headers }).toPromise()
  }

  singleJobTypeDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/get-job-type/${id}`, { headers }).toPromise()
  }
  updateJobTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-job-type/${data._id}`, data, { headers }).toPromise()
  }
  deleteJobTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/delete-job-type/${data._id}`, data, { headers }).toPromise()
  }

  getAllJobTypeDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllJobTypeDetailPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
