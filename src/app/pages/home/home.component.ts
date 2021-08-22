import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
  public isLogged = false;
  public user: any;

  constructor(private authSvc: AuthService, private router: Router) {}

  async ngOnInit() {
    this.user = await this.authSvc.getCurrentUser();

    if (this.user) {
      this.isLogged = true;
    }
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      localStorage.clear();
      this.router.navigate(['/login']);
    } catch (error) {}
  }
}
