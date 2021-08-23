import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-students-teacher',
  templateUrl: './students-teacher.component.html',
  styleUrls: ['./students-teacher.component.scss'],
})
export class StudentsTeacherComponent implements OnInit {
  @ViewChild('contentSend', { static: false }) modalEdit: TemplateRef<void>;
  dataObjGetGrades = {
    api_key_admin: '',
  };
  dataObjGetMySubj = {
    usuario_id: '',
  };

  dataObjEst = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: '',
  };

  dataObjNotification = {
    titulo: '',
    tema: '',
    fecha: <string>'',
    mensaje: '',
    estudiante_id: '',
    usuario_id: '',
  };
  public topicOption: any;
  public responseGrades: any;
  public responseSubjects: any;
  public responseStudents: any;
  gradeForm = new FormGroup({
    grade: new FormControl(''),
    subject: new FormControl(''),
  });
  materiaForm = new FormGroup({
    subject: new FormControl(''),
  });

  notificationForm = new FormGroup({
    title: new FormControl(''),
    topic: new FormControl(''),
    date: new FormControl(new Date().toISOString()),
    message: new FormControl(''),
  });

  public dateAux: string;
  constructor(
    public adminService: AdminApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public datepipe: DatePipe
  ) {
    this.topicOption = environment.topicNotification;
  }

  ngOnInit(): void {
    this.getAllData();
    this.search();
  }

  getAllData() {
    this.dataObjGetGrades.api_key_admin = environment.apiKeyAdmin;
    this.adminService.getGrades(this.dataObjGetGrades).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseGrades = result.grados;
        }
      },
      (error) => {
        console.log(error);
      }
    );
    this.dataObjGetMySubj.usuario_id = localStorage.getItem('usuario_id');
    this.adminService.getMySubject(this.dataObjGetMySubj).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseSubjects = result.asignaturas;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  search() {
    this.dataObjEst.usuario_id = localStorage.getItem('usuario_id');
    const { grade } = this.gradeForm.value;
    const { subject } = this.materiaForm.value;

    this.dataObjEst.grado_id = grade;
    this.dataObjEst.asignatura_id = subject;

    if (this.dataObjEst.grado_id == '') {
      this.dataObjEst.grado_id = 'todos';
    }

    if (this.dataObjEst.asignatura_id == '') {
      this.dataObjEst.asignatura_id = 'todos';
    }
    this.adminService.getMyStudents(this.dataObjEst).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseStudents = result.estudiantes;
          console.log(
            'seleccionado: ',
            grade,
            subject,
            this.dataObjEst,
            'response: ',
            this.responseStudents
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showAlert(message, title): void {
    this.toastr.error(message, title, {
      toastClass: 'toast-alert-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }
  showSuccess(message, title): void {
    this.toastr.success(message, title, {
      toastClass: 'toast-success-message',
      tapToDismiss: false,
      disableTimeOut: true,
      closeButton: true,
    });
  }

  openModalEdit(): void {
    this.modalService.open(this.modalEdit, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'download-file',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  openNotification(estudianteId: any, usuarioId: any) {
    this.dataObjNotification.estudiante_id = estudianteId;
    this.dataObjNotification.usuario_id = usuarioId;
    this.openModalEdit();
  }

  sendNotification(form: any) {
    if (form.invalid) {
      this.showAlert('Campos Vacíos', 'Error');
      this.notificationForm.get('title').reset();
      this.notificationForm.get('topic').reset();
      this.notificationForm.get('message').reset();
      return;
    }

    const { title, topic, date, message } = this.notificationForm.value;

    this.dataObjNotification.titulo = title;
    this.dataObjNotification.tema = topic;
    this.dateAux = date;
    this.dateAux = this.datepipe.transform(this.dateAux, 'yyyy-MM-dd');
    this.dataObjNotification.fecha = this.dateAux;
    this.dataObjNotification.mensaje = message;

    console.log('listo pa enviar: ', this.dataObjNotification, 'date: ', date);
    this.notificationForm.get('title').reset();
    this.notificationForm.get('topic').reset();
    this.notificationForm.get('message').reset();
  }
}
