import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig, NgbModal],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public verified: boolean;
  public errorAuth: boolean;
  public showPassword: boolean;
  public chargeImg: boolean;
  public manyRequestError: boolean;
  public userNotFound: boolean;
  hide = true;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private authSvc: AuthService,
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    this.verified = false;
    this.errorAuth = false;
    this.showPassword = false;
    this.manyRequestError = false;
    this.userNotFound = false;
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, { windowClass: 'verification-modal' });
  }

  setShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
    this.chargeImg = true;
    setTimeout(() => {
      this.chargeImg = false;
    }, 2000);
  }

  async onLogin(form: any, content: any) {
    if (form.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email, password);
      if (!user.code) {
        if (user.user.emailVerified) {
          this.router.navigate(['/home']);
        } else {
          this.open(content);
        }
      } else {
        if (
          user.code == 'auth/wrong-password' ||
          user.code == 'auth/user-not-found'
        ) {
          this.errorAuth = true;
        }
        if (user.code == 'auth/too-many-requests') {
          this.manyRequestError = true;
        }
        if (user.code == 'auth/user-not-found') {
          this.userNotFound = true;
          console.log('ingreso aqui', this.userNotFound);
        }
      }
    } catch (error) {}
  }
}
