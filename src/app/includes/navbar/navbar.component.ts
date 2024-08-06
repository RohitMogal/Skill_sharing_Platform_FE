import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../../services/data-service.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn: any;
  constructor(private _router: Router, private _dataService: DataServiceService, private _cookieService: CookieService) {
    if (_cookieService.get('token') != '') {
      this.loggedIn = true;
    }
  }
  //Initializes the component.
  ngOnInit(): void {
    this._dataService.tokenSubject.subscribe((response: any) => {
      if (response != null) {
        this.loggedIn = true;
      }
      else {
        this.loggedIn = false;
      }
    })
  }
  //Logs out the user by deleting the token cookie and navigating to the login page.
  logout() {
    this._cookieService.deleteAll('/', 'localhost');
    this._dataService.tokenSubject.next(null)
    this._router.navigate(['/login']);
  }
  //Navigates to the register page.
  register() {
    this._router.navigate(['/register'])
  }
  //Navigates to the login page.
  login() {
    this._router.navigate(['/login'])
  }

}
