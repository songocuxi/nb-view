import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Field } from '../../models/field';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  constructor(private httpClient: HttpClient) {}

  getFieldList() {
    let api: string = environment.urlNB + 'fields';
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field list ')),
      catchError(this.handleError)
    );
  }

  getFieldByNotebookId(notebookId: string) {
    let api: string = environment.urlNB + `fields?notebookId=${notebookId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field by notebookId')),
      catchError(this.handleError)
    );
  }

  getFieldByTaskId(taskId: string) {
    let api: string = environment.urlNB + `fields?taskId=${taskId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field by taskId')),
      catchError(this.handleError)
    );
  }

  createField(field: any) {
    let api: string = environment.urlNB + 'fields';
    return this.httpClient.post(api, field).pipe(
      tap(() => console.log('create field successfully')),
      catchError(this.handleError)
    );
  }

  updateField(field: any) {
    let api: string = environment.urlNB + 'fields';
    return this.httpClient.patch(api, field).pipe(
      tap(() => console.log('update field successfully')),
      catchError(this.handleError)
    );
  }

  getFieldById(fieldId: string) {
    let api: string = environment.urlNB + `fields/${fieldId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field by id successfully')),
      catchError(this.handleError)
    );
  }

  deleteField(fieldId: string) {
    let api: string = environment.urlNB + `fields/${fieldId}`;
    return this.httpClient.delete(api).pipe(
      tap(() => console.log('delete field by id successfully')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
