import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AdminApiService } from 'src/app/services/admin-api.service';
@Component({
  selector: 'app-user-transporte',
  templateUrl: './user-transporte.component.html',
  styleUrls: ['./user-transporte.component.scss'],
})
export class UserTransporteComponent implements OnInit {
  dataObjMovileUser = {
    usuario_id: '',
  };
  step: any;
  responseMovile: any;
  currentDate = new Date();
  userMobile: boolean;
  constructor(
    private datePipe: DatePipe,
    public adminService: AdminApiService
  ) {
    this.getUserMovileInfo();
  }

  ngOnInit(): void {}

  getUserMovileInfo() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjMovileUser.usuario_id = id;
    this.adminService.getMovilUser(this.dataObjMovileUser).subscribe(
      (result) => {
        if (result.resultado == true) {
          if (result.objeto.usuario_existe === false) {
            this.step = 1;
          } else {
            this.step = 2;
          }
          this.responseMovile = result.objeto;

          console.log(this.responseMovile);
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
