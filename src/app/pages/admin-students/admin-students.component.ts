import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.scss'],
})
export class AdminStudentsComponent implements OnInit {
  public responseStudents: any;
  public motivoRechazo: boolean;
  dataObjGetSolicitudes = {
    api_key_admin: '',
  };

  dataObjAprobar = {
    api_key_admin: '',
    estudiante_id: '',
    motivo: '',
  };
  editFormMotivo = new FormGroup({
    motivo: new FormControl(''),
  });
  constructor(
    private adminService: AdminApiService,
    private toastr: ToastrService
  ) {
    this.motivoRechazo = false;
  }

  ngOnInit(): void {
    this.getStudents();
  }
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  getStudents() {
    const id = localStorage.getItem('usuario_id');
    this.dataObjGetSolicitudes.api_key_admin = environment.apiKeyAdmin;
    this.adminService
      .getStudentSolicitudes(this.dataObjGetSolicitudes)
      .subscribe(
        (result) => {
          if (result.resultado == true) {
            this.responseStudents = result.solicitudes;
          } else {
            this.showAlert(result.mensaje, 'Error');
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  aprobar(idEstudiante: any) {
    this.dataObjAprobar.api_key_admin = environment.apiKeyAdmin;
    this.dataObjAprobar.estudiante_id = idEstudiante;
    this.adminService.aprobarStudent(this.dataObjAprobar).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Estudiante Matriculado.', 'Listo');
          this.getStudents();
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  rechazar(idEstudiante: any) {
    this.motivoRechazo = !this.motivoRechazo;
  }

  confirmarRechazo(idEstudiante: any) {
    const { motivo } = this.editFormMotivo.value;
    this.dataObjAprobar.api_key_admin = environment.apiKeyAdmin;
    this.dataObjAprobar.estudiante_id = idEstudiante;
    this.dataObjAprobar.motivo = motivo;

    this.adminService.rechazarStudent(this.dataObjAprobar).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Matrícula Rechazada.', 'Listo');
          this.getStudents();
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onUpdate(form: any, id: any) {
    if (form.invalid) {
      this.showAlert('Datos incorrectos', 'Error');
      return;
    }
  }

  keyPressOnlyText(event: any): boolean {
    const field = String.fromCharCode(event.keyCode);
    if (/[a-zA-ZñÑÀ-ÿ`-]/.test(field)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
}
