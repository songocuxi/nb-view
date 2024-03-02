import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../../models/task';

const api = 'http://103.221.220.183:8081/tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private httpClient: HttpClient) {}

  getTaskListByProjectId(projectId: string) {
    return this.httpClient.get<Task[]>(`${api}?projectId=${projectId}`);
  }

  getTaskById(taskId: string) {
    let api: string = environment.url + `tasks/${taskId}`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get task by id')),
      catchError(this.handleError)
    );
  }

  getSubtaskList(taskId: string) {
    let api: string = environment.url + `tasks/${taskId}/subtasks`;
    return this.httpClient.get(api).pipe(
      tap(() => console.log('get subtask list')),
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
