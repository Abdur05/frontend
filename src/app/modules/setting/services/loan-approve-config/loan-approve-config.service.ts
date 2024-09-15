import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoanApproveConfigService {

  constructor(
    private http: HttpClient
  ) {

    // Set headers with Authorization token


  }

  createloanApprovalstageDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/setting/loanApprovalstage/create', data, { headers }).toPromise()
  }

  getAllloanApprovalstageDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/setting/loanApprovalstage/getAll', { headers }).toPromise()
  }

  singleloanApprovalstageDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/setting/loanApprovalstage/get/${id}`, { headers }).toPromise()
  }
  updateloanApprovalstageDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/setting/loanApprovalstage/update/${data._id}`, data, { headers }).toPromise()
  }

  getAllLoanApprovalStageDetailsPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/setting/loanApprovalstage/getAll/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }
  deleteloanApprovalstageDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/setting/loanApprovalstage/delete/${id}`, { headers }).toPromise()
  }

}
