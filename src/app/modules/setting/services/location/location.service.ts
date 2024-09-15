import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient
  ) { }


  createLocation(data: any) {
    return this.http.post('http://localhost:4000/api/setting/location/create', data).toPromise()
  }

  getAllLocationDetails() {
    return this.http.get('http://localhost:4000/api/setting/location/getAll').toPromise()
  }

  singleLocationDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/location/get/${id}`).toPromise()
  }
  updateLocation(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/location/update/${data._id}`, data).toPromise()
  }
  getAlllocationDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/location/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatelocationDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/location/update`, data).toPromise()
  }
  getAllLocationDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/location/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
