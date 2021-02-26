import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
let headers = new HttpHeaders;
headers.set('Content-Type', ' application/json');
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  prefix = environment.API_URL;
  suffix = 'team4/dummy_api/api/';
  constructor(
    private httpclient: HttpClient
  ) { }
  public registeruser(formData: any): Observable<any> {
    return this.httpclient.post(`${this.prefix}${this.suffix}signup`, formData, {
      headers
    })
  }
  public login(formData: any): Observable<any> {
    return this.httpclient.post(`${this.prefix}${this.suffix}login`, formData, {
      headers
    })
  }
}
