import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppreciateNoteService {

  constructor(private http: HttpClient) { }



  createAppreciationDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/createAppreciateNoteTemplate', data, { headers }).toPromise()
  }

  getAllAppreciationDetail(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/getAllAppreciateNoteTemplate/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  singleAppreciationDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/singleAppreciateNoteTemplate/${id}`, { headers }).toPromise()
  }
  updateAppreciationDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/updateAppreciateDetails/${data._id}`, data, { headers }).toPromise()
  }
  deleteAppreciationDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/deleteAppreciateNoteTemplate/${data._id}`, data, { headers }).toPromise()
  }
}
