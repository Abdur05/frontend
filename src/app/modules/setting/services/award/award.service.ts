import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AwardService {

  constructor(private http: HttpClient) { }



  createAwardMasterDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/createawardsMaster', data, { headers }).toPromise()
  }

  getAllAwardMasterDetail(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/getAllAwardsMaster/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  singleAwardMasterDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/singleAwardsMaster/${id}`, { headers }).toPromise()
  }
  updateAwardMasterDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/updateAwardsMasterDetails/${data._id}`, data, { headers }).toPromise()
  }
  deleteAwardMasterDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/deleteAwardsMaster/${data._id}`, data, { headers }).toPromise()
  }
}
