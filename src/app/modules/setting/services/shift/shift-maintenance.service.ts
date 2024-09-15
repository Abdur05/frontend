import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShiftMaintenanceService {

  constructor(
    private http: HttpClient
  ) { }

  createShiftMaintenanceDetail(data: any) {
    return this.http.post('http://localhost:4000/api/setting/shiftMaintenance/create', data).toPromise()
  }

  getAllShiftMaintenanceDetail() {
    return this.http.get('http://localhost:4000/api/setting/shiftMaintenance/getAll').toPromise()
  }

  singleShiftMaintenanceDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/shiftMaintenance/get/${id}`).toPromise()
  }
  updateShiftMaintenanceDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/shiftMaintenance/update/${data._id}`, data).toPromise()
  }

  getAllShidtMaintenanceDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/shiftMaintenance/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateShiftMaintenanceDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/shiftMaintenance/update`, data).toPromise()
  }
  getAllShiftMaintenanceDetailPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/shiftMaintenance/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
