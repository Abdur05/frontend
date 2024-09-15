import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxSettingService {

  constructor(
    private http: HttpClient
  ) { }

  createTaxSettingDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/settings/create-tax-setting', data, { headers }).toPromise()
  }

  getAllTaxSettingDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/settings/all-tax-settings', { headers }).toPromise()
  }

  singleTaxSettingDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/settings/get-tax-setting/${id}`, { headers }).toPromise()
  }
  updateTaxSettingDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/update-tax-setting/${data._id}`, data, { headers }).toPromise()
  }

  deleteTaxSettingDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/delete-tax-setting/${data._id}`, data, { headers }).toPromise()
  }
}
