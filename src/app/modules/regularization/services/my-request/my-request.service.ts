import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyRequestService {

  constructor(
    private http: HttpClient
  ) { }


  createmyRequest(data: any) {
    return this.http.post('http://localhost:4000/api/regularization/myRequest/create', data).toPromise()
  }

  getAllmyRequestDetails() {
    return this.http.get('http://localhost:4000/api/regularization/myRequest/getAll').toPromise()
  }

  singlemyRequestDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/regularization/myRequest/get/${id}`).toPromise()
  }
  updatemyRequest(data: any) {
    return this.http.put(`http://localhost:4000/api/regularization/myRequest/update/${data._id}`, data).toPromise()
  }

  getAllmyRequestDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/regularization/myRequest/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  getAllmyRequestDetailsPageUserId(filter:any, skip?: any, itemsPerPage?: any, type?:any) {
    const userId = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/regularization/myRequest/getAll/${skip}/${itemsPerPage}/${userId}/${type}`).toPromise()
  }

  getAllmyRequestDetailsPageUserIdApproval(skip?: any, itemsPerPage?: any) {
    const userId = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/regularization/myRequest/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }

  updatemyRequestDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/regularization/myRequest/update`, data).toPromise()
  }
  getAllMyRequestDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/regularization/myRequest/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()

  }
}
