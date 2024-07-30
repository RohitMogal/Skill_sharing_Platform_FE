import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor(private _cookieService:CookieService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._cookieService.get('token');
    const id = this._cookieService.get('userId');
    
    if (token && id){
    const modifiedRequest=request.clone({
      setHeaders:{
        'Authorization': `Bearer ${token}`,
        'id': id
      }
    });
    return next.handle(modifiedRequest)
    }
    else{
    console.log("request",request);
    return next.handle(request);
  }
}
}
