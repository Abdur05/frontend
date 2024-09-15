import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalQuestionService {

  constructor(
    private http: HttpClient
  ) { }


  createmedicalQuestion(data: any) {
    return this.http.post('http://localhost:4000/api/setting/medicalQuestion/create', data).toPromise()
  }

  getAllmedicalQuestionDetails() {
    return this.http.get('http://localhost:4000/api/setting/medicalQuestion/getAll').toPromise()
  }

  singlemedicalQuestionDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/medicalQuestion/get/${id}`).toPromise()
  }
  updatemedicalQuestion(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/medicalQuestion/update/${data._id}`, data).toPromise()
  }

  getAllmedicalQuestionDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/medicalQuestion/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatemedicalQuestionDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/medicalQuestion/update`, data).toPromise()
  }
  getAllMedicalQuestionDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/medicalQuestion/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
