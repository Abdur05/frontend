import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxDeclarationService {

  constructor(
    private http: HttpClient
  ) { }

  createTaxDeclarationDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/settings/taxdeclaration/create-component', data, { headers }).toPromise()
  }

  getAllTaxDeclarationDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/settings/taxdeclaration/all-components', { headers }).toPromise()
  }

  singletaxdeclarationDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/settings/taxdeclaration/get-component/${id}`, { headers }).toPromise()
  }
  updatetaxdeclarationDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/taxdeclaration/update-component/${data._id}`, data, { headers }).toPromise()
  }

  deleteEventTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/taxdeclaration/delete-component/${data._id}`, data, { headers }).toPromise()
  }


}
