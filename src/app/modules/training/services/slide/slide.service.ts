import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  constructor(
    private http: HttpClient
  ) { }

  createSlideDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/v1/courses/slide/create', data, { headers }).toPromise()
  }

  getAllSlideDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/v1/courses/All', { headers }).toPromise()
  }

  singleSlideDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/v1/courses_details/getById/${id}`, { headers }).toPromise()
  }
  updateSlideDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses/update/${data._id}`, data, { headers }).toPromise()
  }

  updateCourseSlideDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses/slide/update/${data._id}`, data, { headers }).toPromise()
  }

  updateCourseSlideSeqDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses/slide/sequence`, {data:data}, { headers }).toPromise()
  }

  deleteSlideDetail(id:any,data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/v1/courses/slide/delete/${id}`, data, { headers }).toPromise()
  }

  uploadSlideFilePath(data: FormData) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const courseId = data.get('courseId') as string;
    const courseModuleId = data.get('courseModuleId') as string;
    return this.http.post(`http://localhost:4000/api/v1/courses_resource/file_upload?courseId=${courseId}&courseModuleId=${courseModuleId}`, data, { headers }).toPromise()
  }

}
