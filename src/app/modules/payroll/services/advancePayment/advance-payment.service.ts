import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvancePaymentService {


  constructor(
    private http: HttpClient
  ) { }


  createadvancePaymentDetail(data: any) {
    return this.http.post('http://localhost:4000/api/payroll/advancePaymentReq/create', data).toPromise()
  }

  getAlladvancePaymentDetail() {
    return this.http.get('http://localhost:4000/api/payroll/advancePaymentReq/getAll').toPromise()
  }

  singleadvancePaymentDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/payroll/advancePaymentReq/get/${id}`).toPromise()
  }
  updatadvancePaymentDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/payroll/advancePaymentReq/update/${data._id}`, data).toPromise()
  }
  getManyadvancePaymentDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/payroll/advancePaymentReq/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManyadvancePaymentDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/payroll/advancePaymentReq/update`, data).toPromise()
  }
  getAlladvancePaymentDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/payroll/advancePaymentReq/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
