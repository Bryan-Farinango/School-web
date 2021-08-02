import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificacionCorreoComponent } from './pages/registro-process/verificacion-correo/verificacion-correo.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro-process/registro/registro.component';
import { RecuperarContrasenaComponent } from './pages/recuperar-contrasena-process/recuperar-contrasena/recuperar-contrasena.component';
import { MensajeContrasenaComponent } from './pages/recuperar-contrasena-process/mensaje-contrasena/mensaje-contrasena.component';
import { FormularioRecuperarContrasenaComponent } from './pages/recuperar-contrasena-process/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { MensajeExitosoCambioContrasenaComponent } from './pages/recuperar-contrasena-process/mensaje-exitoso-cambio-contrasena/mensaje-exitoso-cambio-contrasena.component';
import { VerificacionCuentaComponent } from './pages/registro-process/verificacion-cuenta/verificacion-cuenta.component';
import { AccionesFirebaseComponent } from './components/acciones-firebase/acciones-firebase.component';
import { ErrorPage404Component } from './pages/error/error-page404/error-page404.component';
import { ErrorPage500Component } from './pages/error/error-page500/error-page500.component';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { RegisterGuardGuard } from './guards/register/register-guard.guard';
import { VerificationGuardGuard } from './guards/verification-account/verification-guard.guard';
import { InfoPageComponent } from './pages/info-page/info-page.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { CreateGradeComponent } from './pages/create-grade/create-grade.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['info-school']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'verificacion-correo',
    component: VerificacionCorreoComponent,
    canActivate: [VerificationGuardGuard],
  },
  {
    path: 'validacion-cuenta',
    component: VerificacionCuentaComponent,
  },
  {
    path: 'recuperar-contrasena',
    component: RecuperarContrasenaComponent,
  },
  {
    path: 'info-school',
    component: InfoPageComponent,
  },
  //HOME ADMIN
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard, RegisterGuardGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: 'create-teacher', // child route path
        component: CreateUserComponent, // child route component that the router renders
      },
      {
        path: 'create-subject', // child route path
        component: CreateSubjectComponent, // child route component that the router renders
      },
      {
        path: 'create-grade', // child route path
        component: CreateGradeComponent, // child route component that the router renders
      },
      {
        path: 'create-user', // child route path
        component: CreateUserComponent, // child route component that the router renders
      },
    ],
  },
  {
    path: "home/error-404'",
    component: ErrorPage404Component,
  },
  {
    path: 'contrasena-enviada',
    component: MensajeContrasenaComponent,
  },
  {
    path: 'nueva-contrasena',
    component: FormularioRecuperarContrasenaComponent,
  },
  {
    path: 'constrasena-exitosa',
    component: MensajeExitosoCambioContrasenaComponent,
  },
  {
    path: 'acciones',
    component: AccionesFirebaseComponent,
  },
  {
    path: 'error-404',
    component: ErrorPage404Component,
  },
  {
    path: 'error-500',
    component: ErrorPage500Component,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorPage404Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
