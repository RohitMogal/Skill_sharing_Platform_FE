import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  saveUsers(data: any) {
    throw new Error('Method not implemented.');
  }
  apiUrl = "http://192.168.9.112:3000";
  tokenSubject: Subject<any>= new Subject();
  
  constructor(private http: HttpClient,) { }

  //Login API 
  userLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
  //Register API
  userRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
  //Session API
  getSessions() {
    return this.http.get(`${this.apiUrl}/session`);
  }
  //Create session API
  sessionCreate(data: any) {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
}
