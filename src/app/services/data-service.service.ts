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
  //Subject for token updates
  tokenSubject: Subject<any> = new Subject();

  constructor(private http: HttpClient, private _cookieService: CookieService) { }

  //Login API request
  userLogin(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
  //Register API request
  userRegister(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, data);
  }
  //Forgot Password API request
  postForgot(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/resetPassword`, data);
  }
  //Get session API request
  getSessions() {
    return this.http.get(`${environment.apiUrl}/session`);
  }
  //Get User Profile API request
  getUserProfile(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${this._cookieService.get('userId')}`);
  }
  //Update User Profile API request
  updateUserProfile(data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/user/${this._cookieService.get('userId')}`, data);
  }
  //Get Interests API request
  getInterests(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interests`);
  }
  //Create Session API request
  sessionCreate(sessionData: any) {
    return this.http.post(`${environment.apiUrl}/session`, sessionData);
  }
  //Request Session API request
  requestSessions(requestData: any) {
    return this.http.post(`${environment.apiUrl}/request`, requestData);
  }
  //My Activity API request
  myActivity(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/session/myActivity`);
  }
  //Make Payment API request
  makePayment(paymentData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/payment`, paymentData);
  }
  //Get dropdown interests API request.
  dropDownIntrest(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/interests`);
  }
  //Get session request API request.
  getSessionRequest(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/session/request`);
  }
  //Feedback API request.
  feedbackApi(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/feedback`, data);
  }
  //Get session request API request.
  getRequestSession(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/request`);
  }
  //Email API request for payment
  emailApi(data: any) {
    return this.http.post(`${environment.apiUrl}/payment`, data);
  }
}
