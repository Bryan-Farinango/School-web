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
