import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTypeService {

  constructor(
    private http: HttpClient
  ) {

    // Set headers with Authorization token


  }

  createEmployeeTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/setting/employeeType/create', data, { headers }).toPromise()
  }

  getAllEmployeeTypeDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/setting/employeeType/getAll', { headers }).toPromise()
  }

  singleEmployeeTypeDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/setting/employeeType/get/${id}`, { headers }).toPromise()
  }
  updateEmployeeTypeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/setting/employeeType/updateAll/${data._id}`, data, { headers }).toPromise()
  }

  getAllEmployeeTypeDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateEmployeeTypeDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/v1/setting/employeeType/update`, data).toPromise()
  }
  getAllEmployeeTypeDetailPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/v1/setting/employeeType/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
