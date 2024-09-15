import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseModuleService {

  constructor(
    private http: HttpClient
  ) { }

  createCourseModuleDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/courses_module/create', data, { headers }).toPromise()
  }

  getAllCourseModuleDetail(courseId: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/courses_module/getAll/${courseId}`, { headers }).toPromise()
  }

  singleCourseModuleDetail(courseId: any, id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/courses_module/getById/${courseId}/${id}`, { headers }).toPromise()
  }
  updateCourseModuleDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses_module/update/${data._id}`, data, { headers }).toPromise()
  }

  getAllCourseModuleDetailPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/courses_module/getAll/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  deleteCourseModuleDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses_module/delete/${data._id}`, data, { headers }).toPromise()
  }

}
