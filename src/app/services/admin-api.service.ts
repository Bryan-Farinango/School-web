import { Injectable } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  endpoint = '';
  constructor(private httpClient: HttpClient) {
    this.endpoint = environment.apiUrl;
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  createGrade(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/grados',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  createSubject(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/asignaturas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getGrades(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-grados',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  createUser(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/registro',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  createRuta(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/rutas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  createDriverWithFirebaseApi(data: any) {
    return this.httpClient
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.driverFirebaseApiKey,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  sendVerificationAccountDriverWithFirebase(data: any) {
    return this.httpClient
      .post<any>(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' +
          environment.driverFirebaseApiKey,
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  createDriver(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/transportista',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getUsers(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-users',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  editUsers(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/update-users',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteUser(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/delete-users',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  //rutas
  getRutas(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-rutas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getDrivers(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-transportistas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  addDriverToRuta(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/add-driver-to-ruta',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  delDriverFromRuta(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/delete-driver-from-ruta',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateRutas(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/update-rutas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteRuta(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/delete-rutas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  //asignaturas
  getSubjectSeparate(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-asignaturas-separate',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getSubject(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-asignaturas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteSubject(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/delete-subject',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  updateSubject(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/update-subject',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  //transportistas
  updateDriver(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/update-transportistas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteDriver(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/delete-transportistas',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  loginUserMongo(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/login-user',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getUserInfo(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/user-info',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  //students
  createStudent(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/add-estudiantes',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getStudents(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-estudiantes',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  deleteSolicitud(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/del-solicitud-estudiante',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getStudentSolicitudes(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-solicitud-estudiante',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  aprobarStudent(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/aprobar-estudiante',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  rechazarStudent(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/rechazar-estudiante',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }

  getProfesor(data: any) {
    return this.httpClient
      .post<any>(
        this.endpoint + '/get-profesor',
        JSON.stringify(data),
        this.httpHeader
      )
      .pipe(retry(1), catchError(this.processError));
  }
  processError(err: any) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(message);
  }
}
