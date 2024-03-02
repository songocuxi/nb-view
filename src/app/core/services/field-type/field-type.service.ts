import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileType } from '../../models/field-type';

@Injectable({
  providedIn: 'root',
})
export class FieldTypeService {
  constructor(private httpClient: HttpClient) {}

  getFieldTypeList() {
    let api: string = environment.urlNB + 'field-types';
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field type list')),
      catchError(this.handleError)
    );
  }

  createFieldType(fieldType: FileType) {
    let api: string = environment.urlNB + 'field-types';
    return this.httpClient.post(api, fieldType).pipe(
      tap(() => console.log('create field type successfully')),
      catchError(this.handleError)
    );
  }

  updateFieldType(fieldType: FileType) {
    let api: string = environment.urlNB + 'field-types';
    return this.httpClient.patch(api, fieldType).pipe(
      tap(() => console.log('update field type sucessfully')),
      catchError(this.handleError)
    );
  }

  getFieldTypeById(fieldTypeId: string) {
    let api: string = environment.urlNB + `field-types/${fieldTypeId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get field type id sucessfully')),
      catchError(this.handleError)
    );
  }

  deleteFieldTypeById(fieldTypeId: string) {
    let api: string = environment.urlNB + `field-types/${fieldTypeId}`;
    return this.httpClient.delete(api).pipe(
      tap(() => console.log('delete field type id sucessfully')),
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
