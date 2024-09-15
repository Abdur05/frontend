import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }


  createtaxesDetail(data: any) {
    return this.http.post('http://localhost:4000/api/payroll/taxes/create', data).toPromise()
  }
  getAlltaxesDetail() {
    return this.http.get('http://localhost:4000/api/payroll/taxes/getAll').toPromise()
  }
  singletaxesDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/payroll/taxes/get/${id}`).toPromise()
  }
  updatetaxesDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/payroll/taxes/update/${data._id}`, data).toPromise()
  }
  getAlltaxesDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/payroll/taxes/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updatetaxesDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/payroll/taxes/update', data).toPromise()
  }

  getAllTaxesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/payroll/taxes/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
