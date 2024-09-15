import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaxDecEmployeeService {

  constructor(
    private http: HttpClient
  ) { }

  createTaxDeclarationEmployee(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/tax/declaration-create', data, { headers }).toPromise()
  }

  getAllTaxDeclarationEmployeeDetail(fiscal_year: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    // const body = { fiscal_year: fiscalYear }; 
    return this.http.post('http://localhost:4000/api/v1/tax/declaration-all', { fiscal_year }, { headers }).toPromise()
  }

  singletaxdeclarationEmployeeDetail(id: any, ) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/tax/declaration-get`, { fiscal_year: id }, { headers }).toPromise()
  }
  singletaxdeclarationEmployeeDetailForMyTeam(id: any, teamEmpId: any) {
    console.log("teamEmpId-----",teamEmpId);
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/v1/tax/declaration-get`, { fiscal_year: id, empId: teamEmpId }, { headers }).toPromise()
  }
  updatetaxdeclarationEmployeeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/tax/declaration-update`, data, { headers }).toPromise()
  }

  deletetaxDeclarationEmployeeDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/settings/taxdeclaration/delete-component/${data.component_code}`, {
      "isActive": true
    }, { headers }).toPromise()
  }

  updateReviewTaxDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/tax/update-reviewed-status`, data, { headers }).toPromise()
  }

}
