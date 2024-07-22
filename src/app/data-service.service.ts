import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
apiUrl = ""
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }
  registerPost(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts`, data).pipe(
      catchError(error => {
        console.error('Error to rgister:', error);
        throw error;
      })
    );
  }

  loginPost(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      catchError(error => {
        console.error('Error during login:', error);
        throw error;
      })
    );
  }
}

