import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppraisalCycleService {


  constructor(private http: HttpClient) { }


  createAppraisalCycleDetail(data: any) {
    return this.http.post('http://localhost:4000/api/appraisal/appraisal_cycle/create', data).toPromise()
  }
  getAllAppraisalCycleDetail() {
    return this.http.get('http://localhost:4000/api/appraisal/appraisal_cycle/getAll').toPromise()
  }
  singleAppraisalCycleDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/appraisal_cycle/get/${id}`).toPromise()
  }
  updateAppraisalCycleDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/appraisal/appraisal_cycle/update/${data._id}`, data).toPromise()
  }
  getAllAppraisalCycleDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/appraisal_cycle/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateAppraisalCycleDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/appraisal/appraisal_cycle/update', data).toPromise()
  }
  GuideLinesUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }
  getAllAppraisalCycleDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/appraisal/appraisal_cycle/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }



}
