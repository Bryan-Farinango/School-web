import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'app-create-grade',
  templateUrl: './create-grade.component.html',
  styleUrls: ['./create-grade.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class CreateGradeComponent implements OnInit {
  hide = true;
  public showPassword: boolean;
  public emailExist: boolean;
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    telefono: new FormControl(''),
    rol: new FormControl(''),
  });

  constructor(private authSvc: AuthService, private router: Router) {
    this.showPassword = false;
    this.emailExist = false;
  }
  setShowPassword() {
    this.showPassword = !this.showPassword;
  }
  ngOnInit(): void {}

  async onRegister(form: any) {
    if (form.invalid) {
      return;
    }

    const { email, password } = this.registerForm.value;

    try {
      const user = await this.authSvc.register(email, password);

      if (user.code == 'auth/email-already-in-use') {
        this.emailExist = true;
      } else if (user) {
        this.router.navigate(['/verificacion-correo']);
      }
    } catch (error) {}
  }
}
