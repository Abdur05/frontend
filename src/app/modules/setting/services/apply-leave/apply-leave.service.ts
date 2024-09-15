import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplyLeaveService {

  constructor(
    private http: HttpClient
  ) { }


  createApplyLeaveDetail(data: any) {
    return this.http.post('http://localhost:4000/api/applyLeave/applyLeave/create', data).toPromise()
  }

  getAllApplyLeaveDetail() {
    return this.http.get('http://localhost:4000/api/applyLeave/applyLeave/getAll').toPromise()
  }

  singleApplyLeaveDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/applyLeave/applyLeave/get/${id}`).toPromise()
  }
  updatApplyLeaveDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/applyLeave/applyLeave/update/${data._id}`, data).toPromise()
  }
  getManyApplyLeaveDetailPage(skip?: any, itemsPerPage?: any) {
    const userId = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/applyLeave/applyLeave/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }

  getLeaveSummaryDetails(year: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const userId = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/applyLeave/employeeLeaveSummery/${year}`,{headers}).toPromise()
  }

  updatedManyApplyLeaveDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/employee/myProfile/update`, data).toPromise()
  }
  getAllApplyLeaveDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/applyLeave/applyLeave/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()
  }


  // Aprovel List

  getAllApprovalList(skip?: any, itemsPerPage?: any) {
    const userId = localStorage.getItem('userName')
    return this.http.get(`http://localhost:4000/api/applyLeave/approvalList/getAll/${skip}/${itemsPerPage}/${userId}`).toPromise()
  }

  getAllApprovalListDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const userId = localStorage.getItem('userName')
    return this.http.post(`http://localhost:4000/api/applyLeave/approvalList/getAll/${skip}/${itemsPerPage}/${userId}`, { filter: filter }).toPromise()
  }

  deleteHardDeleteApplyLeaveDetail(id: any) {
    return this.http.delete(`http://localhost:4000/api/applyLeave/applyLeave/delete/${id}`).toPromise()
  }
  leaveImageUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }

}
