import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {

  constructor(private http: HttpClient) { }



  createAwardNominatorDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/createAwardNominator', data, { headers }).toPromise()
  }

  getAllAwardNominatorDetail(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/getAllAwardNominatorList/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  getAllAwardNominatorDetailBYRM(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/getAllAwardNominatorListByRM/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }


  singleAwardNominatorDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/singleAwardNominatorDetails/${id}`, { headers }).toPromise()
  }
  updateAwardNominatorDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/updateAwardNominator/${data._id}`, data, { headers }).toPromise()
  }
  deleteAwardNominatorDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/deleteAwardNominator/${data._id}`, data, { headers }).toPromise()
  }
  getAllEmployeeListByQuesryarams(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/getEmployeeDetailsSearchByEmpId', { params: data, headers }).toPromise()
  }
  getAllAwardNominator(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/getAllAwardNominator/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

}
