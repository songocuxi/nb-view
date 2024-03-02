import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Value } from '../../models/value';

@Injectable({
  providedIn: 'root',
})
export class ValueService {
  constructor(private httpClient: HttpClient) {}

  getValueList() {
    let api: string = environment.urlNB + 'values';
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get value list succeccfully')),
      catchError(this.handleError)
    );
  }

  createValue(value: any) {
    let api: string = environment.urlNB + 'values';
    return this.httpClient.post(api, value).pipe(
      tap(() => console.log('create value succeccfully')),
      catchError(this.handleError)
    );
  }

  updateValue(value: any) {
    let api: string = environment.urlNB + 'values';
    return this.httpClient.patch(api, value).pipe(
      tap(() => console.log('update value succeccfully')),
      catchError(this.handleError)
    );
  }

  getValueById(valueId: string) {
    let api: string = environment.urlNB + `values/${valueId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get value by id')),
      catchError(this.handleError)
    );
  }

  deleteValue(valueId: string) {
    let api: string = environment.urlNB + `values/${valueId}`;
    return this.httpClient.delete(api).pipe(
      tap(() => console.log('delete value by id')),
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
