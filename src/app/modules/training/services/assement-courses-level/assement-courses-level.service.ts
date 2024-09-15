import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssementCoursesLevelService {

  constructor(
    private http: HttpClient
  ) { }

  createAssesmentDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/course_question_paper/create', data, { headers }).toPromise()
  }


  getAllAssesmentDetails() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/course_question_paper/getAll`, { headers }).toPromise()
  }


  getAllAssesmentAttemptDetails() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/assessmentAttemp/getAll`, { headers }).toPromise()
  }

  getAllAssesmentDetailsPage(skip: any, itemPerPage: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/course_question_paper/All/${skip}/${itemPerPage}`, { headers }).toPromise()
  }

  singleAssesmentDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/course_question_paper/getById/${id}`, { headers }).toPromise()
  }

  updateAssesmentDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/course_question_paper/update/${data._id}`, data, { headers }).toPromise()
  }


  getAllAssesmentDetailsPageFilter(filter: any, skip: any, itemPerPage: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/course_question_paper/getAll/${skip}/${itemPerPage}`, { filter }, { headers }).toPromise()
  }


  createAssesmentAttempt(data:any){
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/assessment/createAttempt`, data, { headers }).toPromise() 
  }

  saveAnswerDetails(data:any){
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/assessment/saveQuestionResponse`, data, { headers }).toPromise()  
  }
}
