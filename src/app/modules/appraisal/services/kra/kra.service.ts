import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KraService {

  constructor(private http: HttpClient) { }


  createKRADetail(data: any) {
    return this.http.post('http://localhost:4000/api/appraisal/kra_details/create', data).toPromise()
  }
  getAllKRADetail() {
    return this.http.get('http://localhost:4000/api/appraisal/kra_details/getAll').toPromise()
  }
  singleKRADetail(id: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/kra_details/get/${id}`).toPromise()
  }
  updateKRADetail(data: any) {
    return this.http.put(`http://localhost:4000/api/appraisal/kra_details/update/${data._id}`, data).toPromise()
  }
  getAllKRADetailPage(skip: any, itemsPerPage: any) {
    return this.http.get(`http://localhost:4000/api/appraisal/kra_details/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  updateKRADetailMany(data: any) {
    return this.http.put('http://localhost:4000/api/appraisal/kra_details/update', data).toPromise()
  }

  getAllKRADetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/appraisal/kra_details/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }


}
