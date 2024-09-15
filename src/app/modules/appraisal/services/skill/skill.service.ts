import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }


  createskillDetail(data: any) {
    return this.http.post('http://localhost:4000/api/appraisal/skill/create', data).toPromise()
  }
  getAllskillDetail() {
    return this.http.get('http://localhost:4000/api/appraisal/skill/getAll').toPromise()
  }
  singleskillDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/skill/get/${id}`).toPromise()
  }
  updateskillDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/appraisal/skill/update/${data._id}`, data).toPromise()
  }
  getAllskillDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/skill/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateskillDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/appraisal/skill/update', data).toPromise()
  }

  getAllRolesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/appraisal/skill/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
