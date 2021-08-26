import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.scss'],
})
export class NotasComponent implements OnInit {
  @ViewChild('contentCreate', { static: false }) modalCreate: TemplateRef<void>;
  dataObjGetGrades = {
    api_key_admin: '',
  };
  dataObjGetMateriaFromTeacher = {
    grado_id: '',
    usuario_id: '',
  };
  dataObjGetMateriaFromOnlyTeacher = {
    usuario_id: '',
  };
  dataObjEst = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: '',
  };

  dataObjEstAlone = {
    usuario_id: '',
    asignatura_id: 'todos',
    grado_id: 'todos',
  };

  dataObjGetStudentCalificaciones = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: 'todos',
  };
  dataObjRegistro = {
    grado_id: '',
    fecha: <string>'',
    descripcion: '',
    materia_id: '',
    estudiante_id: '',
    usuario_id: '',
    quimestre: '',
  };

  dataObjGetCalificaciones = {
    grado_id: 'todos',
    profesor_id: '',
    estudiante_id: 'todos',
    materia_id: 'todos',
    estado: 1,
    usuario_id: 'todos',
  };

  dataObjDelNota = {
    calificacion_id: '',
  };
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;

  passwordInputType = 'password';
  roleOptions = ['Administrador', 'Profesor'];
  quimestreOptions = environment.quimestreOption;
  public responseNotas: any;
  public responseGrades: any;
  public responseSubjects: any;
  public responseSubjectsFromOnlyTeacher: any;
  public responseStudents: any;
  public responseStudentsFromOnlyTeacher: any;
  public responseOnlyStudents: any;
  public btnDisabled: boolean;
  public dateAux: any;

  searchForm = new FormGroup({
    studentSearch: new FormControl(''),
    subjectSearch: new FormControl(''),
    grade: new FormControl(''),
  });

  constructor(
    public adminService: AdminApiService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    public datepipe: DatePipe,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.btnDisabled = false;
  }

  ngOnInit(): void {
    this.getAllGrades();
    this.getMyStudents();
    this.getMateriasFromOnlyTeacher();
    this.searchCalificaciones();
    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      grade: [null, Validators.required],
      date: [null, Validators.required],
      description: [null, Validators.required],
      quimestre: [null, Validators.required],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      subject: [null, Validators.required],
      student: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });
  }

  getNotas() {}

  getMyStudents() {
    this.dataObjEstAlone.usuario_id = localStorage.getItem('usuario_id');
    this.adminService.getMyStudents(this.dataObjEstAlone).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseOnlyStudents = result.estudiantes;
          /*
          this.responseStudents.forEach((myObject) => {
            this.responseMaterias.push(myObject.materias);
          });
          */

          console.log('solo estudiantes', this.responseOnlyStudents);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getAllGrades() {
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

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  openModalCrear(): void {
    this.modalService.open(this.modalCreate, {
      centered: true,
      backdrop: 'static',
      size: 'md',
      animation: true,
      keyboard: false,
      windowClass: 'teacher-modal',
      backdropClass: 'modal-backdrop-download-file',
    });
  }

  onCreate() {
    this.openModalCrear();
  }

  submit() {
    console.log('correct');
    const {
      grade,
      date,
      description,
      quimestre,
    } = this.verticalAccountFormGroup.value;
    const { subject, student } = this.verticalPasswordFormGroup.value;
    this.dateAux = date;
    this.dateAux = this.datepipe.transform(this.dateAux, 'yyyy-MM-dd');

    this.dataObjRegistro.usuario_id = localStorage.getItem('usuario_id');
    this.dataObjRegistro.materia_id = subject;
    this.dataObjRegistro.grado_id = grade;
    this.dataObjRegistro.fecha = this.dateAux;
    this.dataObjRegistro.descripcion = description;
    this.dataObjRegistro.estudiante_id = student;
    this.dataObjRegistro.quimestre = quimestre;
    console.log('datos listos a crearse: ', this.dataObjRegistro);

    this.adminService.createRegistroNotas(this.dataObjRegistro).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.showSuccess('Registro creado correctamente.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fistQuery() {
    const { grade } = this.verticalAccountFormGroup.value;

    this.dataObjGetMateriaFromTeacher.grado_id = grade;
    this.dataObjGetMateriaFromTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );

    this.adminService
      .getMateriaFromGradeAndTeacher(this.dataObjGetMateriaFromTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjects = result.materias;
            if (this.responseSubjects.length == 0) {
              this.showAlert(
                'No existe Materias para el grado seleccionado.',
                'Error'
              );
            } else {
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChangeExtra(value: any) {
    this.dataObjGetMateriaFromTeacher.grado_id = value;
    this.dataObjGetMateriaFromTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );
    this.adminService
      .getMateriaFromGradeAndTeacher(this.dataObjGetMateriaFromTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjects = result.materias;
            if (this.responseSubjects.length == 0) {
              this.showAlert(
                'No existe Materias para el grado seleccionado.',
                'Error'
              );

              return;
            } else {
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getMateriasFromOnlyTeacher() {
    this.dataObjGetMateriaFromOnlyTeacher.usuario_id = localStorage.getItem(
      'usuario_id'
    );
    this.adminService
      .getMateriasFromOnlyTeacher(this.dataObjGetMateriaFromOnlyTeacher)
      .subscribe(
        (result) => {
          if (result.resultado) {
            this.responseSubjectsFromOnlyTeacher = result.materias;
            console.log(
              'materias only from teacher: ',
              this.responseSubjectsFromOnlyTeacher
            );
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onChange(deviceValue: any) {
    const event = deviceValue;
    const { grade } = this.verticalAccountFormGroup.value;
    this.dataObjEst.usuario_id = localStorage.getItem('usuario_id');
    this.dataObjEst.grado_id = grade;
    this.dataObjEst.asignatura_id = event;

    this.adminService.getMyStudents(this.dataObjEst).subscribe(
      (result) => {
        if (result.resultado == true) {
          this.responseStudents = result.estudiantes;
          console.log(this.responseStudents);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onChange2(deviceValue: any) {
    const event = deviceValue;
    this.dataObjGetStudentCalificaciones.asignatura_id = event;
    this.dataObjGetStudentCalificaciones.usuario_id = localStorage.getItem(
      'usuario_id'
    );

    this.adminService
      .getMyStudents(this.dataObjGetStudentCalificaciones)
      .subscribe(
        (result) => {
          if (result.resultado == true) {
            this.responseStudentsFromOnlyTeacher = result.estudiantes;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  searchCalificaciones() {
    const { studentSearch, subjectSearch } = this.searchForm.value;
    this.dataObjGetCalificaciones.profesor_id = localStorage.getItem(
      'usuario_id'
    );

    if (subjectSearch == '') {
      this.dataObjGetCalificaciones.materia_id = 'todos';
    } else {
      this.dataObjGetCalificaciones.materia_id = subjectSearch;
    }

    if (studentSearch == '') {
      this.dataObjGetCalificaciones.estudiante_id = 'todos';
    } else {
      this.dataObjGetCalificaciones.estudiante_id = studentSearch;
    }

    console.log(
      'datos listo pa buscar calificaciones: ',
      this.dataObjGetCalificaciones
    );
    this.adminService.getNotas(this.dataObjGetCalificaciones).subscribe(
      (result) => {
        if (result.resultado) {
          this.responseNotas = result.calificaciones;
          console.log('notas finales: ', this.responseNotas);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteNotas(value: any) {
    this.dataObjDelNota.calificacion_id = value;
    this.adminService.delNotas(this.dataObjDelNota).subscribe(
      (result) => {
        if (result.resultado) {
          this.searchCalificaciones();
          this.showSuccess('Registro borrado con éxito.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeNotas(value: any) {
    this.dataObjDelNota.calificacion_id = value;
    this.adminService.closeNotas(this.dataObjDelNota).subscribe(
      (result) => {
        if (result.resultado) {
          this.searchCalificaciones();
          this.showSuccess('Registro cerrado con éxito.', 'Listo');
        } else {
          this.showAlert(result.mensaje, 'Error');
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
