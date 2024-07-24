import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  apiUrl = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient,) {

  }
  ngOnInit(): void {
  }

  userLogin(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data)
  }

  userRegister(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data)
}
}
