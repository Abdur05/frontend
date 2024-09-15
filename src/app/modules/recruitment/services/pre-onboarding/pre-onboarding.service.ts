import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreOnboardingService {

  constructor(
    private http: HttpClient
  ) { }


  createPreOnboardingDetail(data: any, formData: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/documents/upload/${data.candidateId}`, formData, { headers }).toPromise()
  }

  getAllPreOnboardingDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/documents/upload/:candidateId', { headers }).toPromise()
  }

  singlePreOnboardingDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/get-candidate/${id}`, { headers }).toPromise()
  }
  updatePreOnboardingDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-candidate/${data.candidateId}`, data, { headers }).toPromise()
  }

  updatePreOnboardingStatusDetail(id: any, data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/${id}/background-verification`, data, { headers }).toPromise()
  }

  updatePreOnboardingSalaryDetail(id: any, data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/${id}/salary-details`, data, { headers }).toPromise()
  }


  updatePreOnboardingJoinDetail(id: any, data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/${id}/offer-letter`, data, { headers }).toPromise()
  }

  updatePreOnboardingOfferAccepct(id: any, data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/${id}/update-offer-letter-status`, data, { headers }).toPromise()
  }

  createEmployeeDetailsbyCandiate(data:any,id: any, status: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/profileCreate/${id}/${status}`, data, { headers }).toPromise()
  }
}
