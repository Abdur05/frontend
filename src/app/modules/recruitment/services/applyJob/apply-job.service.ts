import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplyJobService {

  constructor(
    private http: HttpClient
  ) { }


  createApplyJobDetail(data: any) {
    return this.http.post('http://localhost:4000/api/recruitment/applyJob/create', data).toPromise()
  }

  getAllApplyJobDetail() {
    return this.http.get('http://localhost:4000/api/recruitment/applyJob/getAll').toPromise()
  }

  singleApplyJobDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/recruitment/applyJob/get/${id}`).toPromise()
  }
  updatApplyJobDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/recruitment/applyJob/update/${data._id}`, data).toPromise()
  }
  getManyApplyJobDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/recruitment/applyJob/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManyApplyJobDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/recruitment/applyJob/update`, data).toPromise()
  }
  applyjobUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }
  getAllApplyJobDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/recruitment/applyJob/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
