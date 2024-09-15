import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthrService {

  constructor(
    private http: HttpClient
  ) { }


  createUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/create', data).toPromise()
  }


  loginUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/login', data).toPromise()
  }

  forgotPasswordUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/forgotPassword', data).toPromise()
  }

  verifyCodeUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/code', data).toPromise()
  }

  newPassword(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/newPassword', data).toPromise()
  }

  newPasswordWithCode(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/newPass', data).toPromise()
  }


  loginDetailsUpdated(data: any) {
    return this.http.post('http://localhost:4000/api/auth/login/update', data).toPromise()
  }

  getSingleUserdetails(id: any) {
    return this.http.get(`http://localhost:4000/api/auth/user/get/${id}`).toPromise()
  }

  updateSingleUserdetails(data: any) {
    return this.http.put(`http://localhost:4000/api/auth/user/update/${data._id}`, data).toPromise()
  }
  logoutUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/logout', data).toPromise()
  }


  getScreenDetails(){
    return this.http.get('http://localhost:4000/api/master/screenMenu/getAll').toPromise()
  }

  getUserRolesDetails(){
    return this.http.get('http://localhost:4000/api/setting/rolesAccess/getAll').toPromise();
  }

}
