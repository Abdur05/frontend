import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralSettingService {

  constructor(
    private http: HttpClient
  ) { }

  creategeneralSetting(data: any) {
    return this.http.post('http://localhost:4000/api/setting/generalSetting/create', data).toPromise()
  }

  getAllgeneralSettingDetails() {
    return this.http.get('http://localhost:4000/api/setting/generalSetting/getAll').toPromise()
  }

  singlegeneralSettingDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/generalSetting/get/${id}`).toPromise()
  }
  updategeneralSetting(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/generalSetting/update/${data._id}`, data).toPromise()
  }

  getAllgeneralSettingDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/generalSetting/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updategeneralSettingDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/generalSetting/update`, data).toPromise()
  }
  getAllRolesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/generalSetting/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
