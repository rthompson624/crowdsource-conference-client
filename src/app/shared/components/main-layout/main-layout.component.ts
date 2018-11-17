import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.userIsAuthenticated();
  }

  onLogout(): void {
    this.authService.logoutUser();
    this.router.navigate(['/', 'authentication', 'login']);
  }

}
