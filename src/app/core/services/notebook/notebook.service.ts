import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notebook } from '../../models/notebook';

@Injectable({
  providedIn: 'root',
})
export class NotebookService {
  constructor(private httpClient: HttpClient) {}

  getNotebookById(notebookId: string) {
    let api: string = environment.urlNB + `notebooks/${notebookId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get notebook by id')),
      catchError(this.handleError)
    );
  }

  getAllNotebooks() {
    let api: string = environment.urlNB + `notebooks`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get all notebook successfully')),
      catchError(this.handleError)
    );
  }

  createNotebook(notebook: Notebook) {
    let api: string = environment.urlNB + 'notebooks';
    return this.httpClient.post(api, notebook).pipe(
      tap(() => console.log('create notebook successfully')),
      catchError(this.handleError)
    );
  }

  deleteNotebook(notebookId: string) {
    let api: string = environment.urlNB + `notebooks/${notebookId}`;
    return this.httpClient.delete(api).pipe(
      tap(() => console.log('delete notebook successfully')),
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
