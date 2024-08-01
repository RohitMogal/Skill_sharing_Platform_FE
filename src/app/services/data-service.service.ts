import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  token: any;
  saveUsers(data: any) {
    throw new Error('Method not implemented.');
  }
  // apiUrl = "http://192.168.9.112:3000";
  tokenSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  //Login API 
  userLogin(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
  //Register API
  userRegister(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, data);
  }
  //Forgot Password API
  postForgot(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/resetPassword`, data);
  }
  //Session API
  getSessions() {
    return this.http.get(`${environment.apiUrl}/session`);
  }
  //Profile API
  getUserProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${this._cookieService.get('userId')}`);
  }
  //UPdate Profile API
  updateUserProfile(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/${this._cookieService.get('userId')}`, data);
  }
  // User Interest API
  getInterests(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interests`);
  }
  //create session API
  sessionCreate(sessionData: any) {
    return this.http.post(`${environment.apiUrl}/session`, sessionData);
  }
  //Request Session API
  requestSessions(requestData: any) {
    return this.http.post(`${environment.apiUrl}/request`, requestData);
  }
  // My activity list API
  myActivity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/session/myActivity`);
  }
  //Make Payment API
  makePayment(paymentData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payment`, paymentData);
  }
  //DropDown Intrest API
  dropDownIntrest(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interests`);
  }
  //get session request
  getSessionRequest(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/session/request`);
  }
  //Feedback API
  feedbackApi(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/feedback`, data);
  }
  getRequestSession(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/request`);
  }
  emailApi(data: any) {
    return this.http.post(`${environment.apiUrl}/payment`, data);
  }
}
