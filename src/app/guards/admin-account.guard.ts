import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminApiService } from '../services/admin-api.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAccountGuard implements CanActivate {
  dataObjGetUserInfo = {
    usuario_id: '',
    api_key_admin: '',
  };
  responseInfo: any;
  navigate: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    public adminService: AdminApiService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = await this.authService.getCurrentUser();

    const id = localStorage.getItem('usuario_id');
    this.dataObjGetUserInfo.usuario_id = id;
    this.dataObjGetUserInfo.api_key_admin = environment.apiKeyAdmin;

    const validationUser = await this.adminService
      .getUserInfo(this.dataObjGetUserInfo)
      .subscribe(
        (result) => {
          console.log('datos del usuario a loguearse desde guard', result);
          if (result.resultado == true) {
            this.responseInfo = result.objeto;
            if (this.responseInfo.rol == 'Padre') {
              if (this.responseInfo.rol != 'Administrador') {
                this.router.navigate(['/user-page/create-inscription']);
                this.navigate = false;
              }
            } else {
              this.navigate = true;
            }
          }

          return this.navigate;
        },
        (error) => {
          console.log(error);
        }
      );
    console.log('constante await  ', validationUser);
    return this.navigate;
  }
}
