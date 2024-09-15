import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalService {


  constructor(private http: HttpClient) { }


  createGoalDetail(data: any) {
    return this.http.post('http://localhost:4000/api/appraisal/goal_details/create', data).toPromise()
  }
  getAllGoalDetail() {
    return this.http.get('http://localhost:4000/api/appraisal/goal_details/getAll').toPromise()
  }
  singleGoalDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/goal_details/get/${id}`).toPromise()
  }
  updateGoalDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/appraisal/goal_details/update/${data._id}`, data).toPromise()
  }
  getAllGoalDetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/goal_details/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateGoalDetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/appraisal/goal_details/update', data).toPromise()
  }
  getAllGoalDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/appraisal/goal_details/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }



}
