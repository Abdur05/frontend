import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {

  constructor(private http: HttpClient) { }

  createLoanRequestDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/loan-requests', data, { headers }).toPromise()
  }
  getAllLoanRequestDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/all-loan-requests', { headers }).toPromise()
  }

  getAllLoanRequestDetailFilter(filter:any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/all-loan-requests/getAll/${skip}/${itemsPerPage}`, { Filter: filter },{ headers }).toPromise()
  }

  singleLoanRequestDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/details-loan-requests/${id}`, { headers }).toPromise()
  }
  updateLoanRequestDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-loan-requests/${data._id}`, data, { headers }).toPromise()
  }

  updateLoanApprovalRequestDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-approval-loan-request/${data._id}`, data, { headers }).toPromise()
  }
}
