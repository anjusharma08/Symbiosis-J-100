import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router
  ) {}

  showFeatures = false;  // Initially, features are hidden.

  toggleFeatures() {
    this.showFeatures = !this.showFeatures;  // Toggle feature visibility on button click.
  }
  logout() {
    // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
    localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);//where you want to clear sensitive data like a user's authentication
    this.router.navigate(['../../']);
  }

}
