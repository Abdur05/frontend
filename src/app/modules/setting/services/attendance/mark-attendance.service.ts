import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarkAttendanceService {

  constructor(
    private http: HttpClient
  ) { }
  createattendance(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/employee-attendence/checkin', data, { headers }).toPromise()
  }

  getAllattendanceDetails(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/employee-attendence/attendance', { params: data, headers }).toPromise()
  }

  exportAttendance(data: any): Promise<void> {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ downloadUrl: string }>('http://localhost:4000/api/v1/employee-attendence/attendance', { params: data, headers }).toPromise()
      .then(response => {
        if(response){ 
          const downloadUrl = response.downloadUrl;
          if (downloadUrl) {
            // Create a link element
            const link = document.createElement('a');
            link.href = `http://localhost:4000${downloadUrl}`;
            link.download = downloadUrl.split('/').pop() || 'downloaded-file.xlsx';
            document.body.appendChild(link);
            link.click();

            // Clean up and remove the link
            document.body.removeChild(link);
          }
        }
      })
      .catch(error => {
        console.error('Error fetching the download link:', error);
      });
  }

  getAllattendanceDetailsByMonthYear(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/employee-attendence/attendanceByMonthYear', { params: data, headers }).toPromise()
  }

  singleattendanceDetails(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/setting/attendance/get/${id}`, { headers }).toPromise()
  }
  updateattendance(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/employee-attendence/checkout`, data, { headers }).toPromise()
  }

  getAllattendanceDetailsPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/setting/attendance/getAll/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  updateattendanceDetailMany(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/setting/attendance/update`, data, { headers }).toPromise()
  }

  getAttendenceDetailsByEmpId(id: any, date: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/employee-attendence/currentweek-attendance`, { headers }).toPromise()
  }
}
