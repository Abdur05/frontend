import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor(private http: HttpClient) { }


  createCompetencyDetail(data: any) {
    return this.http.post('http://localhost:4000/api/appraisal/competency_details/create', data).toPromise()
  }
  getAllCompetencyDetail() {
    return this.http.get('http://localhost:4000/api/appraisal/competency_details/getAll').toPromise()
  }
  singleCompetencyDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/competency_details/get/${id}`).toPromise()
  }
  updateCompetencyDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/appraisal/competency_details/update/${data._id}`, data).toPromise()
  }
  getAllCompetencyDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/competency_details/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateCompetencyDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/appraisal/competency_details/update', data).toPromise()
  }
  getAllRolesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/appraisal/competency_details/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }


}
