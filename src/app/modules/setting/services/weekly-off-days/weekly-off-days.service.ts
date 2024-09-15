import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeeklyOffDaysService {
  constructor(
    private http: HttpClient
  ) { }


  creaeweeklyOffDays(data: any) {
    return this.http.post('http://localhost:4000/api/setting/week_holiday/create', data).toPromise()
  }

  getAllweeklyOffDaysDetails() {
    return this.http.get('http://localhost:4000/api/setting/week_holiday/getAll').toPromise()
  }

  singleweeklyOffDaysDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/week_holiday/get/${id}`).toPromise()
  }
  updateweeklyOffDays(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/week_holiday/update/${data._id}`, data).toPromise()
  }
}
