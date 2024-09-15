import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {

  constructor(
    private http: HttpClient
  ) { }

  createEventTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/companyEventType/createCompanyEventType', data, { headers }).toPromise()
  }

  getAllEventTypeDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/companyEventType/getAllCompanyEventType', { headers }).toPromise()
  }

  singleEventTypeDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/companyEventType/singleCompanyEventTypeDetail/${id}`, { headers }).toPromise()
  }
  updateEventTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/companyEventType/updateCompanyEventType/${data._id}`, data, { headers }).toPromise()
  }
  deleteEventTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/companyEventType/deleteCompanyEventType/${data._id}`, data, { headers }).toPromise()
  }

  getAllEventTypeDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllEventTypeDetailPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
