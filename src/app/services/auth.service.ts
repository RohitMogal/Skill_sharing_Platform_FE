import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _cookieService:CookieService, private _router:Router) { }
  canActive(route:ActivatedRoute,){
    if(this._cookieService.get('token')!=''){
      this._router.navigate(['/explore-page']);
      return true;
    }
    this._router.navigate(['/'])
    return false;
  }
}
