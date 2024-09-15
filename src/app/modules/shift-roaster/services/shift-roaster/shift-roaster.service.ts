import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftRoasterService {

  headers_object: any = ''
  token: any = ''
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')

  }



  getAllNewShiftRoasterDetails(monthYear: any) {
    const token = localStorage.getItem('token');

    // Set headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post('http://localhost:4000/api/roastershift/getRoasterShiftDetails/getAll/', { monthYear }, { headers }).toPromise()
  }

  updateShiftRoasterDetail(data: any) {
    const token = localStorage.getItem('token');

    // Set headers with Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/roastershift/updateRoasterShiftInfo/update`, data, { headers }).toPromise()
  }

}
