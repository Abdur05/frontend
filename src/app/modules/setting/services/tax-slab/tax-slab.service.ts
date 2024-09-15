import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxSlabService {

  constructor(
    private http: HttpClient
  ) {

    // Set headers with Authorization token


  }

  createTaxSlabDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/settings/create-tax-slab', data, { headers }).toPromise()
  }

  getAllTaxSlabDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/settings/all-tax-slab', { headers }).toPromise()
  }

  singleTaxSlabDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/settings/get-tax-slab/${id}`, { headers }).toPromise()
  }

  updateTaxSlabDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/updated/tax-slab/${data._id}`, data, { headers }).toPromise()
  }
}
