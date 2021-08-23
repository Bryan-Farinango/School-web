import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminApiService } from 'src/app/services/admin-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-students-teacher',
  templateUrl: './students-teacher.component.html',
  styleUrls: ['./students-teacher.component.scss'],
})
export class StudentsTeacherComponent implements OnInit {
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
  constructor(public adminService: AdminApiService) {}

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
}
