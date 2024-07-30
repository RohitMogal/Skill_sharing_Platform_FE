import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  token: any;
  saveUsers(data: any) {
    throw new Error('Method not implemented.');
  }
  apiUrl = "http://192.168.9.112:3000";
  tokenSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient,) { }

  //Login API 
  userLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }
  //Register API
  userRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, data);
  }
  //Forgot Password API
  postForgot(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/resetPassword`, data);
  }
  //Session API
  getSessions() {
    return this.http.get(`${this.apiUrl}/session`);
  }
  //Profile API
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user`);
  }
  //UPdate Profile API
  updateUserProfile(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user`, data);
  }
  // User Interest API
  getUserInterests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userInterest`);
  }
  //create session API
  sessionCreate(sessionData: any) {
    return this.http.post(`${this.apiUrl}/session`, sessionData);
  }
  //Request Session API
  requestSessions(requestData: any) {
    return this.http.post(`${this.apiUrl}/request`, requestData);
  }

 // My activity list API
 myActivity(): Observable<any> {
  return this.http.post(`${this.apiUrl}/session/getfilterSession`, { filter: 'activity' });
}

// My interested list API
myInterestedList(): Observable<any> {
  return this.http.post(`${this.apiUrl}/session/getfilterSession`, { filter: 'interested' });
}

// My requested list API
requestSessionsList(): Observable<any> {
  return this.http.post(`${this.apiUrl}/session/getfilterSession`, { filter: 'requested' });
}

//Make Payment API
makePayment(paymentData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/email/`, paymentData);
}
}
