import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _router: Router) { }

  logout() {
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
