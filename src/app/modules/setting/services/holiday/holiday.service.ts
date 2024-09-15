import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(
    private http: HttpClient
  ) { }


  creaeholiday(data: any) {
    return this.http.post('http://localhost:4000/api/setting/holiday/create', data).toPromise()
  }

  getAllholidayDetails() {
    return this.http.get('http://localhost:4000/api/setting/holiday/getAll').toPromise()
  }

  singleholidayDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/holiday/get/${id}`).toPromise()
  }
  updateholiday(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/holiday/update/${data._id}`, data).toPromise()
  }
  getAllholidayDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/setting/holiday/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  
  updateholidayDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/holiday/update`, data).toPromise()
  }
}
