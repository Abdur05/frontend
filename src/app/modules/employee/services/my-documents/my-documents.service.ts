import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDocumentsService {

  headers_object: any = ''
  token: any = ''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }



  getAllPayslips(year: any) {
    const token = localStorage.getItem('token');

    // Set headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`http://localhost:4000/api/v1/myDocuments/payslips/${year}`, { headers }).toPromise()
  }

}
