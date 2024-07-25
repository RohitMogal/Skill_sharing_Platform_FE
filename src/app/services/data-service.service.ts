import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  apiUrl = "http://192.168.9.112:3000";
  token:any;
  constructor(private http: HttpClient,) {}
  userLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  userRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
  getSessions(){
    const header=new HttpHeaders()
    .set('Authorization',this.token)
    return this.http.get(`${this.apiUrl}/session`,{ headers:header });
  }
}
