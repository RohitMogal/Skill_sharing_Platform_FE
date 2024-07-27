import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'login';
  constructor(private _cookieService: CookieService, private _router: Router) { }
  ngOnInit(): void {
    if (this._cookieService.get('token') != '') {
      this._router.navigate(['/explore-page']);
    }
  }
}
