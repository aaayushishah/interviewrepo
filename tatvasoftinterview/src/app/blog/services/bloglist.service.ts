import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
let headers = new HttpHeaders;
headers.set('Content-Type', ' application/json');
@Injectable({
  providedIn: 'root'
})
export class BloglistService {
  prefix = environment.API_URL;
  suffix = 'team4/dummy_api/api/';
  constructor(
    private httpclient: HttpClient
  ) { }
  public getAllBlogs(): Observable<any> {
    return this.httpclient.get(`${this.prefix}${this.suffix}blog`, {
      headers
    })
  }
  public getAllByUser(userid: any): Observable<any> {
    return this.httpclient.get(`${this.prefix}${this.suffix}blog?user_id=${userid}`, {
      headers
    })
  }
  public createBlog(formData: any): Observable<any> {
    return this.httpclient.post(`${this.prefix}${this.suffix}create_blog`, formData, {
      headers
    })
  }
  public updateBlog(formData: any): Observable<any> {
    return this.httpclient.post(`${this.prefix}${this.suffix}update_blog`, formData, {
      headers
    })
  }
  public deleteBlog(formData: any): Observable<any> {
    return this.httpclient.post(`${this.prefix}${this.suffix}blog_delete`, formData, {
      headers
    })
  }
}
