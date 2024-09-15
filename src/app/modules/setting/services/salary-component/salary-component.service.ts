import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryComponentService {

  constructor(
    private http: HttpClient
  ) { }

  createSalaryComponent(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/settings/salary/create-component', data, { headers }).toPromise()
  }

  getAllSalaryComponent() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/settings/salary/all-components', { headers }).toPromise()
  }

  singleSalaryComponent(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/settings/salary/get-component/${id}`, { headers }).toPromise()
  }
  updateSalaryComponent(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/salary/update-component/${data._id}`, data, { headers }).toPromise()
  }
  deleteSalaryComponent(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/salary/delete-component/${data._id}`, data, { headers }).toPromise()
  }


}
