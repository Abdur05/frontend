import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceReportService {

  constructor(
    private http: HttpClient
  ) { }

  getAllAttandance(data:any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/reports/attendance/0/10', { params: data, headers }).toPromise()
  }
}
