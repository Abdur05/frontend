import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {

  constructor(
    private http: HttpClient
  ) { }

  createQuestionBankDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/training_question/create', data, { headers }).toPromise()
  }


  getAllQuestionBankDetails() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/training_question/All`, { headers }).toPromise()
  }

  getAllQuestionBankDetailsPage(skip:any, itemPerPage:any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/training_question/All/${skip}/${itemPerPage}`, { headers }).toPromise()
  }

  singleQuestionBankDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/training_question/getById/${id}`, { headers }).toPromise()
  }

  getAllQuestionBankByCourseIdDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/training_question/getByCourseId/${id}`, { headers }).toPromise()
  }

  updateQuestionBankDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/training_question/update/${data._id}`, data, { headers }).toPromise()
  }

}
