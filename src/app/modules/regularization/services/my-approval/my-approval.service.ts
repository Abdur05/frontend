import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyApprovalService {


  constructor(
    private http: HttpClient
  ) { } 

   
  createmyApproval(data:any){
    return this.http.post('http://localhost:4000/api/regularization/myApproval/create', data).toPromise()
  }
 
  getAllmyApprovalDetails(){
    return this.http.get('http://localhost:4000/api/regularization/myApproval/getAll').toPromise()
  }

  singlemyApprovalDetails(id:any){
    return this.http.get(`http://localhost:4000/api/regularization/myApproval/get/${id}`).toPromise()
  }
  updatemyApproval(data:any){
    return this.http.put(`http://localhost:4000/api/regularization/myApproval/update/${data._id}`, data).toPromise()
  }

  getAllmyApprovalDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/regularization/myApproval/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  
  updatemyApprovalDetailMany(data: any) {
    return this.http.put(`http://localhost:4000/api/regularization/myApproval/update`, data).toPromise()
  }


}
