import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxSubmissionEmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  createTaxDeclarationEmployee(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/tax/submission-create', data, { headers }).toPromise()
  }

  getAllTaxDeclarationEmployeeDetail(fiscal_year:any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post('http://localhost:4000/api/v1/tax/submission-get-all',{fiscal_year}, { headers }).toPromise()
  }

  singletaxdeclarationEmployeeDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/tax/submission-get-single/${id}`, { headers }).toPromise()
  }
  updatetaxdeclarationEmployeeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/tax/declaration-update/${data._id}`, data, { headers }).toPromise()
  }

  deletetaxDeclarationEmployeeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/taxdeclaration/delete-component/${data._id}`, data, { headers }).toPromise()
  }
  policyLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }
}
