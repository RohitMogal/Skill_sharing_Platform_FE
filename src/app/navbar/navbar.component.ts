import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    // Implement your logout logic here
    console.log('Logout clicked');
    // Redirect to login page or perform logout action
    this.router.navigate(['/login']);
  }
}
