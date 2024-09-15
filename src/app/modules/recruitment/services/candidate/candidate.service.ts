import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(
    private http: HttpClient
  ) { }


  createcandidateDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/create-candidate', data, { headers }).toPromise()
  }

  getAllcandidateDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/all-candidate', { headers }).toPromise()
  }


  getAllcandidateDetailPage(filter:any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/recruitment/candidatePage/getAll/${skip}/${itemsPerPage}`,{filter:filter}, { headers }).toPromise()
  }

  getAllcandidateSelectedDetails(filter?:any,skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/recruitment/candidateSelected/getAll/${skip}/${itemsPerPage}`,{filter:filter}, { headers }).toPromise()
  }

  singlecandidateDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/get-candidate/${id}`, { headers }).toPromise()
  }
  updatcandidateDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-candidate/${data._id}`, data, { headers }).toPromise()
  }
  getManycandidateDetailPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/recruitment/candidate/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManycandidateDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/recruitment/candidate/update`, data).toPromise()
  }

  candidateLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }
  getAllcandidateDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/recruitment/candidate/getAll/${skip}/${itemsPerPage}`, { filter: filter, headers }).toPromise()
  }
  deletecandidateDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/delete-candidate/${data._id}`, data, { headers }).toPromise()
  }

  getAllInterviewerListDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/interview/interviewers-list', { headers }).toPromise()
  }

  scheduleInterviewFirstRound(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/interviews', data, { headers }).toPromise()
  }
  updatenterviewAfterScheduled(data: any, interviewId: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/update-interview-status/${interviewId}/${data.status}`, data, { headers }).toPromise()
  }

}
