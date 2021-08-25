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
  dataObjEst = {
    usuario_id: '',
    asignatura_id: '',
    grado_id: '',
  };
  dataObjRegistro = {
    grado_id: '',
    fecha: <string>'',
    descripcion: '',
    materia_id: '',
    estudiante_id: '',
    usuario_id: '',
  };
  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;
  passwordInputType = 'password';
  roleOptions = ['Administrador', 'Profesor'];
  public responseGrades: any;
  public responseSubjects: any;
  public responseStudents: any;
  public btnDisabled: boolean;
  public dateAux: any;
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
    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      grade: [null, Validators.required],
      date: [null, Validators.required],
      description: [null, Validators.required],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      subject: [null, Validators.required],
      student: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });
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
    const { grade, date, description } = this.verticalAccountFormGroup.value;
    const { subject, student } = this.verticalPasswordFormGroup.value;
    this.dateAux = date;
    this.dateAux = this.datepipe.transform(this.dateAux, 'yyyy-MM-dd');

    this.dataObjRegistro.usuario_id = localStorage.getItem('usuario_id');
    this.dataObjRegistro.materia_id = subject;
    this.dataObjRegistro.grado_id = grade;
    this.dataObjRegistro.fecha = this.dateAux;
    this.dataObjRegistro.descripcion = description;
    this.dataObjRegistro.estudiante_id = student;

    console.log('datos listos a crearse: ', this.dataObjRegistro);
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
}
