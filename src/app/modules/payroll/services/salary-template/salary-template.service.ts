import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryTemplateService {

  constructor(private http: HttpClient) { }


  createsalaryTemplateDetail(data: any) {
    return this.http.post('http://localhost:4000/api/payroll/salaryTemplate/create', data).toPromise()
  }
  getAllsalaryTemplateDetail() {
    return this.http.get('http://localhost:4000/api/payroll/salaryTemplate/getAll').toPromise()
  }
  singlesalaryTemplateDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/payroll/salaryTemplate/get/${id}`).toPromise()
  }
  updatesalaryTemplateDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/payroll/salaryTemplate/update/${data._id}`, data).toPromise()
  }
  getAllsalaryTemplateDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/payroll/salaryTemplate/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updatesalaryTemplateDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/payroll/salaryTemplate/update', data).toPromise()
  }
  getAllSalaryTemplateDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/payroll/salaryTemplate/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
