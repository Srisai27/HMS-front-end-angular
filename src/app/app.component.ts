import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    this.auth.isAuthenticated$.subscribe(isauth => {
      if (isauth) {
        this.router.navigateByUrl('/home');
      }
    })
  }
  title = 'Hospital-Management-System';
}
