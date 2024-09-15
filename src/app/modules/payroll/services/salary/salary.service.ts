import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }


  createSalaryDetail(data: any) {
    return this.http.post('http://localhost:4000/api/payroll/salary/create', data).toPromise()
  }
  getAllSalaryDetail() {
    return this.http.get('http://localhost:4000/api/payroll/salary/getAll').toPromise()
  }
  singleSalaryDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/payroll/salary/get/${id}`).toPromise()
  }
  updateSalaryDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/payroll/salary/update/${data._id}`, data).toPromise()
  }
  getAllSalaryDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/payroll/salary/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateSalaryDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/payroll/salary/update', data).toPromise()
  }
  getAllsalaryDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/payroll/salary/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
