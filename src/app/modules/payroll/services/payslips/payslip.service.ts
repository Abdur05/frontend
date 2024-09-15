import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {


  constructor(private http: HttpClient) { }

  generatePaySlip(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/payroll/generatepayslips/${data.employeeType}`, { headers }).toPromise()
  }

  getAllPayslipDetail(skip: any, itemsPerPage: any, monthYear: any, excelExport: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/payroll/viewpayslips/${skip}/${itemsPerPage}/${monthYear}/${excelExport}`, { headers }).toPromise()
  }

  exportAttendance(skip: any, itemsPerPage: any, monthYear: any, excelExport: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ downloadUrl: string }>(`http://localhost:4000/api/v1/payroll/viewpayslips/${skip}/${itemsPerPage}/${monthYear}/${excelExport}`, { headers }).toPromise()
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
}
