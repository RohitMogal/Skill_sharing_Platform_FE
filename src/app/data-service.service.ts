import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
apiUrl = "";

  constructor(private http: HttpClient,) { 
    
  }
  ngOnInit(): void {
  }
  
  saveUsers(data:any){
    return this.http.post(this.apiUrl,data)
  }
}

