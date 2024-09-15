import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCalenderService {

  constructor(
    private http: HttpClient
  ) { }

  createCompanyCalenderDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/companyCalender/addEvent', data, { headers }).toPromise()
  }

  getAllCompanyCalenderDetail(year: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/companyCalender/getAllEvents/${year}`, { headers }).toPromise()
  }

  singleCompanyCalenderDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/companyCalender/singleEventDetail/${id[0]}/${id[1]}`, { headers }).toPromise()
  }
  updateCompanyCalenderDetail(data: any, eventId: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/companyCalender/updateEventDetails/${eventId}`, data, { headers }).toPromise()
  }
  deleteCompanyCalenderDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/companyCalender/deleteEventDetails/${data._id}`, data, { headers }).toPromise()
  }
}
