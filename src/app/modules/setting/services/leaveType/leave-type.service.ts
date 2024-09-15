import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  constructor(
    private http: HttpClient
  ) { }


  createleaveType(data: any) {
    return this.http.post('http://localhost:4000/api/setting/leaveType/create', data).toPromise()
  }

  getAllleaveTypeDetails() {
    return this.http.get('http://localhost:4000/api/setting/leaveType/getAll').toPromise()
  }

  singleleaveTypeDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/leaveType/get/${id}`).toPromise()
  }
  updateleaveType(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/leaveType/update/${data._id}`, data).toPromise()
  }
  getAllleaveTypeDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/leaveType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateleaveTypeDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/leaveType/update`, data).toPromise()
  }

  getAllLeaveTypeDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/leaveType/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
