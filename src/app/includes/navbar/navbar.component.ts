import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  loggedIn:any;
  constructor(private _router: Router, private _dataService:DataServiceService, private _cookieService:CookieService) { 
    console.log(_cookieService.get('token'))
    if(_cookieService.get('token')!=''){
      this.loggedIn=true;
    }
  }

  ngOnInit(): void {
    this._dataService.tokenSubject.subscribe((response:any)=>{
      if(response!=null){
        this.loggedIn=true;
      }
      else{
        this.loggedIn=false;
      }
    })
  }
  //Routing Logic
  logout() {
    this._cookieService.deleteAll('/','localhost');
    this._dataService.tokenSubject.next(null)
    this._router.navigate(['/login']);
    console.log('Logout clicked');
  }
  register() {
    this._router.navigate(['/register'])
    console.log('Register clicked');
  }
  login() {
    this._router.navigate(['/login'])
    console.log('Login clicked');
  }
  
}
