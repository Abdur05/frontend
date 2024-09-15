import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient
  ) { }


  createdepartment(data: any) {
    return this.http.post('http://localhost:4000/api/setting/department/create', data).toPromise()
  }

  getAlldepartmentDetails() {
    return this.http.get('http://localhost:4000/api/setting/department/getAll').toPromise()
  }

  singledepartmentDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/department/get/${id}`).toPromise()
  }
  updatedepartment(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/department/update/${data._id}`, data).toPromise()
  }
  getAlldepartmentDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/department/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedepartmentDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/department/update`, data).toPromise()

  }

  getAllDepartmentDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/department/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
