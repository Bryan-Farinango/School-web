import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ComponentsModule } from '../components/components.module';
import { RegistroComponent } from './registro-process/registro/registro.component';
import { VerificacionCorreoComponent } from './registro-process/verificacion-correo/verificacion-correo.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { RecuperarContrasenaComponent } from './recuperar-contrasena-process/recuperar-contrasena/recuperar-contrasena.component';
import { MensajeContrasenaComponent } from './recuperar-contrasena-process/mensaje-contrasena/mensaje-contrasena.component';
import { FormularioRecuperarContrasenaComponent } from './recuperar-contrasena-process/formulario-recuperar-contrasena/formulario-recuperar-contrasena.component';
import { MensajeExitosoCambioContrasenaComponent } from './recuperar-contrasena-process/mensaje-exitoso-cambio-contrasena/mensaje-exitoso-cambio-contrasena.component';
import { VerificacionCuentaComponent } from './registro-process/verificacion-cuenta/verificacion-cuenta.component';
import { ErrorPage500Component } from './error/error-page500/error-page500.component';
import { ErrorPage404Component } from './error/error-page404/error-page404.component';
import { RegisterGuardGuard } from '../guards/register/register-guard.guard';
import { VerificationGuardGuard } from '../guards/verification-account/verification-guard.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { InfoPageComponent } from './info-page/info-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    VerificacionCorreoComponent,
    HomeComponent,
    RecuperarContrasenaComponent,
    MensajeContrasenaComponent,
    FormularioRecuperarContrasenaComponent,
    MensajeExitosoCambioContrasenaComponent,
    VerificacionCuentaComponent,
    ErrorPage404Component,
    ErrorPage500Component,
    InfoPageComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    FlexLayoutModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  providers: [RegisterGuardGuard, VerificationGuardGuard],
})
export class PagesModule {}
