import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
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
