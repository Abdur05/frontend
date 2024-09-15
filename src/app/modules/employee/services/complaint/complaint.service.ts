import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(
    private http: HttpClient
  ) { }


  createComplaintDetail(data: any) {
    return this.http.post('http://localhost:4000/api/master/complaint/create', data).toPromise()
  }

  getAllComplaintDetail() {
    return this.http.get('http://localhost:4000/api/master/complaint/getAll').toPromise()
  }

  singleComplaintDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/master/complaint/get/${id}`).toPromise()
  }
  updatComplaintDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/master/complaint/update/${data._id}`, data).toPromise()
  }
  getManyComplaintDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/complaint/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  getManyComplaintDetailPageId(skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/master/complaint/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }
  updatedManyComplaintDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/complaint/update`, data).toPromise()
  }
  getAllComplaintDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId: any = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/master/complaint/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()

  }

}
