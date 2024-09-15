import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailNotificationService {

  constructor(
    private http: HttpClient
  ) { }

  createEmailNotification(data: any) {
    return this.http.post('http://localhost:4000/api/setting/emailNotification/create', data).toPromise()
  }

  getAllemailNotificationDetails() {
    return this.http.get('http://localhost:4000/api/setting/emailNotification/getAll').toPromise()
  }

  singleEmailNotificationDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/emailNotification/get/${id}`).toPromise()
  }
  updateEmailNotification(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/emailNotification/update/${data._id}`, data).toPromise()
  }

  getAllemailNotificationDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/emailNotification/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateEmailNotificationDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/emailNotification/update`, data).toPromise()
  }
  getAllemailNotificationDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/emailNotification/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
